import { createAdminClient } from "@/lib/supabase/admin";
import { fetchInvoiceState } from "@/lib/xendit";

export type OrderStatus = "pending" | "paid" | "expired" | "failed";

export type Order = {
  external_id: string;
  status: OrderStatus;
  amount: number;
  currency: string;
  customer_email: string;
  customer_name: string | null;
  payment_channel: string | null;
  paid_at: string | null;
  bumps: string[];
};

/**
 * Xendit statuses that mean the money actually arrived.
 *
 * PAID fires when the buyer completes payment; SETTLED follows once funds are
 * disbursed. Both mean the customer has paid and should be given access.
 */
const PAID_STATUSES = new Set(["PAID", "SETTLED"]);
const EXPIRED_STATUSES = new Set(["EXPIRED"]);

/** Reference we control, carried through Xendit and back in the redirect URL. */
export function newExternalId(): string {
  const random = Math.random().toString(36).slice(2, 10);
  return `ads2sawa-${Date.now().toString(36)}-${random}`;
}

/**
 * Records the order before the buyer leaves for Xendit.
 *
 * Written first so a payment can never arrive for an order we've never heard
 * of — the webhook then only has to flip a row that already exists.
 */
export async function createPendingOrder(order: {
  externalId: string;
  amount: number;
  email: string;
  name: string;
  mobile: string;
  bumps: string[];
}): Promise<{ ok: boolean; error?: string }> {
  const supabase = createAdminClient();
  if (!supabase) return { ok: false, error: "Supabase is not configured." };

  const { error } = await supabase.from("orders").insert({
    external_id: order.externalId,
    amount: order.amount,
    customer_email: order.email,
    customer_name: order.name,
    customer_mobile: order.mobile,
    bumps: order.bumps,
  });

  if (error) {
    console.error("Failed to record pending order", error);
    return { ok: false, error: error.message };
  }

  return { ok: true };
}

/** Stores the Xendit invoice id once we have it, for reconciliation. */
export async function attachInvoiceId(externalId: string, invoiceId: string) {
  const supabase = createAdminClient();
  if (!supabase) return;

  const { error } = await supabase
    .from("orders")
    .update({ xendit_invoice_id: invoiceId })
    .eq("external_id", externalId);

  if (error) console.error("Failed to attach invoice id", error);
}

type Callback = Record<string, unknown>;

function asString(value: unknown): string | null {
  return typeof value === "string" && value.length > 0 ? value : null;
}

/**
 * Applies a Xendit invoice callback to the matching order.
 *
 * Written to be safely repeatable: Xendit retries up to six times and can
 * deliver the same event more than once, so this must reach the same end state
 * however many times it runs. A `paid` order is never walked back to expired.
 */
export type CallbackOutcome =
  /** State changed, or was already correct. */
  | { outcome: "applied" }
  /** Nothing for us to do. Retrying would not change that. */
  | { outcome: "ignored"; reason: string }
  /** Our side failed. Worth Xendit trying again. */
  | { outcome: "error"; reason: string };

export async function applyInvoiceCallback(
  payload: Callback,
): Promise<CallbackOutcome> {
  const supabase = createAdminClient();
  if (!supabase) {
    return { outcome: "error", reason: "Supabase is not configured." };
  }

  const externalId = asString(payload.external_id);
  const xenditStatus = asString(payload.status)?.toUpperCase() ?? "";

  if (!externalId) {
    // Malformed or not an invoice event. A retry would deliver the same thing.
    return { outcome: "ignored", reason: "Callback had no external_id." };
  }

  const { data: existing, error: readError } = await supabase
    .from("orders")
    .select("external_id, status, amount")
    .eq("external_id", externalId)
    .maybeSingle();

  if (readError) {
    console.error("Failed to read order for callback", readError);
    return { outcome: "error", reason: readError.message };
  }

  if (!existing) {
    // A callback for an order we never created — a stale test event, or another
    // integration sharing the account. Acknowledge it: the order will never
    // appear, so six retries would just be noise.
    return { outcome: "ignored", reason: `No order matches ${externalId}.` };
  }

  if (PAID_STATUSES.has(xenditStatus)) {
    const paidAmount = Number(payload.paid_amount ?? payload.amount ?? 0);

    if (paidAmount !== existing.amount) {
      // Don't fail the order — the customer's money is real either way. Flag it
      // loudly so it can be reconciled by hand.
      console.error(
        `Amount mismatch on ${externalId}: expected ${existing.amount}, callback said ${paidAmount}`,
      );
    }

    const { error } = await supabase
      .from("orders")
      .update({
        status: "paid",
        xendit_invoice_id: asString(payload.id),
        payment_channel:
          asString(payload.payment_channel) ?? asString(payload.payment_method),
        paid_at: asString(payload.paid_at) ?? new Date().toISOString(),
        raw_callback: payload,
      })
      .eq("external_id", externalId);

    if (error) {
      console.error("Failed to mark order paid", error);
      return { outcome: "error", reason: error.message };
    }

    return { outcome: "applied" };
  }

  if (EXPIRED_STATUSES.has(xenditStatus)) {
    // `neq` guards the case where an expiry event arrives after a payment.
    const { error } = await supabase
      .from("orders")
      .update({ status: "expired", raw_callback: payload })
      .eq("external_id", externalId)
      .neq("status", "paid");

    if (error) {
      console.error("Failed to mark order expired", error);
      return { outcome: "error", reason: error.message };
    }

    return { outcome: "applied" };
  }

  // PENDING and anything unrecognised: acknowledge without changing state.
  return {
    outcome: "ignored",
    reason: `Nothing to do for status ${xenditStatus || "(none)"}.`,
  };
}

/**
 * Asks Xendit what really happened to a pending order and applies the answer.
 *
 * This is the pull-based counterpart to the webhook, for when the webhook slot
 * isn't available to us. It reuses `applyInvoiceCallback` so both paths share
 * one set of state-transition rules — including the guard that stops a late
 * expiry from undoing a payment.
 */
export async function reconcileOrder(externalId: string): Promise<Order | null> {
  const supabase = createAdminClient();
  if (!supabase) return null;

  const { data: order } = await supabase
    .from("orders")
    .select("external_id, status, xendit_invoice_id")
    .eq("external_id", externalId)
    .maybeSingle();

  // Only pending orders are worth a round trip; anything settled is final.
  if (!order || order.status !== "pending") return getOrder(externalId);

  const state = await fetchInvoiceState({
    invoiceId: order.xendit_invoice_id,
    externalId,
  });

  if (!state) return getOrder(externalId);

  await applyInvoiceCallback({
    external_id: externalId,
    id: state.id,
    status: state.status,
    paid_amount: state.paidAmount,
    payment_channel: state.paymentChannel,
    paid_at: state.paidAt,
    // Marks the row as reconciled rather than webhook-driven, so the two are
    // distinguishable when auditing later.
    source: "reconcile",
  });

  return getOrder(externalId);
}

/**
 * Sweeps recent pending orders. Catches buyers who paid and never came back —
 * the case a thank-you page can never see.
 */
export async function reconcilePendingOrders(limit = 25): Promise<{
  checked: number;
  paid: number;
}> {
  const supabase = createAdminClient();
  if (!supabase) return { checked: 0, paid: 0 };

  // A day is well past Xendit's invoice expiry, so older rows will never flip.
  const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

  const { data: pending } = await supabase
    .from("orders")
    .select("external_id")
    .eq("status", "pending")
    .gte("created_at", since)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (!pending?.length) return { checked: 0, paid: 0 };

  let paid = 0;
  for (const row of pending) {
    const order = await reconcileOrder(row.external_id);
    if (order?.status === "paid") paid += 1;
  }

  return { checked: pending.length, paid };
}

/** Looks up an order so the thank-you page can show what actually happened. */
export async function getOrder(externalId: string): Promise<Order | null> {
  const supabase = createAdminClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("orders")
    .select(
      "external_id, status, amount, currency, customer_email, customer_name, payment_channel, paid_at, bumps",
    )
    .eq("external_id", externalId)
    .maybeSingle();

  if (error) {
    console.error("Failed to read order", error);
    return null;
  }

  return (data as Order) ?? null;
}
