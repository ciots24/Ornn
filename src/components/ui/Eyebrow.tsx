import type { ReactNode } from "react";

/**
 * Section eyebrow: a red tick, then condensed caps.
 * The tick is the page's smallest unit of red — it marks where a new claim starts.
 */
export function Eyebrow({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={`flex items-center gap-2.5 label-caps text-text-muted ${className}`}>
      <span aria-hidden className="h-3 w-[3px] shrink-0 bg-brand" />
      {children}
    </p>
  );
}
