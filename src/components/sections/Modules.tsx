import { AssetSlot } from "@/components/ui/AssetSlot";
import { Container } from "@/components/ui/Container";
import { CtaBlock } from "@/components/ui/CtaBlock";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Exhibit } from "@/components/ui/Exhibit";
import { Heading, ShiftLine } from "@/components/ui/List";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { AdGallery } from "@/components/ui/AdGallery";
import { HookSwipe } from "@/components/ui/HookSwipe";
import { Icon } from "@/components/ui/Icon";
import { VideoRail } from "@/components/ui/VideoRail";
import { adCreatives } from "@/content/ads";
import { hookVaultClips, scriptProofClips } from "@/content/videos";
import { modules } from "@/content/copy";
import { offer, peso, totalValue } from "@/content/offer";

export function Modules() {
  return (
    /* Given the hero's own treatment — grid, bloom, hairline edges — because
       this is the third event on the page, not another step. The tone stays in
       the alternating rhythm so the section still hands off cleanly to its
       neighbours; the texture is what marks it. */
    <Section
      id="whats-inside"
      tone="raised"
      className="overflow-hidden border-y border-line"
    >
      <div aria-hidden className="absolute inset-0 grid-veil" />
      <div
        aria-hidden
        className="brand-glow pointer-events-none absolute -top-52 left-1/2 h-[34rem] w-[52rem] -translate-x-1/2 rounded-full"
      />

      <Container width="wide" className="relative">
        <Reveal className="max-w-2xl">
          <Eyebrow>What you get</Eyebrow>
          <Heading className="mt-5">
            Seven pieces. Every one of them removes a step you&apos;d otherwise
            pay for.
          </Heading>
        </Reveal>

        {/* The whole argument in one line, before the inventory that proves it.
            Reading order is deliberate: count, then worth, then price. The
            total comes from `valueStack` — the same figure Pricing quotes, so
            the two sections can never disagree. */}
        <Reveal className="mt-8">
          <dl className="grid max-w-2xl grid-cols-3 overflow-hidden rounded-2xl border border-line bg-surface-raised">
            <Tally label="Modules" value={String(modules.length)} />
            <Tally label="Total value" value={`${peso(totalValue)}+`} divided />
            <Tally
              label="You pay"
              value={peso(offer.price.founding)}
              divided
              accent
            />
          </dl>
        </Reveal>

        <div className="mt-8 space-y-4">
          {modules.map((item, index) => (
            <Reveal key={item.id}>
              <article className="group relative overflow-hidden rounded-3xl border border-line bg-surface-raised transition-colors duration-300 hover:border-line-strong">
                <div
                  className={`grid items-center gap-0 lg:grid-cols-2 ${
                    index % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  {/* Copy */}
                  <div className="relative overflow-hidden p-6 sm:p-8 lg:p-10">
                    {/* A catalogue numeral, barely there. It makes "seven
                        pieces" literal and gives each card a place in the
                        sequence without spending any colour on it. It lives in
                        the copy column, not the card, because the columns swap
                        every other card and the asset panel is opaque. */}
                    <span
                      aria-hidden
                      className="pointer-events-none absolute -top-4 right-2 select-none font-condensed text-[6rem] font-bold leading-none text-text/[0.05] sm:right-4 sm:text-[8rem]"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    {/* The mark says what this module IS, so seven cards stay
                        scannable instead of reading as one wall of text. */}
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-line-strong bg-surface-sunken text-accent-text transition-colors duration-300 group-hover:border-brand/50">
                        <Icon name={item.icon} className="h-5 w-5" />
                      </span>
                      <p className="label-caps rounded-full border border-brand/35 bg-brand/[0.09] px-3 py-1.5 text-accent-text">
                        {peso(item.value)} value
                      </p>
                    </div>
                    <h3 className="mt-4 text-2xl font-black leading-[1.1] tracking-[-0.025em] text-text sm:text-3xl">
                      {item.name}
                    </h3>
                    <p className="mt-3.5 text-[0.9375rem] leading-[1.65] text-text-muted">
                      {item.summary}
                    </p>

                    <ul className="mt-6 space-y-3 border-t border-line pt-6">
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
                          <span className="text-[0.9375rem] leading-[1.6] text-text/85">
                            {benefit}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-6 border-t border-line pt-5">
                      <ShiftLine from={item.shift.from} to={item.shift.to} />
                    </div>
                  </div>

                  {/* Asset */}
                  <div className="border-t border-line bg-surface-sunken p-5 sm:p-7 lg:h-full lg:border-l lg:border-t-0 lg:p-8">
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
                      ) : item.id === "hooks" ? (
                        /* The library itself, not a picture of it. */
                        <HookSwipe className="w-full" />
                      ) : item.id === "video-vault" && hookVaultClips.length > 0 ? (
                        /* Three clips out of the vault. The module's promise is
                           "hooks you can model", so playable reference clips
                           show what modelling actually means — a grid of
                           thumbnails would only prove the vault has files. */
                        <VideoRail
                          clips={hookVaultClips}
                          label="Sample hooks from the vault"
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

/** One cell of the tally strip above the inventory. */
function Tally({
  label,
  value,
  divided = false,
  accent = false,
}: {
  label: string;
  value: string;
  divided?: boolean;
  accent?: boolean;
}) {
  return (
    <div className={`px-3 py-4 sm:px-6 sm:py-5 ${divided ? "border-l border-line" : ""}`}>
      <dt className="label-caps text-[0.6rem] text-text-dim">{label}</dt>
      {/* clamp rather than a breakpoint: "₱35,000+" is the longest figure here
          and it has to survive a 320px phone without clipping. */}
      <dd
        className={`tnum mt-1.5 whitespace-nowrap text-[clamp(0.9375rem,4.4vw,1.5rem)] font-black leading-none tracking-[-0.03em] ${
          accent ? "text-accent-text" : "text-text"
        }`}
      >
        {value}
      </dd>
    </div>
  );
}
