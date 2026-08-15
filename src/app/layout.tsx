import type { Metadata, Viewport } from "next";
import { Roboto, Roboto_Condensed } from "next/font/google";
import "./globals.css";
import { ImageLightbox } from "@/components/ui/ImageLightbox";
import { ScrollEffects } from "@/components/ui/ScrollEffects";

/* Self-hosted at build time by next/font — no runtime requests to Google,
   which keeps the page fast and the Cloudflare deploy dependency-free. */
const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  display: "swap",
});

const robotoCondensed = Roboto_Condensed({
  variable: "--font-roboto-condensed",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ads2Sawa — The ₱300/Day AI Meta Ads System | ORNN",
  description:
    "The AI-powered Meta ads system built on ₱100M+ in ad spend. Generate scripts, image ads, and a proven ₱300/day campaign structure — even if you've never run ads before.",
  openGraph: {
    title: "Ads2Sawa — The ₱300/Day AI Meta Ads System",
    description:
      "37 clients in two weeks on ₱500/day. Get the exact AI ads system, built on ₱100M+ in ad spend.",
    type: "website",
    locale: "en_PH",
    siteName: "ORNN",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#050504",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-PH"
      className={`${roboto.variable} ${robotoCondensed.variable} h-full antialiased`}
    >
      <head>
        {/* Scroll reveals start hidden and are shown by an observer. Without
            JavaScript there is no observer, so the page must show them itself. */}
        <noscript>
          <style>{`.reveal{opacity:1;transform:none}.marker-path{stroke-dashoffset:0}`}</style>
        </noscript>
      </head>
      <body className="flex min-h-full flex-col bg-surface font-sans text-text">
        {children}
        <ScrollEffects />
        <ImageLightbox />
      </body>
    </html>
  );
}
