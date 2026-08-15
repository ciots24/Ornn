import { AssetSlot } from "@/components/ui/AssetSlot";
import { Container } from "@/components/ui/Container";
import { CtaBlock } from "@/components/ui/CtaBlock";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/List";
import { Prose } from "@/components/ui/Prose";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { story } from "@/content/copy";

export function Story() {
  return (
    <Section tone="raised">
      <Container>
        <Reveal>
          <Eyebrow>{story.eyebrow}</Eyebrow>
          <Heading className="mt-5">{story.title}</Heading>
        </Reveal>

        <Reveal className="mt-8">
          <Prose lines={story.partOne} />
        </Reveal>
      </Container>

      <Container width="wide" className="my-10">
        <div className="grid gap-4 sm:grid-cols-2">
          <Reveal>
            <AssetSlot
              slot={{
                ratio: "4 / 3",
                label: "JB at the car dealership",
                spec: "JB working on the laptop in the office, or a wide shot mid-work. No dealership branding — 1200×900",
              }}
              sizes="(min-width: 640px) 34rem, 100vw"
            />
          </Reveal>
          <Reveal delay={90}>
            <AssetSlot
              slot={{
                ratio: "4 / 3",
                label: "₱100M+ ad spend dashboard",
                spec: "Ads Manager screenshot showing the ₱100M+ total. No date range needed — 1200×900",
              }}
              sizes="(min-width: 640px) 34rem, 100vw"
            />
          </Reveal>
        </div>
      </Container>

      <Container>
        <Reveal>
          <Prose lines={story.partTwo} />
        </Reveal>

        {/* The three conditions that used to gate winning at Meta ads. */}
        <Reveal className="mt-7">
          <ul className="space-y-0 overflow-hidden rounded-2xl border border-line bg-surface-raised">
            {story.requirements.map((item, index) => (
              <li
                key={item}
                className={`flex items-start gap-3.5 px-5 py-4 ${
                  index > 0 ? "border-t border-line" : ""
                }`}
              >
                <span
                  aria-hidden
                  className="mt-[0.45em] h-px w-4 shrink-0 bg-brand"
                />
                <span className="text-[1.0625rem] leading-snug text-text/90">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="mt-7">
          <Prose lines={story.partThree} />
        </Reveal>

        <Reveal className="mt-9 rounded-2xl border border-brand/35 bg-brand/[0.07] p-6 sm:p-8">
          <Prose lines={story.pivot} className="text-text/90" />
        </Reveal>

        <CtaBlock className="mt-10" />
      </Container>
    </Section>
  );
}
