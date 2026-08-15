import { Accordion } from "@/components/ui/Accordion";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/List";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { faqs } from "@/content/copy";

export function Faq() {
  return (
    <Section id="faq" tone="raised">
      <Container>
        <Reveal>
          <Eyebrow>Before you decide</Eyebrow>
          <Heading className="mt-5">Frequently asked questions</Heading>
        </Reveal>

        <Reveal className="mt-9">
          <Accordion items={faqs} />
        </Reveal>
      </Container>
    </Section>
  );
}
