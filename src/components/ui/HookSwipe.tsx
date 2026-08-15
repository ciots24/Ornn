import { hookGroups, hookSampleCount } from "@/content/hooks";

/** Matches the fill-in tokens: [like this]. */
const TOKEN = /(\[[^\]]+\])/g;

/**
 * Renders one hook with its tokens marked.
 *
 * The brackets are what separate a template from a headline — they show where
 * the buyer's own offer goes. Marking them in red is the annotator's pen doing
 * its actual job: pointing at the variable part.
 */
function HookLine({ text }: { text: string }) {
  return text.split(TOKEN).map((part, index) =>
    part.startsWith("[") && part.endsWith("]") ? (
      <span key={index} className="font-bold text-accent-text">
        {part}
      </span>
    ) : (
      part
    ),
  );
}

/**
 * The hook library, mounted as a swipeable deck of one card per hook *job*.
 *
 * Deliberately not an image. Twenty lines of small type rendered as a
 * screenshot would need the zoom viewer just to be readable, and could never
 * be copied. As text it stays sharp at any zoom, weighs nothing, the tokens
 * carry the colour, and every line goes to the clipboard on tap — which is how
 * a swipe file is actually used.
 *
 * The whole row is the button: on a phone, a 16px copy icon is a missed tap.
 */
export function HookSwipe({ className = "" }: { className?: string }) {
  if (hookGroups.length === 0) return null;

  return (
    <div className={className}>
      <div className="flex items-baseline justify-between gap-4">
        <p className="label-caps text-accent-text">
          {hookSampleCount} of the 100+ hooks
        </p>
        <p className="label-caps text-text-dim">
          Tap to copy <span aria-hidden>→</span>
        </p>
      </div>

      <div
        role="group"
        aria-label="Sample hooks from the library, grouped by what each one does"
        className="rail mt-3 gap-3 pb-2"
      >
        {hookGroups.map((group) => (
          <article
            key={group.id}
            className="rail-item w-[80%] max-w-[20rem] overflow-hidden rounded-xl border border-line bg-surface-raised"
          >
            <header className="border-b border-line px-3.5 py-2.5">
              <div className="flex items-center gap-2">
                <span
                  aria-hidden
                  className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand"
                />
                <h4 className="label-caps truncate text-text">{group.name}</h4>
                <span className="tnum label-caps ml-auto shrink-0 text-[0.6rem] text-text-dim">
                  {group.lines.length}
                </span>
              </div>
              <p className="mt-1.5 text-[0.75rem] leading-snug text-text-dim">
                {group.job}
              </p>
            </header>

            <ol className="divide-y divide-line">
              {group.lines.map((line) => (
                <li key={line}>
                  {/* Plain server-rendered trigger. The one <CopyText> in the
                      layout listens for these, so the deck costs no client JS. */}
                  <button
                    type="button"
                    data-copy={line}
                    aria-label={`Copy hook: ${line}`}
                    className="group/hook flex w-full items-start gap-2.5 px-3.5 py-2.5 text-left transition-colors duration-200 hover:bg-brand/[0.06] data-[copied=true]:bg-brand/[0.12]"
                  >
                    <span className="flex-1 text-[0.8125rem] leading-[1.5] text-text/85">
                      <HookLine text={line} />
                    </span>
                    <span
                      aria-hidden
                      className="mt-[0.15em] shrink-0 text-text-dim transition-colors duration-200 group-hover/hook:text-accent-text"
                    >
                      {/* The tick carries its own colour rather than inheriting
                          through a group variant — it only ever renders in the
                          copied state, so the state doesn't need to travel. */}
                      <CopyIcon className="h-3.5 w-3.5 group-data-[copied=true]/hook:hidden" />
                      <CheckIcon className="hidden h-3.5 w-3.5 text-accent-text group-data-[copied=true]/hook:block" />
                    </span>
                  </button>
                </li>
              ))}
            </ol>
          </article>
        ))}
        <span aria-hidden className="rail-item w-px" />
      </div>
    </div>
  );
}

function CopyIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className}>
      <rect
        x="7"
        y="7"
        width="9.5"
        height="9.5"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="M13 4.5H5.5a2 2 0 0 0-2 2V14"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className}>
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
