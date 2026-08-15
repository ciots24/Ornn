import { AssetSlot } from "@/components/ui/AssetSlot";
import { Container } from "@/components/ui/Container";
import { CtaBlock } from "@/components/ui/CtaBlock";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Exhibit } from "@/components/ui/Exhibit";
import { Heading, ShiftLine } from "@/components/ui/List";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { modules } from "@/content/copy";
import { peso } from "@/content/offer";

export function Modules() {
  return (
    <Section id="whats-inside" tone="raised">
      <Container width="wide">
        <Reveal className="max-w-2xl">
          <Eyebrow>What you get</Eyebrow>
          <Heading className="mt-5">
            Seven pieces. Every one of them removes a step you&apos;d otherwise
            pay for.
          </Heading>
        </Reveal>

        <div className="mt-12 space-y-4">
          {modules.map((item, index) => (
            <Reveal key={item.id}>
              <article className="overflow-hidden rounded-3xl border border-ink-500 bg-ink-700">
                <div
                  className={`grid items-center gap-0 lg:grid-cols-2 ${
                    index % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  {/* Copy */}
                  <div className="p-6 sm:p-8 lg:p-10">
                    <p className="label-caps text-brand">
                      {peso(item.value)} value
                    </p>
                    <h3 className="mt-3 text-2xl font-black leading-[1.1] tracking-[-0.025em] text-paper sm:text-3xl">
                      {item.name}
                    </h3>
                    <p className="mt-3.5 text-[0.9375rem] leading-[1.65] text-fog">
                      {item.summary}
                    </p>

                    <ul className="mt-6 space-y-3 border-t border-ink-500 pt-6">
                      {item.benefits.map((benefit) => (
                        <li key={benefit} className="flex gap-3">
                          <span className="mt-[0.35em] flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-brand/20 text-brand">
                            <svg
                              aria-hidden
                              viewBox="0 0 20 20"
                              fill="none"
                              className="h-2.5 w-2.5"
                            >
                              <path
                                d="m4 10.5 4 4 8-9"
                                stroke="currentColor"
                                strokeWidth="3.2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                          <span className="text-[0.9375rem] leading-[1.6] text-paper/85">
                            {benefit}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-6 border-t border-ink-500 pt-5">
                      <ShiftLine from={item.shift.from} to={item.shift.to} />
                    </div>
                  </div>

                  {/* Asset */}
                  <div className="border-t border-ink-500 bg-ink-800 p-5 sm:p-7 lg:h-full lg:border-l lg:border-t-0 lg:p-8">
                    <div className="flex h-full items-center justify-center">
                      {"asset" in item ? (
                        <Exhibit
                          image={item.asset}
                          sizes="(min-width: 1024px) 34rem, 92vw"
                          className="w-full"
                        />
                      ) : (
                        <AssetSlot
                          slot={item.slot}
                          sizes="(min-width: 1024px) 34rem, 92vw"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <CtaBlock className="mt-12" />
      </Container>
    </Section>
  );
}
