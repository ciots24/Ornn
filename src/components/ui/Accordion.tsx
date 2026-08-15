import type { Prose as ProseLines } from "@/content/copy";

/**
 * Native <details>/<summary>. It is keyboard accessible, screen-reader correct,
 * and works before JavaScript loads — which matters when most of this traffic
 * arrives on a phone over mobile data.
 */
export function Accordion({
  items,
}: {
  items: readonly { q: string; a: ProseLines }[];
}) {
  return (
    <div className="divide-y divide-ink-500 overflow-hidden rounded-2xl border border-ink-500 bg-ink-700">
      {items.map((item) => (
        <details key={item.q} className="group">
          <summary className="flex cursor-pointer list-none items-start gap-4 px-5 py-5 transition-colors duration-200 hover:bg-ink-600 [&::-webkit-details-marker]:hidden">
            <span className="flex-1 text-[1.0625rem] font-bold leading-snug text-paper">
              {item.q}
            </span>
            <span
              aria-hidden
              className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-ink-400 text-fog transition-all duration-200 group-hover:border-brand group-hover:text-brand group-open:rotate-45 group-open:border-brand group-open:bg-brand group-open:text-paper"
            >
              <svg viewBox="0 0 20 20" fill="none" className="h-3 w-3">
                <path
                  d="M10 4v12M4 10h12"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </summary>
          <div className="space-y-3 px-5 pb-5 pr-14 text-[0.9375rem] leading-[1.7] text-fog">
            {item.a.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </details>
      ))}
    </div>
  );
}
