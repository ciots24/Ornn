import type { ReactNode } from "react";

/**
 * Fades content up the first time it enters the viewport.
 *
 * A server component on purpose: it only needs to emit markup. `ScrollEffects`
 * finds every `[data-reveal]` once and drives them all, so adding a reveal
 * costs nothing at runtime beyond one element in a querySelectorAll.
 *
 * Reduced-motion and no-JS both fall back to fully visible — see globals.css
 * and the noscript block in layout.tsx.
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  /** Stagger, in milliseconds. */
  delay?: number;
  className?: string;
  as?: "div" | "li" | "section";
}) {
  return (
    <Tag
      data-reveal=""
      className={`reveal ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
