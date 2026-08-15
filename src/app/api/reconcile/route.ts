import { reconcilePendingOrders } from "@/lib/orders";
import { serverEnv } from "@/lib/env";

/**
 * Sweeps pending orders and asks Xendit which ones actually got paid.
 *
 * The thank-you page reconciles the buyer's own order, which covers anyone who
 * returns. This covers the rest: someone who pays on GCash and closes the tab
 * would otherwise sit as `pending` forever, since this account's single Xendit
 * webhook slot belongs to another site.
 *
 * Call it on a schedule (Supabase pg_cron, GitHub Actions, any cron service)
 * or by hand while testing:
 *
 *   curl -X POST https://<domain>/api/reconcile -H "authorization: Bearer <RECONCILE_TOKEN>"
 *
 * Guarded by RECONCILE_TOKEN so it can't be used by anyone else to hammer the
 * Xendit API on our key.
 */
export async function POST(request: Request) {
  const expected = serverEnv("RECONCILE_TOKEN");

  if (!expected) {
    return Response.json(
      { error: "RECONCILE_TOKEN is not set." },
      { status: 503 },
    );
  }

  const provided = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");

  if (!provided || provided !== expected) {
    return Response.json({ error: "Unauthorized." }, { status: 401 });
  }

  const result = await reconcilePendingOrders();

  return Response.json({ ok: true, ...result });
}
