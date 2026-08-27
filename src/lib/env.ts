import { getCloudflareContext } from "@opennextjs/cloudflare";

/**
 * Reads a server-only secret. **Never call this from a Client Component.**
 *
 * Why this exists rather than plain `process.env`:
 *
 * `@opennextjs/cloudflare` compiles every variable it finds in `.env.local` and
 * `.env*.local` into `.open-next/cloudflare/next-env.mjs`, which is uploaded
 * inside the Worker. Anything in those files is therefore readable by anyone who
 * can view the deployed code — fine for `NEXT_PUBLIC_*`, catastrophic for a
 * Supabase service-role key.
 *
 * `.dev.vars` is not bundled, so that's where local secrets live. Cloudflare
 * exposes them (and real production secrets) on the Worker's `env` object rather
 * than `process.env`, which is what this reads first. The `process.env` fallback
 * keeps plain `next build`/`next start` working outside the Workers runtime.
 */
export function serverEnv(key: string): string | undefined {
  try {
    const fromCloudflare = (
      getCloudflareContext().env as unknown as Record<string, string | undefined>
    )?.[key];

    if (fromCloudflare) return fromCloudflare;
  } catch {
    // Not inside a Workers request context — fall through.
  }

  return process.env[key];
}
