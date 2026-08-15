/**
 * Ads whose scripts were written by the 100M Script Strategist GPT.
 *
 * These sit in that module because they prove its specific claim — that the
 * GPT writes scripts you can actually run — rather than a screenshot of the
 * GPT's output, which only proves it produces text.
 *
 * Every file is re-encoded small and served with `preload="none"`, so a
 * visitor downloads nothing until they press play. Sources were 63–129MB;
 * Cloudflare also caps static assets at 25 MiB, so compression wasn't optional.
 */

export type ProofClip = {
  src: string;
  poster: string;
  width: number;
  height: number;
  caption: string;
  note?: string;
};

export const scriptProofClips: readonly ProofClip[] = [
  {
    src: "/proof/ad-banner-1.mp4",
    poster: "/proof/ad-banner-1-poster.webp",
    width: 360,
    height: 480,
    caption: "Live ad · scripted by the GPT",
    note: "Ran on Meta. Script written by the Script Strategist, lightly edited.",
  },
  {
    src: "/proof/ad-payroll.mp4",
    poster: "/proof/ad-payroll-poster.webp",
    width: 384,
    height: 480,
    caption: "Different client · same system",
    note: "A different business entirely, scripted the same way.",
  },
];
