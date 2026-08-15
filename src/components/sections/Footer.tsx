import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { legal } from "@/content/copy";
import { offer } from "@/content/offer";

export function Footer() {
  return (
    <footer className="border-t border-ink-500 bg-ink-950 pb-28 pt-12 md:pb-14">
      <Container width="wide">
        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-5">
          <p className="label-caps text-paper">
            {offer.brand}
            <span className="mx-2 text-ink-400">/</span>
            <span className="text-fog">{offer.product}</span>
          </p>

          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            <a
              href="#whats-inside"
              className="text-sm text-fog transition-colors hover:text-paper"
            >
              What&apos;s inside
            </a>
            <a
              href="#case-study"
              className="text-sm text-fog transition-colors hover:text-paper"
            >
              The 37-client case study
            </a>
            <a
              href="#faq"
              className="text-sm text-fog transition-colors hover:text-paper"
            >
              FAQ
            </a>
            <Link
              href={offer.checkoutUrl}
              prefetch
              className="text-sm font-bold text-brand-hi transition-colors hover:text-paper"
            >
              Get access
            </Link>
          </nav>
        </div>

        <p className="mt-8 max-w-3xl border-t border-ink-500 pt-6 text-[0.8125rem] leading-relaxed text-fog-dim">
          {legal.disclaimer}
        </p>

        <p className="mt-5 text-[0.8125rem] text-fog-dim">
          © {offer.copyrightYear} {offer.brand}. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}
