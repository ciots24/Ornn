import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { DeadEndList, Heading } from "@/components/ui/List";
import { Prose } from "@/components/ui/Prose";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { bigBrands } from "@/content/copy";

export function BigBrands() {
  return (
    <Section tone="base">
      <Container>
        <Reveal>
          <Eyebrow>{bigBrands.eyebrow}</Eyebrow>
          <Heading className="mt-5">{bigBrands.title}</Heading>
        </Reveal>

        <Reveal className="mt-8">
          <Prose lines={bigBrands.intro} />
        </Reveal>

        <DeadEndList items={bigBrands.deadEnds} className="mt-8" />

        <Reveal className="mt-8">
          <Prose lines={bigBrands.close} />
        </Reveal>

        <Reveal className="mt-10 border-l-2 border-brand pl-6">
          <p className="label-caps text-brand">{bigBrands.verdictLead}</p>
          <p className="display-md mt-3 text-balance text-paper">
            {bigBrands.verdict}
          </p>
          <Prose lines={bigBrands.verdictBody} className="mt-5" />
        </Reveal>
      </Container>
    </Section>
  );
}
