import type { ReactNode } from "react";

type Width = "reading" | "wide" | "full";

const widths: Record<Width, string> = {
  /** Long-form sales copy — narrow enough to stay readable on desktop. */
  reading: "max-w-[42rem]",
  /** Cards, grids, proof galleries. */
  wide: "max-w-[72rem]",
  /** Edge-to-edge bands that manage their own inner width. */
  full: "max-w-none",
};

export function Container({
  width = "reading",
  className = "",
  children,
}: {
  width?: Width;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={`mx-auto w-full px-5 sm:px-6 ${widths[width]} ${className}`}>
      {children}
    </div>
  );
}
