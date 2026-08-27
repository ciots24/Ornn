import type { ReactNode } from "react";

type Shape = "underline" | "circle";

/**
 * Red pen over a number. Used sparingly — the hero's daily budget, the 37, and
 * the founding price — because an annotation that marks everything marks nothing.
 *
 * A server component: it emits the SVG and a `data-marker` hook, and
 * `ScrollEffects` draws it when it scrolls into view. Paths carry
 * pathLength="1" so one CSS dash rule animates any shape without measuring it,
 * and vector-effect keeps the stroke weight honest when the box stretches.
 */
export function Marker({
  children,
  shape = "underline",
  className = "",
}: {
  children: ReactNode;
  shape?: Shape;
  className?: string;
}) {
  return (
    <span data-marker="" className={`relative inline-block ${className}`}>
      <span className="relative z-10">{children}</span>
      {shape === "underline" ? <Underline /> : <CircleMark />}
    </span>
  );
}

function Underline() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 300 16"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-x-0 -bottom-[0.18em] h-[0.3em] w-full overflow-visible"
    >
      <path
        d="M3 10.5C58 4.5 132 12.5 297 5.5"
        pathLength={1}
        fill="none"
        stroke="var(--color-brand)"
        strokeWidth={5}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        className="marker-path"
      />
      <path
        d="M14 14.5C74 9.5 148 15.5 288 10"
        pathLength={1}
        fill="none"
        stroke="var(--color-brand)"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeOpacity={0.5}
        vectorEffect="non-scaling-stroke"
        className="marker-path"
        style={{ "--marker-delay": "240ms" } as React.CSSProperties}
      />
    </svg>
  );
}

function CircleMark() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 200 110"
      preserveAspectRatio="none"
      className="pointer-events-none absolute left-1/2 top-1/2 h-[142%] w-[120%] -translate-x-1/2 -translate-y-1/2 overflow-visible"
    >
      <path
        d="M170 26C152 9 96 3 55 12 13 22 3 48 10 69c8 23 57 34 104 33 49-1 85-15 85-39 0-20-19-36-47-44"
        pathLength={1}
        fill="none"
        stroke="var(--color-brand)"
        strokeWidth={3.5}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        className="marker-path"
      />
    </svg>
  );
}
