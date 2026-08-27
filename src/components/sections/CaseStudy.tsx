import { Container } from "@/components/ui/Container";
import { CtaBlock } from "@/components/ui/CtaBlock";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Exhibit, railCardClass, railSizes } from "@/components/ui/Exhibit";
import { Heading } from "@/components/ui/List";
import { Ledger } from "@/components/ui/Ledger";
import { Prose } from "@/components/ui/Prose";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { caseStudy, receipts } from "@/content/copy";

/** The offer that was tested, then the conversations and the client gift. */
const testedOffer = {
  src: "/proof/offer-pricing.webp",
  width: 373,
  height: 664,
  alt: "Sell2Sawa Expansion pricing card at ₱3,499, down from ₱15,000, listing AI setup, training, follow-ups and automated comments",
  caption: "The offer we tested",
  note: "₱3,499 frontend, down from ₱15,000.",
};

const evidence = [testedOffer, ...receipts.slice(3)];

const ledgerSheet = {
  src: "/proof/ledger-37.webp",
  width: 301,
  height: 552,
  alt: "Spreadsheet rows 15 through 37, each an assisted sale priced at ₱3,499, ₱5,000 or ₱9,000",
  caption: "The sheet · rows 15–37",
  note: "Last row is 37. Prices ₱3,499–₱9,000.",
};

const journeyFlow = {
  src: "/proof/journey-flow.webp",
  width: 1080,
  height: 1350,
  alt: "Client journey flow diagram running from advertising through discovery, payment, onboarding and live implementation",
  caption: "The client journey",
  note: "From ad click to live implementation, 11 stages.",
};

export function CaseStudy() {
  return (
    <Section id="case-study" tone="deep" className="border-y border-line">
      <Container width="wide">
        <Reveal className="max-w-2xl">
          <span className="label-caps inline-flex items-center gap-2 rounded-full border border-brand/40 bg-brand/10 px-3.5 py-1.5 text-accent-text">
            Free bonus · included today
          </span>
          <Eyebrow className="mt-6">{caseStudy.eyebrow}</Eyebrow>
          <Heading className="mt-5">{caseStudy.title}</Heading>
        </Reveal>

        {/* Signature: the tally and the counter, stamped in as you arrive. */}
        <div className="mt-10">
          <Ledger />
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,24rem)_minmax(0,1fr)]">
          <Reveal>
            <Exhibit
              image={ledgerSheet}
              sizes="(min-width: 1024px) 24rem, 100vw"
              className="h-full"
            />
          </Reveal>

          <Reveal delay={80} className="flex flex-col gap-4">
            <div className="rounded-2xl border border-line bg-surface-raised p-6 sm:p-8">
              <Prose lines={caseStudy.intro} />
            </div>

            <div className="rounded-2xl border border-line bg-surface-raised p-6 sm:p-8">
              <p className="label-caps text-text-dim">
                Now picture this in your business
              </p>
              <ul className="mt-5 space-y-5">
                {caseStudy.math.map((row) => (
                  <li key={row.question}>
                    <p className="text-[0.9375rem] text-text-muted">{row.question}</p>
                    <p className="mt-1 text-lg font-black leading-snug text-text sm:text-xl">
                      {row.answer}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Container>

      {/* The nine steps, in the order they happened. */}
      <Container width="wide" className="mt-14">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:gap-10">
          <div>
            <Reveal>
              <h3 className="display-md text-text">The exact system we ran</h3>
            </Reveal>

            <ol className="mt-7 space-y-0">
              {caseStudy.steps.map((step, index) => (
                <Reveal as="li" key={step.label} delay={index * 45}>
                  <div className="flex gap-4 border-t border-line py-4">
                    <span className="tnum label-caps w-6 shrink-0 pt-1 text-accent-text">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <p className="font-bold leading-snug text-text">
                        {step.label}
                      </p>
                      <p className="mt-1 text-[0.9375rem] leading-snug text-text-muted">
                        {step.detail}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>

          <Reveal delay={100} className="lg:pt-16">
            <Exhibit image={journeyFlow} sizes="(min-width: 1024px) 26rem, 100vw" />
          </Reveal>
        </div>
      </Container>

      {/* Everything else the two weeks produced. */}
      <div className="mt-14">
        <Container width="wide">
          <Reveal className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
            <h3 className="display-md text-text">What it looked like on the ground</h3>
            <p className="label-caps text-text-dim">
              Swipe <span aria-hidden>→</span>
            </p>
          </Reveal>
        </Container>

        <div
          role="group"
          aria-label="Evidence from the two-week test, scroll horizontally"
          className="rail mt-6 gap-4 px-5 pb-2 sm:px-6 lg:mx-auto lg:max-w-[72rem]"
        >
          {evidence.map((item) => (
            <Exhibit
              key={item.src}
              image={item}
              sizes={railSizes(item)}
              className={railCardClass(item)}
            />
          ))}
          <span aria-hidden className="rail-item w-1 sm:w-2" />
        </div>
      </div>

      <Container className="mt-14">
        <Reveal>
          <Prose lines={caseStudy.close} />
        </Reveal>
        <CtaBlock className="mt-10" />
      </Container>
    </Section>
  );
}
