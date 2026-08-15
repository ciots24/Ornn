import { Container } from "@/components/ui/Container";
import { CtaBlock } from "@/components/ui/CtaBlock";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { CheckList, Heading } from "@/components/ui/List";
import { Prose } from "@/components/ui/Prose";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { forYou, system } from "@/content/copy";

export function SystemIntro() {
  return (
    <Section tone="base">
      <Container>
        <Reveal>
          <Eyebrow>{system.eyebrow}</Eyebrow>
          <Heading className="mt-5">{system.title}</Heading>
        </Reveal>

        <Reveal className="mt-8">
          <Prose lines={system.body} size="lead" />
        </Reveal>

        <Reveal className="mt-8">
          <p className="label-caps text-fog-dim">Ginamit ko &apos;to para…</p>
          <ul className="mt-4 space-y-3">
            {system.usedFor.map((item) => (
              <li key={item} className="flex gap-3.5">
                <span
                  aria-hidden
                  className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rotate-45 bg-brand"
                />
                <span className="text-[1.0625rem] leading-[1.6] text-paper/90">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="mt-9 space-y-2">
          {system.notThis.map((line) => (
            <p
              key={line}
              className="text-[1.0625rem] leading-[1.6] text-fog-dim"
            >
              {line}
            </p>
          ))}
        </Reveal>

        <Reveal className="mt-6">
          <Prose lines={system.isThis} className="text-paper/90" />
        </Reveal>
      </Container>

      {/* Qualification — reader checks themselves in before the deliverables. */}
      <Container className="mt-16">
        <Reveal>
          <Eyebrow>{forYou.eyebrow}</Eyebrow>
          <Heading size="md" className="mt-5">
            {forYou.title}
          </Heading>
        </Reveal>

        <CheckList items={forYou.items} className="mt-7" />

        <Reveal className="mt-8">
          <p className="text-lg font-bold text-paper">{forYou.close}</p>
        </Reveal>

        <CtaBlock className="mt-10" />
      </Container>
    </Section>
  );
}
