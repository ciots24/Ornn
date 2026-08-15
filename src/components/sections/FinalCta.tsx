import { Container } from "@/components/ui/Container";
import { Countdown } from "@/components/ui/Countdown";
import { CtaButton } from "@/components/ui/CtaButton";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/List";
import { Prose } from "@/components/ui/Prose";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { finalCta } from "@/content/copy";
import { offer, peso } from "@/content/offer";

export function FinalCta() {
  return (
    <Section tone="base" className="overflow-hidden">
      <div aria-hidden className="absolute inset-0 grid-veil" />
      <div
        aria-hidden
        className="absolute -bottom-56 left-1/2 h-[28rem] w-[44rem] -translate-x-1/2 rounded-full brand-glow"
      />

      <Container className="relative">
        <Reveal>
          <Eyebrow>{finalCta.eyebrow}</Eyebrow>
          <Heading className="mt-5">{finalCta.title}</Heading>
        </Reveal>

        <Reveal className="mt-8">
          <Prose lines={finalCta.body} />
        </Reveal>

        <Reveal className="mt-9">
          <p className="text-lg leading-[1.6] text-text/90">
            {finalCta.challenge}
          </p>
          <p className="mt-4 text-2xl font-black leading-snug text-text sm:text-3xl">
            {finalCta.answer}
          </p>
        </Reveal>

        <Reveal className="mt-12 flex flex-col items-center rounded-3xl border border-line bg-surface-sunken/80 px-6 py-10 text-center backdrop-blur-sm sm:px-10">
          <p className="flex items-baseline gap-3">
            <span className="tnum text-xl font-bold text-text-dim line-through decoration-brand decoration-2">
              {peso(offer.price.regular)}
            </span>
            <span className="tnum text-5xl font-black leading-none tracking-[-0.04em] text-text sm:text-6xl">
              {peso(offer.price.founding)}
            </span>
          </p>

          <Countdown className="mt-8 w-full max-w-sm" />

          <CtaButton href={offer.checkoutUrl} className="mt-8 max-w-lg">
            Access the Ads2Sawa System
          </CtaButton>

          <p className="label-caps mt-4 text-text-dim">
            {offer.price.discountLabel} · Instant access · {offer.guarantee.label}
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
