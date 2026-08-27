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

/**
 * Sample clips from the 1,500+ Hook Video Vault.
 *
 * These are reference material, not ORNN's own ads — the vault is a swipe file
 * you model, and the module says exactly that. Captions name the *archetype*
 * rather than describing the footage, because what the buyer is paying for is
 * the pattern, not these three clips.
 */
export const hookVaultClips: readonly ProofClip[] = [
  {
    src: "/proof/hook-talking.mp4",
    poster: "/proof/hook-talking-poster.webp",
    width: 360,
    height: 640,
    caption: "Talking-head open",
    note: "One person, one phone, one first line. The format most local-business ads win with.",
  },
  {
    src: "/proof/hook-curiosity.mp4",
    poster: "/proof/hook-curiosity-poster.webp",
    width: 360,
    height: 640,
    caption: "Curiosity open",
    note: "You keep watching to find out what happens. No product in the first three seconds.",
  },
  {
    src: "/proof/hook-action.mp4",
    poster: "/proof/hook-action-poster.webp",
    width: 360,
    height: 640,
    caption: "Motion open",
    note: "Movement in the very first frame — it stops the thumb before the brain reads anything.",
  },
];
