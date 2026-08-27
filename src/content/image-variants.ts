/**
 * Which smaller widths exist for each proof image, generated from what is
 * actually on disk in public/proof.
 *
 * Variants are only kept when they're genuinely smaller than the original —
 * a downscale of an already-tiny lossless screenshot often isn't — so this
 * map is irregular on purpose. `Exhibit` reads it to build a srcset, which
 * is what stops a phone downloading a 1345px receipt to show it at 300px.
 */
export const imageVariants: Record<string, number[]> = {
  "campaign-1-1-5": [
    400,
    700
  ],
  "chat-inquiry": [
    400
  ],
  "client-gift": [
    400,
    700
  ],
  "converted-2500": [
    400,
    700,
    1000
  ],
  "journey-flow": [
    400,
    700,
    1000
  ],
  "maya-3918": [
    400
  ],
  "paid-3499": [
    400,
    700
  ]
};
