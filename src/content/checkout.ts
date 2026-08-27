/**
 * Checkout copy, order bumps, and payment options.
 *
 * The order total is derived from `offer.price.founding` plus whichever bumps
 * the buyer ticks — nothing here hardcodes a total, so changing a price in
 * `offer.ts` or adding a bump below flows through the summary, the sticky bar
 * and the payment handoff at once.
 *
 * Copy is deliberately terse. Every extra line on a checkout page is another
 * thing between the buyer and the button.
 */

import { offer, peso } from "./offer";

export const checkout = {
  eyebrow: "Secure checkout",
  headline: "One step from your first winning ads",
  subhead: `Unlock the system that closed ${offer.results.clients} clients in two weeks — on ${peso(offer.results.dailySpend)} a day.`,

  trust: ["Instant access", "5-use guarantee", "One-time payment"],

  customer: {
    title: "Your details",
    note: "Where we send your access and receipt.",
    fields: {
      name: { label: "Full name", placeholder: "Juan Dela Cruz" },
      email: { label: "Email address", placeholder: "juan@email.com" },
      mobile: { label: "Mobile", placeholder: "+63 917 000 0000" },
    },
  },

  payment: {
    title: "How you'll pay",
    note: "Pick one. You'll finish on the secure payment page.",
    methods: [
      {
        id: "gcash",
        label: "GCash",
        hint: "E-wallet",
        logo: "/pay/gcash.svg",
      },
      {
        id: "maya",
        label: "Maya",
        hint: "E-wallet",
        logo: "/pay/maya.svg",
      },
      {
        id: "card",
        label: "Credit / Debit Card",
        hint: "Visa · Mastercard",
        logo: null,
      },
    ],
    /** Naming the processor is the reassurance — it's why we never see a card. */
    gateway: {
      name: "Xendit",
      logo: "/pay/xendit.svg",
      note: "Payments secured by Xendit, PCI-DSS Level 1. Your card details never touch our servers.",
    },
  },

  bumps: {
    title: "Add to your order",
    note: "This page only. The price won't come back.",
  },

  summary: {
    title: "Your order",
    priceNote: `Founding price. Back to ${peso(offer.price.regular)} after ${offer.deadlineLabel}.`,
    totalValueLabel: "Total value",
    totalLabel: "Total today",
  },

  submit: {
    label: "Unlock the full system",
    // Two items fit one line on a phone; "one-time payment" already appears
    // in the hero chips, so a third here just wrapped.
    sublabel: `Instant access · ${offer.guarantee.uses}-use guarantee`,
    terms: "By continuing you agree to our Terms of Sale.",
  },

  guarantee: {
    title: `${offer.guarantee.uses}-use money-back guarantee`,
    body: `Use it to make ${offer.guarantee.uses} ads. If you get nothing useful, reply "refund" to your delivery email and we send your money back. No questions.`,
  },

  help: {
    title: "Need help?",
    body: `Email ${offer.support.email} or message our page. We reply within 24 hours.`,
  },
} as const;

export type Bump = {
  id: string;
  /** Ribbon above the offer name. */
  ribbon: string;
  name: string;
  price: number;
  /** Struck-through anchor. Omit when there is no real anchor price to show. */
  wasPrice?: number;
  includes: readonly string[];
  /** The identity shift, rendered as "from X → to Y". */
  shift: { from: string; to: string };
};

/**
 * Checkout order bumps.
 *
 * Add another object and it appears on the page, in the summary and in the
 * total with no component changes. Keep the list short — every extra decision
 * at this step costs completions, which is why the two larger offers live in
 * `upsells` below rather than here.
 *
 * NOTE: the Swipe Pack's itemised contents are still to be confirmed by the
 * client. The bullets below are drawn from their own benefit brief.
 */
export const bumps: readonly Bump[] = [
  {
    id: "swipe-pack",
    ribbon: "This page only",
    name: "Winning Ads Swipe Pack",
    price: 499,
    includes: [
      "Proven ad templates and swipe copy for local businesses",
      "Plug-and-play ads you can launch on day one",
      "A swipe library you reuse on every campaign",
    ],
    shift: { from: "starting from nothing", to: "I've got an arsenal ready" },
  },
];

/**
 * Post-purchase one-time offers — shown *after* payment, not at checkout.
 *
 * Stacking these on the checkout page would take a ₱397 impulse buy up past
 * ₱4,000 worth of decisions before the first payment clears, which is where
 * completion rates fall off. They're captured here so the OTO pages can read
 * from the same source; moving one into `bumps` is a copy-paste if you'd
 * rather test it at checkout.
 */
export type Upsell = Bump & { status?: "testing" };

export const upsells: readonly Upsell[] = [
  {
    id: "creative-engine",
    ribbon: "One-time offer",
    name: "Creative Engine",
    price: 1497,
    includes: [
      "Advanced scripts and the full end-to-end creative workflow",
      "AI video generation — not just image ads",
      "ORNN's own collection of converting ads",
      "Turn one product into dozens of ads across formats",
    ],
    shift: { from: "one-person operation", to: "I run a real ad operation" },
  },
  {
    id: "ai-avatar",
    ribbon: "One-time offer",
    name: "AI Avatar System",
    price: 1999,
    status: "testing",
    includes: [
      "AI video avatars for talking-spokesperson ads",
      "No filming, no camera, no talent needed",
      "Premium-looking video ads for the price of a dinner",
      "Endless video creatives in the format that owns the feed",
    ],
    shift: {
      from: "small, camera-shy seller",
      to: "a brand with a real video presence",
    },
  },
];

/** What the buyer is paying right now, given the bumps they ticked. */
export function orderTotal(selectedBumpIds: readonly string[]): number {
  const bumpTotal = bumps
    .filter((bump) => selectedBumpIds.includes(bump.id))
    .reduce((sum, bump) => sum + bump.price, 0);

  return offer.price.founding + bumpTotal;
}
