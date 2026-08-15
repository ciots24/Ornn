import { createClient } from "@supabase/supabase-js";

/**
 * Service-role Supabase client. **Server-side only.**
 *
 * The `orders` table has RLS on with no policies, so the anon key can read and
 * write nothing there. That is deliberate: order rows are written by the
 * checkout route and the Xendit webhook, never by a browser. This client holds
 * the key that bypasses RLS, so it must never be imported into a Client
 * Component — the key would end up in the browser bundle.
 *
 * Set in `.dev.vars` locally and in the Cloudflare dashboard for production:
 *   SUPABASE_SERVICE_ROLE_KEY=eyJ...
 */
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) return null;

  return createClient(url, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
