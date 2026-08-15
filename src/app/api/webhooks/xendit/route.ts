import { applyInvoiceCallback } from "@/lib/orders";
import { serverEnv } from "@/lib/env";

/**
 * Xendit invoice webhook.
 *
 * This — not the browser redirect — is how the site learns a payment happened.
 * A buyer who pays and then closes the tab never reaches the thank-you page,
 * but this still fires, so the order is recorded and can be fulfilled.
 *
 * Contract Xendit expects of us:
 *  - Verify the `x-callback-token` header matches our verification token.
 *  - Answer 2xx quickly. Anything else is treated as a failure and retried up
 *    to six times with exponential backoff (15 minutes out to 24 hours).
 *  - Tolerate duplicates — retries and resends mean the same event can arrive
 *    more than once, so `applyInvoiceCallback` is written to be repeatable.
 *
 * Set in `.dev.vars` locally and in the Cloudflare dashboard for production:
 *   XENDIT_CALLBACK_TOKEN=...   (Dashboard → Settings → Developers → Webhooks)
 */
export async function POST(request: Request) {
  const expectedToken = serverEnv("XENDIT_CALLBACK_TOKEN");

  if (!expectedToken) {
    // Refuse rather than accept unverified callbacks — an open endpoint that
    // marks orders paid is worse than one that is temporarily down.
    console.error("XENDIT_CALLBACK_TOKEN is not set; rejecting callback.");
    return Response.json({ error: "Webhook not configured." }, { status: 503 });
  }

  const providedToken = request.headers.get("x-callback-token");

  if (!providedToken || !safeEquals(providedToken, expectedToken)) {
    console.warn("Rejected Xendit callback with a bad token.");
    return Response.json({ error: "Invalid callback token." }, { status: 401 });
  }

  let payload: Record<string, unknown>;

  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const result = await applyInvoiceCallback(payload);

  if (result.outcome === "error") {
    // 5xx asks Xendit to retry — right when *our* side failed (database down,
    // config missing), because the next attempt may well succeed.
    console.error("Xendit callback failed:", result.reason);
    return Response.json({ error: result.reason }, { status: 500 });
  }

  if (result.outcome === "ignored") {
    // 2xx stops the retries. Nothing here will change on a second attempt, so
    // six more deliveries would only add noise — but it still gets logged.
    console.warn("Xendit callback ignored:", result.reason);
  }

  return Response.json({ received: true }, { status: 200 });
}

/**
 * Constant-time-ish comparison so a wrong token can't be recovered by timing
 * the response. Both values are short, so the cost is irrelevant.
 */
function safeEquals(a: string, b: string): boolean {
  if (a.length !== b.length) return false;

  let diff = 0;
  for (let i = 0; i < a.length; i += 1) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }

  return diff === 0;
}
