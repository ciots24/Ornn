import type { Metadata } from "next";
import Link from "next/link";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import { Container } from "@/components/ui/Container";
import { Countdown } from "@/components/ui/Countdown";
import { Testimonials } from "@/components/sections/Testimonials";
import { checkout } from "@/content/checkout";
import { legal, testimonials } from "@/content/copy";
import { offer } from "@/content/offer";

export const metadata: Metadata = {
  title: "Checkout — Ads2Sawa | ORNN",
  description:
    "Secure checkout for the Ads2Sawa System. Instant access, one-time payment, protected by a 5-use money-back guarantee.",
  // A checkout page has no business in search results.
  robots: { index: false, follow: false },
};

/**
 * Checkout.
 *
 * Deliberately has no navigation beyond a single way back — every extra link
 * on a checkout page is an exit. The only interactive part is `CheckoutForm`;
 * everything else renders as static HTML so the page paints immediately.
 */
export default function CheckoutPage() {
  return (
    <>
      <header className="border-b border-line bg-surface-alt">
        <Container width="wide" className="flex items-center gap-4 py-4">
          <Link
            href="/"
            className="label-caps -my-2 flex items-center py-3 text-text transition-colors hover:text-accent-text"
          >
            {offer.brand}
            <span className="mx-2 text-line-strong">/</span>
            <span className="text-text-muted">{offer.product}</span>
          </Link>

          <span className="label-caps ml-auto flex items-center gap-2 text-text-dim">
            <LockIcon />
            {checkout.eyebrow}
          </span>
        </Container>
      </header>

      <main className="flex-1 pb-28 lg:pb-16">
        {/* Promise restated — the buyer arrived from a button and needs to see
            the same thing they clicked. */}
        <section className="relative overflow-hidden border-b border-line bg-surface py-8 sm:py-11">
          <div aria-hidden className="absolute inset-0 grid-veil" />
          <div
            aria-hidden
            className="absolute -top-40 left-1/2 h-96 w-[42rem] -translate-x-1/2 rounded-full" style={{background:"radial-gradient(closest-side, rgb(229 57 53 / 0.12), transparent)"}}
          />

          <Container width="wide" className="relative text-center">
            <h1 className="display-md mx-auto max-w-2xl text-balance text-text sm:display-lg">
              {checkout.headline}
            </h1>
            <p className="mx-auto mt-3 max-w-lg text-balance text-[0.9375rem] leading-relaxed text-text-muted sm:text-[1.0625rem]">
              {checkout.subhead}
            </p>

            {/* Three chips fit one row on a phone; four wrapped to three lines. */}
            <ul className="mt-5 flex flex-wrap items-center justify-center gap-1.5">
              {checkout.trust.map((item) => (
                <li
                  key={item}
                  className="label-caps flex items-center gap-1.5 rounded-full border border-line bg-surface-sunken px-2.5 py-1.5 text-[0.6rem] text-text-muted"
                >
                  <CheckIcon />
                  {item}
                </li>
              ))}
            </ul>

            <Countdown className="mx-auto mt-7 max-w-xs text-left" />
          </Container>
        </section>

        <Container width="wide" className="py-6 sm:py-8">
          <CheckoutForm />
        </Container>

        {/* Risk reversal, stated once — it also appeared in the footer, which
            made the page argue with itself for space. */}
        <section className="border-t border-line bg-surface-sunken py-10">
          <Container width="wide">
            <div className="mx-auto flex max-w-2xl items-start gap-4 rounded-2xl border border-brand/35 bg-brand/[0.07] p-5 sm:p-6">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-brand/40 bg-brand/10">
                <span className="tnum text-lg font-black text-accent-text">
                  {offer.guarantee.uses}
                </span>
              </span>
              <div>
                <h2 className="text-lg font-black tracking-[-0.02em] text-text">
                  {checkout.guarantee.title}
                </h2>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-text/85">
                  {checkout.guarantee.body}
                </p>
              </div>
            </div>
          </Container>
        </section>

        {/* Social proof converts hard at the payment step — but an empty
            placeholder block is just extra scrolling between the buyer and the
            button. It appears by itself once `testimonials` has entries. */}
        {testimonials.length > 0 && <Testimonials />}
      </main>

      <footer className="border-t border-line bg-surface py-8">
        <Container width="wide">
          <p className="text-[0.8125rem] leading-relaxed text-text-muted">
            <span className="font-bold text-text">{checkout.help.title}</span>{" "}
            {checkout.help.body}
          </p>

          <p className="mt-5 border-t border-line pt-5 text-[0.75rem] leading-relaxed text-text-dim">
            {legal.disclaimer}
          </p>
          <p className="mt-3 text-[0.75rem] text-text-dim">
            © {offer.copyrightYear} {offer.brand}. All rights reserved.
          </p>
        </Container>
      </footer>
    </>
  );
}

function LockIcon() {
  return (
    <svg aria-hidden viewBox="0 0 20 20" fill="none" className="h-3.5 w-3.5">
      <rect
        x="4"
        y="8.5"
        width="12"
        height="8"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="M7 8.5V6.5a3 3 0 0 1 6 0v2"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg aria-hidden viewBox="0 0 20 20" fill="none" className="h-3 w-3 text-brand">
      <path
        d="m4 10.5 4 4 8-9"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
