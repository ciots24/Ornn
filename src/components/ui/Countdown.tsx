"use client";

import { useSyncExternalStore } from "react";
import { offer } from "@/content/offer";

/** Re-render once a second; the snapshot is the current whole second. */
function subscribe(onChange: () => void) {
  const id = setInterval(onChange, 1000);
  return () => clearInterval(id);
}

const getSnapshot = () => Math.floor(Date.now() / 1000);
/** No clock on the server — the markup renders empty and fills in on mount. */
const getServerSnapshot = () => null;

type Remaining = { days: number; hours: number; minutes: number; seconds: number };

function remainingUntil(targetMs: number, nowSec: number): Remaining | null {
  const ms = targetMs - nowSec * 1000;
  if (ms <= 0) return null;
  return {
    days: Math.floor(ms / 86_400_000),
    hours: Math.floor(ms / 3_600_000) % 24,
    minutes: Math.floor(ms / 60_000) % 60,
    seconds: Math.floor(ms / 1000) % 60,
  };
}

/**
 * Counts down to the founding-price deadline in `offer.deadlineIso`.
 *
 * Reads the clock through useSyncExternalStore so server and client markup
 * always agree — the server has no snapshot, so it reserves the space and the
 * digits appear on hydration.
 */
export function Countdown({ className = "" }: { className?: string }) {
  const nowSec = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (nowSec === null) {
    return <div className={`h-[4.5rem] ${className}`} aria-hidden />;
  }

  const left = remainingUntil(new Date(offer.deadlineIso).getTime(), nowSec);

  if (!left) {
    return (
      <p className={`label-caps text-fog ${className}`}>
        Founding price has closed
      </p>
    );
  }

  const units = [
    { value: left.days, label: "Days" },
    { value: left.hours, label: "Hrs" },
    { value: left.minutes, label: "Min" },
    { value: left.seconds, label: "Sec" },
  ];

  return (
    <div className={className}>
      <p className="label-caps mb-3 text-fog-dim">
        ₱{offer.price.founding} ends {offer.deadlineLabel}
      </p>
      <div
        className="flex items-stretch gap-2"
        role="timer"
        aria-label={`${left.days} days, ${left.hours} hours, ${left.minutes} minutes left at the founding price`}
      >
        {units.map((unit) => (
          <div
            key={unit.label}
            className="flex min-w-[3.75rem] flex-1 flex-col items-center rounded-xl border border-ink-500 bg-ink-700 px-2 py-2.5 sm:min-w-[4.5rem]"
          >
            <span className="tnum text-2xl font-black leading-none text-paper sm:text-3xl">
              {String(unit.value).padStart(2, "0")}
            </span>
            <span className="label-caps mt-1.5 text-[0.6rem] text-fog-dim">
              {unit.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
