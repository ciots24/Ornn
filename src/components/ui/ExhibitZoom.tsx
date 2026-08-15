"use client";

import { useRef, useState, type MouseEvent } from "react";

/**
 * Fit-to-width first, then multiples of it. On a phone, step 3 is roughly the
 * screenshot's native pixel size — which is the point at which chat text
 * becomes comfortably readable.
 */
const ZOOM_STEPS = [1, 2, 3, 4] as const;
const ZOOM_LABELS = ["Fit", "2×", "3×", "4×"] as const;

/**
 * Opens a screenshot at full size in a zoomable viewer.
 *
 * Built on a native <dialog> with showModal(), which brings Escape-to-close,
 * a focus trap and an inert background for free — all of it correct before a
 * single line of our own JavaScript runs.
 */
export function ExhibitZoom({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption: string;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [stepIndex, setStepIndex] = useState(0);
  // The page holds eleven of these. Mounting every <img> up front would put a
  // second copy of every screenshot in the DOM for a viewer most people never
  // open, so the image appears the first time one does.
  const [everOpened, setEverOpened] = useState(false);

  const scale = ZOOM_STEPS[stepIndex];

  const open = () => {
    setStepIndex(0);
    setEverOpened(true);
    dialogRef.current?.showModal();
  };

  const close = () => dialogRef.current?.close();

  /** A click that lands on the dialog itself is a click on the backdrop. */
  const onDialogClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === dialogRef.current) close();
  };

  const zoomIn = () =>
    setStepIndex((i) => Math.min(i + 1, ZOOM_STEPS.length - 1));
  const zoomOut = () => setStepIndex((i) => Math.max(i - 1, 0));
  /** Tapping the image is the fastest way in and back out on a phone. */
  const toggleZoom = () => setStepIndex((i) => (i === 0 ? 2 : 0));
  const zoomed = stepIndex > 0;

  return (
    <>
      <button
        type="button"
        onClick={open}
        aria-label={`View ${caption} at full size`}
        className="ml-auto flex shrink-0 items-center gap-1.5 rounded-full border border-ink-400 px-2 py-1 text-fog transition-colors duration-200 hover:border-brand hover:text-brand-hi @[20rem]:px-2.5"
      >
        <MagnifierIcon />
        <span aria-hidden className="label-caps hidden text-[0.6rem] @[20rem]:inline">
          Full size
        </span>
      </button>

      <dialog
        ref={dialogRef}
        onClick={onDialogClick}
        aria-label={`${caption} — full size`}
        // max-h rather than h: a landscape screenshot shouldn't sit in a
        // letterbox of empty space.
        className="max-h-[92vh] w-[96vw] max-w-[80rem] rounded-2xl border border-ink-400 bg-ink-800 p-0 text-paper backdrop:bg-black/85 backdrop:backdrop-blur-sm"
      >
        <div className="flex max-h-[92vh] flex-col">
          <header className="flex shrink-0 items-center gap-2 border-b border-ink-500 px-3 py-2.5 sm:gap-3 sm:px-4 sm:py-3">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-brand" />
            <span className="label-caps truncate text-paper/85">{caption}</span>

            <div className="ml-auto flex shrink-0 items-center gap-1">
              <ZoomButton
                onClick={zoomOut}
                disabled={stepIndex === 0}
                label="Zoom out"
              >
                <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4">
                  <path
                    d="M5 10h10"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                  />
                </svg>
              </ZoomButton>

              <span className="tnum w-8 text-center text-xs font-bold text-fog">
                {ZOOM_LABELS[stepIndex]}
              </span>

              <ZoomButton
                onClick={zoomIn}
                disabled={stepIndex === ZOOM_STEPS.length - 1}
                label="Zoom in"
              >
                <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4">
                  <path
                    d="M10 5v10M5 10h10"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                  />
                </svg>
              </ZoomButton>

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

          {/* Past "Fit" the image overflows and this box becomes the pan area. */}
          <div className="min-h-0 flex-1 overflow-auto bg-ink-950 p-3">
            {everOpened && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={src}
                alt={alt}
                onClick={toggleZoom}
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
    </>
  );
}

function ZoomButton({
  onClick,
  disabled,
  label,
  children,
}: {
  onClick: () => void;
  disabled: boolean;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-ink-400 text-fog transition-colors duration-200 hover:border-brand hover:text-brand-hi disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-ink-400 disabled:hover:text-fog"
    >
      {children}
    </button>
  );
}

function MagnifierIcon() {
  return (
    <svg aria-hidden viewBox="0 0 20 20" fill="none" className="h-3.5 w-3.5">
      <circle cx="8.75" cy="8.75" r="5.25" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="m12.75 12.75 3.75 3.75M6.75 8.75h4M8.75 6.75v4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}
