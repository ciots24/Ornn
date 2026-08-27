import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/List";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { testimonials, type Testimonial } from "@/content/copy";

const SLOTS = 3;

/**
 * Renders nothing until there is a real quote to show.
 *
 * The labelled slots below were right for a page still being built, but on a
 * live page they were the opposite of social proof: a heading promising what
 * past clients say, followed by three boxes reading "drop a real client quote
 * here". A visitor reads that as "there are no clients".
 *
 * Nothing here is deleted, and nothing needs editing to bring it back — add
 * an entry to `testimonials` in copy.ts and the whole section returns, slots
 * and all, for however many are still missing.
 */
export function Testimonials() {
  if (testimonials.length === 0) return null;

  const filled = testimonials.slice(0, SLOTS);
  const empty = Math.max(0, SLOTS - filled.length);

  return (
    <Section tone="base">
      <Container width="wide">
        <Reveal className="max-w-xl">
          <Eyebrow>In their words</Eyebrow>
          <Heading className="mt-5">Here&apos;s what past clients say</Heading>
        </Reveal>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {filled.map((item, index) => (
            <Reveal key={item.name} delay={index * 80}>
              <TestimonialCard item={item} />
            </Reveal>
          ))}

          {Array.from({ length: empty }, (_, index) => (
            <Reveal key={`slot-${index}`} delay={(filled.length + index) * 80}>
              <TestimonialSlot index={filled.length + index + 1} />
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function TestimonialCard({ item }: { item: Testimonial }) {
  return (
    <figure className="flex h-full flex-col rounded-2xl border border-line bg-surface-raised p-6">
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-6 w-6 text-brand"
      >
        <path d="M9.6 5.5 6.9 11h2.9v7.5H2.4V11l3-5.5h4.2Zm11.6 0L18.5 11h2.9v7.5H14V11l3-5.5h4.2Z" />
      </svg>

      <blockquote className="mt-4 flex-1 text-[1.0625rem] leading-[1.6] text-text/90">
        {item.quote}
      </blockquote>

      {item.screenshot && (
        <div className="mt-5 overflow-hidden rounded-xl border border-line bg-surface-sunken p-1.5">
          <Image
            src={item.screenshot.src}
            alt={item.screenshot.alt}
            width={item.screenshot.width}
            height={item.screenshot.height}
            sizes="(min-width: 768px) 22rem, 90vw"
            loading="lazy"
            className="w-full rounded-lg"
          />
        </div>
      )}

      <figcaption className="mt-5 flex items-center gap-3 border-t border-line pt-5">
        {item.avatar ? (
          <Image
            src={item.avatar.src}
            alt=""
            width={item.avatar.width}
            height={item.avatar.height}
            className="h-10 w-10 rounded-full object-cover"
          />
        ) : (
          <span
            aria-hidden
            className="flex h-10 w-10 items-center justify-center rounded-full bg-brand/15 text-sm font-black text-accent-text"
          >
            {item.name.charAt(0)}
          </span>
        )}
        <span>
          <span className="block text-sm font-bold text-text">{item.name}</span>
          <span className="label-caps block text-[0.65rem] text-text-dim">
            {item.business}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}

/** Holds the exact card shape until a real testimonial replaces it. */
function TestimonialSlot({ index }: { index: number }) {
  return (
    <div className="flex h-full min-h-[15rem] flex-col justify-between rounded-2xl border border-dashed border-line-strong bg-surface-sunken/60 p-6">
      <p className="label-caps text-text-muted">Testimonial {index}</p>
      <p className="mt-4 flex-1 text-[0.9375rem] leading-relaxed text-text-dim">
        Drop a real client quote here — 2 to 3 sentences, plus first name,
        business type, and city. A screenshot of the original message works even
        harder than a typed quote.
      </p>
      <div className="mt-5 flex items-center gap-3 border-t border-line pt-5">
        <span
          aria-hidden
          className="h-10 w-10 rounded-full border border-dashed border-line-strong"
        />
        <span className="label-caps text-[0.65rem] text-text-dim">
          Name · business · city
        </span>
      </div>
    </div>
  );
}
