import Link from "next/link";
import type { ReactNode } from "react";

type Size = "lg" | "md";

/**
 * Internal routes go through next/link so Next prefetches the destination as
 * the button scrolls into view. By the time someone taps a CTA, /checkout is
 * already in the cache and paints instantly — the single biggest speed win
 * available on a funnel with one destination.
 */
function isInternal(href: string) {
  return href.startsWith("/");
}

const sizes: Record<Size, string> = {
  lg: "min-h-[3.75rem] px-8 text-[1.0625rem] sm:min-h-[4.25rem] sm:px-11 sm:text-xl",
  md: "min-h-[3.25rem] px-6 text-base sm:min-h-[3.5rem] sm:px-8 sm:text-lg",
};

/**
 * The one primary action on the page. Full-width on mobile because that is
 * where almost every visitor is, and a 60px+ tap target is non-negotiable there.
 */
export function CtaButton({
  href,
  size = "lg",
  className = "",
  children,
}: {
  href: string;
  size?: Size;
  className?: string;
  children: ReactNode;
}) {
  // StickyCta watches every [data-cta] and steps aside while one is on screen.
  const props = {
    "data-cta": "",
    className: `btn-primary btn-shine group inline-flex w-full items-center justify-center gap-3 rounded-full text-center font-black tracking-[-0.01em] text-paper hover:btn-primary-hover active:translate-y-0 sm:w-auto ${sizes[size]} ${className}`,
  };

  const content = (
    <>
      <span>{children}</span>
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        fill="none"
        className="h-[1.1em] w-[1.1em] shrink-0 transition-transform duration-200 group-hover:translate-x-1"
      >
        <path
          d="M5 12h13m0 0-5.5-5.5M18 12l-5.5 5.5"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </>
  );

  if (isInternal(href)) {
    return (
      <Link href={href} prefetch {...props}>
        {content}
      </Link>
    );
  }

  return (
    <a href={href} {...props}>
      {content}
    </a>
  );
}

/** Secondary, quieter action — used once, for the FAQ jump. */
export function GhostButton({
  href,
  className = "",
  children,
}: {
  href: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      className={`inline-flex min-h-[3rem] items-center justify-center rounded-full border border-ink-400 px-6 text-sm font-medium text-fog transition-colors duration-200 hover:border-fog-dim hover:text-paper ${className}`}
    >
      {children}
    </a>
  );
}
