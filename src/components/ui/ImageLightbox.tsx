"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/** Fit-to-width first, then multiples of it. */
const ZOOM_STEPS = [1, 2, 3, 4] as const;
const ZOOM_LABELS = ["Fit", "2×", "3×", "4×"] as const;

type Target = { src: string; alt: string; caption: string };

/**
 * One zoom viewer for every exhibit on the page.
 *
 * Each `Exhibit` used to carry its own client component, so eleven exhibits
 * meant eleven hydration roots and eleven copies of this dialog. Now the
 * triggers are plain server-rendered buttons carrying `data-zoom-*`, and this
 * single island listens for their clicks. The `<img>` mounts only once a viewer
 * is actually opened, which most visitors never do.
 *
 * Built on a native <dialog> with showModal(): Escape-to-close, focus trap and
 * an inert background come free and correct.
 */
export function ImageLightbox() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [target, setTarget] = useState<Target | null>(null);
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const trigger = (event.target as HTMLElement | null)?.closest<HTMLElement>(
        "[data-zoom-src]",
      );
      if (!trigger) return;

      event.preventDefault();
      setTarget({
        src: trigger.dataset.zoomSrc ?? "",
        alt: trigger.dataset.zoomAlt ?? "",
        caption: trigger.dataset.zoomCaption ?? "",
      });
      setStepIndex(0);
      dialogRef.current?.showModal();
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const close = useCallback(() => dialogRef.current?.close(), []);
  const scale = ZOOM_STEPS[stepIndex];
  const zoomed = stepIndex > 0;

  return (
    <dialog
      ref={dialogRef}
      onClick={(event) => event.target === dialogRef.current && close()}
      onClose={() => setTarget(null)}
      aria-label={target ? `${target.caption} — full size` : "Image viewer"}
      className="max-h-[92vh] w-[96vw] max-w-[80rem] rounded-2xl border border-ink-400 bg-ink-800 p-0 text-paper backdrop:bg-black/85 backdrop:backdrop-blur-sm"
    >
      <div className="flex max-h-[92vh] flex-col">
        <header className="flex shrink-0 items-center gap-2 border-b border-ink-500 px-3 py-2.5 sm:gap-3 sm:px-4 sm:py-3">
          <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-brand" />
          <span className="label-caps truncate text-paper/85">
            {target?.caption}
          </span>

          <div className="ml-auto flex shrink-0 items-center gap-1">
            <ZoomButton
              onClick={() => setStepIndex((i) => Math.max(i - 1, 0))}
              disabled={stepIndex === 0}
              label="Zoom out"
              path="M5 10h10"
            />
            <span className="tnum w-8 text-center text-xs font-bold text-fog">
              {ZOOM_LABELS[stepIndex]}
            </span>
            <ZoomButton
              onClick={() =>
                setStepIndex((i) => Math.min(i + 1, ZOOM_STEPS.length - 1))
              }
              disabled={stepIndex === ZOOM_STEPS.length - 1}
              label="Zoom in"
              path="M10 5v10M5 10h10"
            />
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="ml-2 flex h-9 w-9 items-center justify-center rounded-full border border-ink-400 text-fog transition-colors duration-200 hover:border-brand hover:bg-brand hover:text-paper"
            >
              <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4">
                <path
                  d="M5 5l10 10M15 5 5 15"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </header>

        <div className="min-h-0 flex-1 overflow-auto bg-ink-950 p-3">
          {target && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={target.src}
              alt={target.alt}
              onClick={() => setStepIndex((i) => (i === 0 ? 2 : 0))}
              style={{ width: `${scale * 100}%` }}
              className={`block max-w-none rounded-lg ${
                zoomed ? "cursor-zoom-out" : "cursor-zoom-in"
              }`}
            />
          )}
        </div>

        <p className="shrink-0 border-t border-ink-500 px-4 py-2 text-center text-[0.75rem] text-fog-dim">
          Tap to zoom · swipe to pan · Esc to close
        </p>
      </div>
    </dialog>
  );
}

function ZoomButton({
  onClick,
  disabled,
  label,
  path,
}: {
  onClick: () => void;
  disabled: boolean;
  label: string;
  path: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-ink-400 text-fog transition-colors duration-200 hover:border-brand hover:text-brand-hi disabled:cursor-not-allowed disabled:opacity-35"
    >
      <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4">
        <path d={path} stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    </button>
  );
}
