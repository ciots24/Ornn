import { Container } from "@/components/ui/Container";
import { Exhibit, railCardClass, railSizes } from "@/components/ui/Exhibit";
import { Reveal } from "@/components/ui/Reveal";
import { receipts } from "@/content/copy";
import { offer, peso } from "@/content/offer";

/** The first three payment screenshots — credibility before the pitch. */
const payments = receipts.slice(0, 3);

export function ProofStrip() {
  return (
    <section
      aria-label="Payment receipts from the two-week test"
      className="border-b border-line bg-surface-alt py-12 sm:py-16"
    >
      <Container width="wide">
        <Reveal className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
          <p className="max-w-md text-balance text-lg font-bold leading-snug text-text sm:text-xl">
            Real receipts from the two-week test that closed{" "}
            <span className="text-accent-text">
              {offer.results.clients} clients
            </span>{" "}
            on {peso(offer.results.dailySpend)} a day.
          </p>
          <p className="label-caps text-text-dim">
            Swipe to read <span aria-hidden>→</span>
          </p>
        </Reveal>
      </Container>

      {/* Full-bleed rail so the last card bleeds off-screen and invites a swipe.
          Browsers make scroll containers focusable, so it gets a name. */}
      <div
        role="group"
        aria-label="Payment receipts, scroll horizontally"
        className="rail mt-6 gap-4 px-5 pb-2 sm:px-6 lg:mx-auto lg:max-w-[72rem]"
      >
        {payments.map((receipt, index) => (
          <Exhibit
            key={receipt.src}
            image={receipt}
            priority={index === 0}
            sizes={railSizes(receipt)}
            className={railCardClass(receipt)}
          />
        ))}
        <span aria-hidden className="rail-item w-1 sm:w-2" />
      </div>
    </section>
  );
}
