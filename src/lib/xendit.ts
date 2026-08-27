import { serverEnv } from "@/lib/env";

/**
 * Reads invoice state straight from Xendit.
 *
 * Normally the webhook tells us a payment landed. That slot is one-per-account
 * on Xendit, and this account's is already spoken for by another site — so
 * instead of contending for it, we ask Xendit directly. Pull rather than push:
 * slightly later than a webhook, but it needs nothing configured and can't be
 * broken by another integration changing a shared setting.
 */

const XENDIT_API = "https://api.xendit.co";

export type InvoiceState = {
  /** Raw Xendit status: PENDING | PAID | SETTLED | EXPIRED. */
  status: string;
  id?: string;
  paidAmount?: number;
  paymentChannel?: string;
  paidAt?: string;
};

function authHeader(secretKey: string) {
  // Xendit uses the secret key as the HTTP Basic username, empty password.
  return `Basic ${btoa(`${secretKey}:`)}`;
}

function toState(invoice: Record<string, unknown>): InvoiceState | null {
  const status = typeof invoice.status === "string" ? invoice.status : null;
  if (!status) return null;

  const channel =
    typeof invoice.payment_channel === "string"
      ? invoice.payment_channel
      : typeof invoice.payment_method === "string"
        ? invoice.payment_method
        : undefined;

  return {
    status,
    id: typeof invoice.id === "string" ? invoice.id : undefined,
    paidAmount:
      typeof invoice.paid_amount === "number"
        ? invoice.paid_amount
        : typeof invoice.amount === "number"
          ? invoice.amount
          : undefined,
    paymentChannel: channel,
    paidAt: typeof invoice.paid_at === "string" ? invoice.paid_at : undefined,
  };
}

/**
 * Looks an invoice up by Xendit's own id when we have it, falling back to a
 * search on our external id. The direct lookup is one request and unambiguous,
 * so it's tried first; the fallback covers orders whose invoice id never got
 * stored because the request died between creating the invoice and saving it.
 */
export async function fetchInvoiceState(params: {
  invoiceId?: string | null;
  externalId: string;
}): Promise<InvoiceState | null> {
  const secretKey = serverEnv("XENDIT_SECRET_KEY");
  if (!secretKey) return null;

  const headers = { Authorization: authHeader(secretKey) };

  try {
    if (params.invoiceId) {
      const response = await fetch(
        `${XENDIT_API}/v2/invoices/${encodeURIComponent(params.invoiceId)}`,
        { headers },
      );

      if (response.ok) {
        return toState((await response.json()) as Record<string, unknown>);
      }

      // 404 means the id is wrong or from another environment — fall through to
      // the external-id search rather than giving up.
      if (response.status !== 404) {
        console.error("Xendit invoice lookup failed", response.status);
      }
    }

    const search = await fetch(
      `${XENDIT_API}/v2/invoices?external_id=${encodeURIComponent(params.externalId)}`,
      { headers },
    );

    if (!search.ok) {
      console.error("Xendit invoice search failed", search.status);
      return null;
    }

    const results = (await search.json()) as unknown;
    const first = Array.isArray(results) ? results[0] : results;

    return first ? toState(first as Record<string, unknown>) : null;
  } catch (error) {
    console.error("Xendit lookup threw", error);
    return null;
  }
}
