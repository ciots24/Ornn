import type { Prose as ProseLines } from "@/content/copy";

/**
 * Renders each copy line as its own paragraph. The sales letter's rhythm is
 * one thought per line, so line breaks are content — not formatting.
 */
export function Prose({
  lines,
  className = "",
  size = "base",
}: {
  lines: ProseLines;
  className?: string;
  size?: "base" | "lead";
}) {
  const sizing =
    size === "lead"
      ? "text-lg leading-[1.6] sm:text-xl sm:leading-[1.55] text-text/90"
      : "prose-line";

  return (
    <div className={`space-y-4 ${sizing} ${className}`}>
      {lines.map((line) => (
        <p key={line}>{line}</p>
      ))}
    </div>
  );
}
