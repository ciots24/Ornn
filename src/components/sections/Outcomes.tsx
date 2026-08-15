import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { outcomes } from "@/content/copy";

export function Outcomes() {
  return (
    <Section tone="base" aria-labelledby="outcomes-heading">
      <Container width="wide">
        {/* The cards carry h3s, so without this the page jumped h1 → h3 and the
            section had no name for screen readers. Visually the card titles are
            heading enough, so this stays hidden. */}
        <h2 id="outcomes-heading" className="sr-only">
          What the Ads2Sawa system does for you
        </h2>

        <ul className="grid gap-4 sm:grid-cols-2">
          {outcomes.map((item, index) => (
            <Reveal
              as="li"
              key={item.title}
              delay={index * 70}
              className="h-full"
            >
              <div className="flex h-full flex-col rounded-2xl border border-ink-500 bg-ink-700 p-6 transition-colors duration-300 hover:border-ink-400">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand text-paper">
                  <Icon name={item.icon} className="h-[1.15rem] w-[1.15rem]" />
                </span>
                <h3 className="mt-4 text-lg font-black leading-snug tracking-[-0.015em] text-paper sm:text-xl">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-[0.9375rem] leading-[1.65] text-fog">
                  {item.body}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
