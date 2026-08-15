import { AssetSlot } from "@/components/ui/AssetSlot";
import { Container } from "@/components/ui/Container";
import { CtaBlock } from "@/components/ui/CtaBlock";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Exhibit } from "@/components/ui/Exhibit";
import { Heading, ShiftLine } from "@/components/ui/List";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { AdGallery } from "@/components/ui/AdGallery";
import { Icon } from "@/components/ui/Icon";
import { VideoRail } from "@/components/ui/VideoRail";
import { adCreatives } from "@/content/ads";
import { scriptProofClips } from "@/content/videos";
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
                    {/* The mark says what this module IS, so seven cards stay
                        scannable instead of reading as one wall of text. */}
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-ink-400 bg-ink-800 text-brand-hi">
                        <Icon name={item.icon} className="h-5 w-5" />
                      </span>
                      <p className="label-caps text-brand">
                        {peso(item.value)} value
                      </p>
                    </div>
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
                    <div className="flex h-full w-full items-center justify-center">
                      {/* The image-ads module shows the ads it actually made —
                          the module's promise is "10 image ads in an hour", so
                          ten of them is the proof of that exact claim. Falls
                          back to the reserved slot until they're imported. */}
                      {item.id === "image-gpt" && adCreatives.length > 0 ? (
                        <AdGallery className="w-full" />
                      ) : item.id === "script-gpt" && scriptProofClips.length > 0 ? (
                        /* Ads that actually ran, scripted by this GPT — better
                           proof than a screenshot of the GPT's output. */
                        <VideoRail
                          clips={scriptProofClips}
                          label="Ads scripted with this GPT"
                          className="w-full"
                        />
                      ) : "asset" in item ? (
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
