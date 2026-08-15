/**
 * Single source of truth for every number, date and link on the landing page.
 * Change it here and it changes everywhere — nothing is hardcoded in the JSX.
 */

export const offer = {
  brand: "ORNN",
  product: "Ads2Sawa",

  /** Kept static so the page prerenders deterministically on Cloudflare. */
  copyrightYear: 2026,

  /** Every CTA on the landing page points here. */
  checkoutUrl: "/checkout",

  support: {
    email: "support@ornn.ph",
    replyWithin: "24 hours",
    /** What buyers will see on their bank or e-wallet statement. */
    billingDescriptor: "ORNN*ADS2SAWA",
  },

  price: {
    /** Regular price once the founding window closes. */
    regular: 997,
    /** Founding price available now. */
    founding: 397,
    currency: "₱",
    /** Rounded for the badge copy. (997 - 397) / 997 = 60.2% */
    discountLabel: "60% OFF",
  },

  /**
   * When the founding price ends. Philippine time (UTC+8).
   * The countdown reads from here; move the date and the whole page follows.
   */
  deadlineIso: "2026-09-01T00:00:00+08:00",
  deadlineLabel: "September 1",

  guarantee: {
    uses: 5,
    label: "5-Use Money-Back Guarantee",
  },

  /** Headline results quoted throughout the page. */
  results: {
    clients: 37,
    days: 14,
    dailySpend: 500,
    totalSpend: 10500,
    frontendPrice: 3499,
    revenueLow: 219,
    revenueHigh: 224,
    retained: 34,
    adSpendManaged: "₱100M+",
    clientMonthly: "₱10M+",
  },
} as const;

/** Value stack — the sum drives the "Total value" line automatically. */
export const valueStack = [
  { name: "The Grandfather Offer Strategist GPT", value: 5000 },
  { name: "₱300 Winning Ad Launch System", value: 5000 },
  { name: "Scroll-Stopping Image Ads Strategist GPT", value: 7000 },
  { name: "100M Script Strategist GPT", value: 7000 },
  { name: "Campaign Structure & Setup Blueprint", value: 4000 },
  { name: "100+ Proven Winning Ad Hooks", value: 3000 },
  { name: "1,500+ Hook Video Vault", value: 4000 },
] as const;

export const totalValue = valueStack.reduce((sum, item) => sum + item.value, 0);

/** ₱1,234 — used for every peso figure so formatting never drifts. */
export function peso(amount: number): string {
  return `₱${amount.toLocaleString("en-PH")}`;
}
