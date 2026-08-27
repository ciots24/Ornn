import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

function CheckIcon() {
  return (
    <svg aria-hidden viewBox="0 0 20 20" fill="none" className="h-3.5 w-3.5">
      <path
        d="m4 10.5 4 4 8-9"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CrossIcon() {
  return (
    <svg aria-hidden viewBox="0 0 20 20" fill="none" className="h-3 w-3">
      <path
        d="M5 5l10 10M15 5 5 15"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** A confirmed capability. Red badge, white text — the page's "yes". */
export function CheckList({
  items,
  className = "",
}: {
  items: readonly string[];
  className?: string;
}) {
  return (
    <ul className={`space-y-4 ${className}`}>
      {items.map((item, index) => (
        <Reveal as="li" key={item} delay={index * 55}>
          <div className="flex gap-3.5">
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand text-on-brand">
              <CheckIcon />
            </span>
            <span className="text-[1.0625rem] leading-[1.6] text-text/90">
              {item}
            </span>
          </div>
        </Reveal>
      ))}
    </ul>
  );
}

/** A dead end. Struck through in outline, never in red — red means "this works". */
export function DeadEndList({
  items,
  className = "",
}: {
  items: readonly { label: string; body: string }[];
  className?: string;
}) {
  return (
    <ul className={`space-y-3 ${className}`}>
      {items.map((item, index) => (
        <Reveal as="li" key={item.label} delay={index * 60}>
          <div className="flex gap-3.5 rounded-xl border border-line bg-surface-raised/70 p-4">
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-line-strong text-text-dim">
              <CrossIcon />
            </span>
            <div>
              <p className="font-bold text-text/70 line-through decoration-text-dim decoration-1">
                {item.label}
              </p>
              <p className="mt-1 text-[0.9375rem] leading-relaxed text-text-muted">
                {item.body}
              </p>
            </div>
          </div>
        </Reveal>
      ))}
    </ul>
  );
}

/** "From X → to Y" — the transformation line under each module. */
export function ShiftLine({ from, to }: { from: string; to: string }) {
  return (
    <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.9375rem]">
      <span className="text-text-dim line-through decoration-1">
        &ldquo;{from}&rdquo;
      </span>
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        fill="none"
        className="h-3.5 w-3.5 shrink-0 text-brand"
      >
        <path
          d="M5 12h13m0 0-5-5m5 5-5 5"
          stroke="currentColor"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="font-bold text-text">&ldquo;{to}&rdquo;</span>
    </p>
  );
}

/** Section heading with an optional eyebrow slot above it. */
export function Heading({
  children,
  size = "lg",
  className = "",
}: {
  children: ReactNode;
  size?: "lg" | "md";
  className?: string;
}) {
  return (
    <h2
      className={`${size === "lg" ? "display-lg" : "display-md"} text-balance text-text ${className}`}
    >
      {children}
    </h2>
  );
}
