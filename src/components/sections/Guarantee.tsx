import { Container } from "@/components/ui/Container";
import { CtaBlock } from "@/components/ui/CtaBlock";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/List";
import { Prose } from "@/components/ui/Prose";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { guarantee } from "@/content/copy";
import { offer } from "@/content/offer";

export function Guarantee() {
  return (
    <Section tone="raised">
      <Container>
        <Reveal className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
          <span
            aria-hidden
            className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-brand/40 bg-brand/10"
          >
            <span className="tnum text-2xl font-black text-accent-text">
              {offer.guarantee.uses}
            </span>
          </span>
          <div>
            <Eyebrow>{guarantee.eyebrow}</Eyebrow>
            <Heading size="md" className="mt-3">
              {guarantee.title}
            </Heading>
          </div>
        </Reveal>

        <Reveal className="mt-8">
          <Prose lines={guarantee.body} />
        </Reveal>

        <Reveal className="mt-8 rounded-2xl border border-line bg-surface-raised p-6 sm:p-8">
          <p className="text-xl font-black leading-snug text-text sm:text-2xl">
            {guarantee.kicker}
          </p>
          <Prose lines={guarantee.closing} className="mt-4" />
          <p className="mt-4 text-lg font-bold leading-snug text-accent-text">
            {guarantee.question}
          </p>
        </Reveal>

        <CtaBlock className="mt-10" showPrice />
      </Container>
    </Section>
  );
}
