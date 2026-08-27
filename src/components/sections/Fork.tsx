import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/List";
import { Prose } from "@/components/ui/Prose";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { fork } from "@/content/copy";

export function Fork() {
  return (
    <Section tone="base">
      <Container width="wide">
        <Reveal className="max-w-xl">
          <Eyebrow>{fork.eyebrow}</Eyebrow>
          <Heading className="mt-5">{fork.title}</Heading>
        </Reveal>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {fork.options.map((option, index) => {
            const isMove = option.kind === "move";
            return (
              <Reveal key={option.label} delay={index * 90} className="h-full">
                <div
                  className={`flex h-full flex-col rounded-2xl border p-6 sm:p-8 ${
                    isMove
                      ? "border-brand/45 bg-brand/[0.07]"
                      : "border-line bg-surface-sunken"
                  }`}
                >
                  <p
                    className={`label-caps ${isMove ? "text-accent-text" : "text-text-dim"}`}
                  >
                    {option.label}
                  </p>
                  <h3
                    className={`mt-3 text-xl font-black leading-tight tracking-[-0.02em] sm:text-2xl ${
                      isMove ? "text-text" : "text-text-muted"
                    }`}
                  >
                    {option.heading}
                  </h3>

                  <ul className="mt-6 space-y-3.5">
                    {option.items.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span
                          aria-hidden
                          className={`mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full ${
                            isMove ? "bg-brand" : "bg-line-strong"
                          }`}
                        />
                        <span
                          className={`text-[0.9375rem] leading-[1.6] ${
                            isMove ? "text-text/90" : "text-text-dim"
                          }`}
                        >
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mx-auto mt-10 max-w-[42rem]">
          <Prose lines={fork.close} />
          <p className="mt-6 text-xl font-black leading-snug text-text sm:text-2xl">
            {fork.kicker}
          </p>
        </Reveal>

        {/* Sign-off */}
        <Reveal className="mx-auto mt-12 flex max-w-[42rem] items-center gap-4 border-t border-line pt-8">
          <span
            aria-hidden
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand text-lg font-black text-on-brand"
          >
            {fork.signature.name.charAt(0)}
          </span>
          <span>
            <span className="block font-black text-text">
              {fork.signature.name}
            </span>
            <span className="label-caps block text-text-dim">
              {fork.signature.role}
            </span>
          </span>
        </Reveal>
      </Container>
    </Section>
  );
}
