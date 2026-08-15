import { bumps, orderTotal } from "@/content/checkout";
import { offer, peso } from "@/content/offer";
import { attachInvoiceId, createPendingOrder, newExternalId } from "@/lib/orders";

/**
 * Creates a Xendit invoice and hands the buyer its hosted payment page.
 *
 * Everything here runs server-side for one reason: the secret key and the
 * authoritative price must never reach the browser. The client sends which
 * bumps were ticked — not a total — and the amount is recomputed here from
 * `content/checkout.ts`, so a tampered request can't buy the system for ₱1.
 *
 * Card details never touch this app at any point. Xendit's hosted page
 * collects them under their PCI-DSS Level 1 scope; we only ever see an
 * invoice id and a redirect URL.
 *
 * Required environment variable (set it in the Cloudflare dashboard, or in
 * `.dev.vars` locally — never commit it):
 *
 *   XENDIT_SECRET_KEY=xnd_production_...
 *
 * Optional:
 *   NEXT_PUBLIC_SITE_URL=https://ads2sawa.ornn.ph   (for success/failure returns)
 */

const XENDIT_INVOICE_ENDPOINT = "https://api.xendit.co/v2/invoices";

type CheckoutRequest = {
  name?: string;
  email?: string;
  mobile?: string;
  method?: string;
  bumps?: string[];
};

export async function POST(request: Request) {
  let body: CheckoutRequest;

  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const email = typeof body.email === "string" ? body.email.trim() : "";
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const mobile = typeof body.mobile === "string" ? body.mobile.trim() : "";

  if (!email.includes("@") || name.length === 0) {
    return Response.json(
      { error: "Please add your full name and email address." },
      { status: 400 },
    );
  }

  // Only ids we actually sell, priced from our own data — never from the client.
  const validBumpIds = new Set(bumps.map((bump) => bump.id));
  const selected = (body.bumps ?? []).filter((id) => validBumpIds.has(id));
  const amount = orderTotal(selected);

  const secretKey = process.env.XENDIT_SECRET_KEY;

  if (!secretKey) {
    // Fail loudly rather than pretending the order went through.
    return Response.json(
      {
        error:
          "Payments aren't switched on yet. Email " +
          offer.support.email +
          " and we'll sort you out.",
      },
      { status: 503 },
    );
  }

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? new URL(request.url).origin;

  // Record the order before handing the buyer over, so a payment can never
  // arrive for something we have no row for.
  const externalId = newExternalId();
  const recorded = await createPendingOrder({
    externalId,
    amount,
    email,
    name,
    mobile,
    bumps: selected,
  });

  if (!recorded.ok) {
    console.error("Refusing to start payment without an order row:", recorded.error);
    return Response.json(
      { error: "Couldn't start the order. Try again, or email us." },
      { status: 503 },
    );
  }

  const items = [
    { name: `${offer.product} System`, quantity: 1, price: offer.price.founding },
    ...bumps
      .filter((bump) => selected.includes(bump.id))
      .map((bump) => ({ name: bump.name, quantity: 1, price: bump.price })),
  ];

  try {
    const response = await fetch(XENDIT_INVOICE_ENDPOINT, {
      method: "POST",
      headers: {
        // Xendit authenticates with the secret key as HTTP Basic username.
        Authorization: `Basic ${btoa(`${secretKey}:`)}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        external_id: externalId,
        amount,
        currency: "PHP",
        payer_email: email,
        description: `${offer.product} — ${peso(amount)}`,
        customer: {
          given_names: name,
          email,
          ...(mobile ? { mobile_number: mobile } : {}),
        },
        items,
        // Xendit doesn't append anything to these URLs, so we carry our own
        // reference — that's how the thank-you page knows which order to check.
        success_redirect_url: `${siteUrl}/checkout/success?ref=${externalId}`,
        failure_redirect_url: `${siteUrl}/checkout`,
      }),
    });

    const invoice = await response.json();

    if (!response.ok || !invoice.invoice_url) {
      console.error("Xendit invoice failed", response.status, invoice);
      return Response.json(
        { error: "Payment couldn't start. Try again, or email us." },
        { status: 502 },
      );
    }

    await attachInvoiceId(externalId, invoice.id);

    return Response.json({ redirectUrl: invoice.invoice_url });
  } catch (error) {
    console.error("Xendit request threw", error);
    return Response.json(
      { error: "Payment couldn't start. Try again, or email us." },
      { status: 502 },
    );
  }
}
