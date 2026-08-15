import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /**
     * Ship the images exactly as they sit in /public.
     *
     * Next's image optimizer needs a running optimization service; on Cloudflare
     * Workers that means wiring up an extra binding and paying per transform.
     * These are pre-sized screenshots, so serving them straight from the assets
     * bucket is both cheaper and one less thing that can break on deploy.
     */
    unoptimized: true,
  },
};

export default nextConfig;

// Enables Cloudflare bindings (D1, KV, R2, etc.) inside `next dev`.
// https://opennext.js.org/cloudflare
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();
