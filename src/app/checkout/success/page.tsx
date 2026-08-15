import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { getOrder } from "@/lib/orders";
import { offer, peso } from "@/content/offer";

export const metadata: Metadata = {
  title: "Order received — Ads2Sawa | ORNN",
  robots: { index: false, follow: false },
};

/**
 * Where Xendit returns the buyer after payment.
 *
 * The page looks the order up server-side rather than trusting the redirect —
 * anyone can type this URL, and the authoritative signal is the webhook. Three
 * states are possible and each says something different:
 *
 *  paid     the webhook has confirmed it; say so plainly
 *  pending  they're back before the webhook landed, which is normal for a
 *           second or two; promise the email rather than the payment
 *  unknown  no reference, or a reference we don't recognise
 */
export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string }>;
}) {
  const { ref } = await searchParams;
  const order = ref ? await getOrder(ref) : null;
  const paid = order?.status === "paid";

  return (
    <main className="flex flex-1 items-center py-14 sm:py-20">
      <Container width="wide">
        <div className="mx-auto max-w-2xl text-center">
          <span
            className={`mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border ${
              paid
                ? "border-brand/40 bg-brand/10"
                : "border-ink-400 bg-ink-800"
            }`}
          >
            {paid ? <CheckIcon /> : <ClockIcon />}
          </span>

          <h1 className="display-lg mt-7 text-balance text-paper">
            {/* Plain apostrophes: these are JS strings, not JSX text, so an
                HTML entity here would render literally. */}
            {paid ? "You’re in" : "Thanks — we’ve got your order"}
          </h1>

          <p className="mx-auto mt-4 max-w-lg text-balance text-[1.0625rem] leading-relaxed text-fog">
            {paid
              ? "Payment confirmed. Your access is on its way to your inbox right now."
              : "We're confirming your payment with the bank. This usually takes a few seconds — your access email follows the moment it clears."}
          </p>

          {paid && order && (
            <dl className="mx-auto mt-8 grid max-w-md grid-cols-2 gap-px overflow-hidden rounded-2xl border border-ink-500 bg-ink-500">
              <Cell label="Paid" value={peso(order.amount)} />
              <Cell
                label="Method"
                value={formatChannel(order.payment_channel)}
              />
              <Cell label="Email" value={order.customer_email} wide />
            </dl>
          )}
        </div>

        <ol className="mx-auto mt-12 max-w-2xl space-y-0">
          {steps.map((step, index) => (
            <li
              key={step.title}
              className="flex gap-4 border-t border-ink-500 py-5"
            >
              <span className="tnum label-caps w-6 shrink-0 pt-1 text-brand">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <p className="font-bold leading-snug text-paper">{step.title}</p>
                <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-fog">
                  {step.body}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mx-auto mt-10 max-w-2xl rounded-2xl border border-ink-500 bg-ink-700 p-6 text-center">
          <p className="text-[0.9375rem] leading-relaxed text-fog">
            Question, or the email never arrived? Write to{" "}
            <a
              href={`mailto:${offer.support.email}`}
              className="font-bold text-brand-hi underline underline-offset-2"
            >
              {offer.support.email}
            </a>{" "}
            — we reply within {offer.support.replyWithin}.
          </p>
          {ref && (
            <p className="tnum mt-4 text-[0.75rem] text-fog-dim">
              Order reference{" "}
              <span className="font-bold text-fog">{ref}</span> — quote this and
              we&rsquo;ll find you instantly.
            </p>
          )}
          <p className="mt-3 text-[0.8125rem] text-fog-dim">
            Shows on your statement as{" "}
            <span className="font-bold text-fog">
              {offer.support.billingDescriptor}
            </span>
            .
          </p>
        </div>

        <p className="mt-10 text-center">
          <Link
            href="/"
            className="label-caps text-fog transition-colors hover:text-paper"
          >
            ← Back to homepage
          </Link>
        </p>
      </Container>
    </main>
  );
}

const steps = [
  {
    title: "Check your email",
    body: "We send your access link and receipt to the email you used. If it isn't there in a few minutes, check spam or promotions.",
  },
  {
    title: "Open your dashboard",
    body: "Everything's in there — the Custom GPTs, guides, hooks, video vault, and the 37-client case study bonus.",
  },
  {
    title: "Build your first ad set",
    body: "Start with the Quick Start. Five launch-ready ads in one afternoon.",
  },
];

function Cell({
  label,
  value,
  wide = false,
}: {
  label: string;
  value: string;
  wide?: boolean;
}) {
  return (
    <div className={`bg-ink-700 px-4 py-3 text-left ${wide ? "col-span-2" : ""}`}>
      <dt className="label-caps text-[0.6rem] text-fog-dim">{label}</dt>
      <dd className="mt-1 truncate text-[0.9375rem] font-bold text-paper">
        {value}
      </dd>
    </div>
  );
}

/** "GCASH" → "GCash", "CREDIT_CARD" → "Credit card". */
function formatChannel(channel: string | null): string {
  if (!channel) return "—";
  if (channel.toUpperCase() === "GCASH") return "GCash";
  const words = channel.replace(/_/g, " ").toLowerCase();
  return words.charAt(0).toUpperCase() + words.slice(1);
}

function CheckIcon() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      className="h-8 w-8 text-brand-hi"
    >
      <path
        d="m5 12.5 4.5 4.5L19 7.5"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" fill="none" className="h-8 w-8 text-fog">
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.9" />
      <path
        d="M12 7.5V12l3 2"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
