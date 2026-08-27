import type { ReactNode } from "react";

type Tone = "base" | "raised" | "deep";

/**
 * Section tones alternate down the page so each block reads as its own beat.
 * Padding lives here and nowhere else — no section overrides it, which keeps
 * the vertical rhythm from drifting as sections get added.
 */
const tones: Record<Tone, string> = {
  base: "bg-surface",
  raised: "bg-surface-alt",
  deep: "bg-surface-sunken",
};

export function Section({
  id,
  tone = "base",
  className = "",
  children,
  "aria-labelledby": ariaLabelledBy,
}: {
  id?: string;
  tone?: Tone;
  className?: string;
  children: ReactNode;
  /** Points at the id of the heading that names this section. */
  "aria-labelledby"?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={ariaLabelledBy}
      // scroll-mt clears the fixed desktop offer bar when jumping to an anchor.
      className={`relative scroll-mt-20 py-band lg:py-band-lg ${tones[tone]} ${className}`}
    >
      {children}
    </section>
  );
}

/** Hairline divider used where two same-tone sections meet. */
export function Hairline() {
  return <div aria-hidden className="h-px w-full bg-line/70" />;
}
