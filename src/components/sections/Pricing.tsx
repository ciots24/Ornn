import { Container } from "@/components/ui/Container";
import { Countdown } from "@/components/ui/Countdown";
import { CtaButton } from "@/components/ui/CtaButton";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/List";
import { Marker } from "@/components/ui/Marker";
import { Prose } from "@/components/ui/Prose";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { pricing } from "@/content/copy";
import { offer, peso, totalValue, valueStack } from "@/content/offer";

export function Pricing() {
  return (
    <Section id="pricing" tone="base">
      <Container>
        <Reveal>
          <Eyebrow>{pricing.eyebrow}</Eyebrow>
          <Heading className="mt-5">How much is the Ads2Sawa System?</Heading>
        </Reveal>

        <Reveal className="mt-8">
          <Prose lines={pricing.lead} />
        </Reveal>

        {/* Value stack — the total is summed from the data, never typed by hand. */}
        <Reveal className="mt-10 overflow-hidden rounded-2xl border border-ink-500 bg-ink-700">
          <ul>
            {valueStack.map((item) => (
              <li
                key={item.name}
                className="flex items-baseline justify-between gap-4 border-b border-ink-500 px-5 py-4"
              >
                <span className="text-[0.9375rem] leading-snug text-paper/85">
                  {item.name}
                </span>
                <span className="tnum shrink-0 font-bold text-fog">
                  {peso(item.value)}
                </span>
              </li>
            ))}
          </ul>

          <div className="flex items-baseline justify-between gap-4 bg-ink-600 px-5 py-5">
            <span className="label-caps text-fog">Total value</span>
            <span className="tnum text-2xl font-black text-paper">
              {peso(totalValue)}+
            </span>
          </div>
        </Reveal>

        <Reveal className="mt-8">
          <Prose lines={pricing.afterStack} />
        </Reveal>

        <Reveal className="mt-9">
          <p className="text-lg font-bold text-fog-dim">
            And this does not cost {peso(totalValue)}.
          </p>
          <ul className="mt-3 space-y-1.5">
            {pricing.ladder.map((line) => (
              <li
                key={line}
                className="text-xl font-black leading-tight text-fog-dim sm:text-2xl"
              >
                {line}
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>

      {/* The reveal */}
      <Container width="wide" className="mt-14">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-brand/45 bg-ink-800">
            <div aria-hidden className="absolute inset-0 grid-veil" />
            <div
              aria-hidden
              className="absolute -top-32 left-1/2 h-80 w-[36rem] -translate-x-1/2 rounded-full bg-brand/18 blur-[100px]"
            />

            <div className="relative px-6 py-12 text-center sm:px-10 sm:py-16">
              <h3 className="display-md mx-auto max-w-2xl text-balance text-paper">
                {pricing.title}
              </h3>
              <p className="mx-auto mt-3 max-w-md text-balance text-fog">
                {pricing.subtitle}
              </p>

              <div className="mt-10 flex flex-wrap items-center justify-center gap-x-12 gap-y-4 sm:gap-x-16">
                <span className="tnum text-3xl font-black text-fog-dim line-through decoration-brand decoration-[3px] sm:text-4xl">
                  {peso(offer.price.regular)}
                </span>
                <Marker shape="circle">
                  <span className="tnum text-[4rem] font-black leading-[0.9] tracking-[-0.045em] text-paper sm:text-[5.5rem]">
                    {peso(offer.price.founding)}
                  </span>
                </Marker>
              </div>

              <p className="label-caps mt-6 inline-flex items-center gap-2 rounded-full bg-brand px-4 py-2 text-paper">
                {offer.price.discountLabel} · Founding price
              </p>

              <Countdown className="mx-auto mt-9 max-w-sm" />

              <div className="mt-9 flex flex-col items-center">
                <CtaButton href={offer.checkoutUrl} className="max-w-lg">
                  Access the Ads2Sawa System
                </CtaButton>
                <p className="label-caps mt-4 text-fog">
                  One-time payment · Instant access · {offer.guarantee.label}
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>

      <Container className="mt-12">
        <Reveal>
          <Prose lines={pricing.reveal} />
        </Reveal>
        <Reveal className="mt-6 border-l-2 border-brand pl-6">
          <Prose lines={pricing.catch} className="text-paper/85" />
        </Reveal>
      </Container>
    </Section>
  );
}
