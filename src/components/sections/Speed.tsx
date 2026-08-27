import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/List";
import { Prose } from "@/components/ui/Prose";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { speed } from "@/content/copy";

export function Speed() {
  return (
    <Section tone="raised">
      <Container>
        <Reveal>
          <Eyebrow>{speed.eyebrow}</Eyebrow>
          <Heading className="mt-5">{speed.title}</Heading>
        </Reveal>

        <Reveal className="mt-8">
          <Prose lines={speed.body} />
        </Reveal>

        {/* Clock times, not step numbers — the order is a real afternoon. */}
        <Reveal className="mt-10">
          <ol className="relative space-y-0 border-l border-line pl-0">
            {speed.timeline.map((entry, index) => {
              const isLast = index === speed.timeline.length - 1;
              return (
                <li key={entry.time} className="relative flex gap-5 pb-7 pl-6 last:pb-0">
                  <span
                    aria-hidden
                    className={`absolute -left-[5px] top-[0.4rem] h-[9px] w-[9px] rounded-full ${
                      isLast ? "bg-brand ring-4 ring-brand/20" : "bg-line-strong"
                    }`}
                  />
                  <span className="label-caps tnum w-[4.5rem] shrink-0 pt-1 text-text-dim">
                    {entry.time}
                  </span>
                  <span
                    className={`text-[1.0625rem] leading-snug ${
                      isLast ? "font-bold text-text" : "text-text/85"
                    }`}
                  >
                    {entry.event}
                  </span>
                </li>
              );
            })}
          </ol>
        </Reveal>

        <Reveal className="mt-9">
          <Prose lines={speed.close} />
        </Reveal>
      </Container>
    </Section>
  );
}
