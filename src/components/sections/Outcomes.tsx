import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { outcomes } from "@/content/copy";

export function Outcomes() {
  return (
    <Section tone="base">
      <Container width="wide">
        <ul className="grid gap-4 sm:grid-cols-2">
          {outcomes.map((item, index) => (
            <Reveal
              as="li"
              key={item.title}
              delay={index * 70}
              className="h-full"
            >
              <div className="flex h-full flex-col rounded-2xl border border-ink-500 bg-ink-700 p-6 transition-colors duration-300 hover:border-ink-400">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand text-paper">
                  <svg
                    aria-hidden
                    viewBox="0 0 20 20"
                    fill="none"
                    className="h-4 w-4"
                  >
                    <path
                      d="m4 10.5 4 4 8-9"
                      stroke="currentColor"
                      strokeWidth="2.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
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
