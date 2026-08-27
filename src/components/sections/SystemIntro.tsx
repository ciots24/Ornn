import { Container } from "@/components/ui/Container";
import { CtaBlock } from "@/components/ui/CtaBlock";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Exhibit } from "@/components/ui/Exhibit";
import { CheckList, Heading } from "@/components/ui/List";
import { ProofVideo } from "@/components/ui/ProofVideo";
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
          <p className="label-caps text-text-dim">Ginamit ko &apos;to para…</p>
          <ul className="mt-4 space-y-3">
            {system.usedFor.map((item) => (
              <li key={item} className="flex gap-3.5">
                <span
                  aria-hidden
                  className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rotate-45 bg-brand"
                />
                <span className="text-[1.0625rem] leading-[1.6] text-text/90">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* These three claims previously stood on their own. The receipts for
            two of them now sit directly beneath, where the doubt is. */}
        <Reveal className="mt-7 grid gap-4 sm:grid-cols-2">
          <Exhibit
            image={{
              src: "/proof/shopify-326k.webp",
              width: 1864,
              height: 794,
              alt: "Store dashboard for February 1–28 showing ₱326,171.05 in total sales, 564 orders and a 3.27% conversion rate, sales up 82%",
              caption: "₱326,171.05 · Feb 1–28",
              note: "564 orders, sales up 82%, conversion 3.27%.",
            }}
            sizes="(min-width: 640px) 26rem, 92vw"
          />
          <ProofVideo
            src="/proof/sale-18900.mp4"
            poster="/proof/sale-18900-poster.webp"
            width={540}
            height={960}
            caption="₱18,900 in a day"
            note="Screen recording. Tap play — it downloads nothing until you do."
          />
        </Reveal>

        <Reveal className="mt-9 space-y-2">
          {system.notThis.map((line) => (
            <p
              key={line}
              className="text-[1.0625rem] leading-[1.6] text-text-dim"
            >
              {line}
            </p>
          ))}
        </Reveal>

        <Reveal className="mt-6">
          <Prose lines={system.isThis} className="text-text/90" />
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
          <p className="text-lg font-bold text-text">{forYou.close}</p>
        </Reveal>

        <CtaBlock className="mt-10" />
      </Container>
    </Section>
  );
}
