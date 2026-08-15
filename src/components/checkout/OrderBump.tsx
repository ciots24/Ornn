"use client";

import type { Bump } from "@/content/checkout";
import { peso } from "@/content/offer";
import { ShiftLine } from "@/components/ui/List";

/**
 * The order bump. The whole card is the label, so any tap anywhere on it
 * toggles the checkbox — on a phone, a 16px checkbox is a missed sale.
 *
 * Selected state is signalled with the brand color and a solid border rather
 * than only the tick, so it stays obvious at a glance while scrolling.
 */
export function OrderBump({
  bump,
  checked,
  onToggle,
}: {
  bump: Bump;
  checked: boolean;
  onToggle: (id: string) => void;
}) {
  const saving = bump.wasPrice ? bump.wasPrice - bump.price : 0;

  return (
    <label
      className={`block cursor-pointer rounded-2xl border-2 border-dashed p-5 transition-colors duration-200 sm:p-6 ${
        checked
          ? "border-solid border-brand bg-brand/[0.09]"
          : "border-line-strong bg-surface-sunken/60 hover:border-brand/60"
      }`}
    >
      <div className="flex gap-4">
        {/* The real control stays in the DOM for keyboard and screen readers;
            the visible box is a sibling driven by `peer-checked`. */}
        <input
          type="checkbox"
          checked={checked}
          onChange={() => onToggle(bump.id)}
          className="peer sr-only"
        />
        <span
          aria-hidden
          className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 border-line-strong bg-surface-raised text-transparent transition-colors duration-200 peer-checked:border-brand peer-checked:bg-brand peer-checked:text-on-brand peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand-hi"
        >
          <svg viewBox="0 0 20 20" fill="none" className="h-3.5 w-3.5">
            <path
              d="m4 10.5 4 4 8-9"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>

        <div className="min-w-0 flex-1">
          <p className="label-caps text-accent-text">{bump.ribbon}</p>

          <p className="mt-2 text-lg font-black leading-snug tracking-[-0.02em] text-text sm:text-xl">
            <span className="text-accent-text">Yes</span> — add the {bump.name}
          </p>

          <ul className="mt-4 space-y-2.5">
            {bump.includes.map((item) => (
              <li key={item} className="flex gap-2.5">
                <svg
                  aria-hidden
                  viewBox="0 0 20 20"
                  fill="none"
                  className="mt-[0.3em] h-3.5 w-3.5 shrink-0 text-brand"
                >
                  <path
                    d="m4 10.5 4 4 8-9"
                    stroke="currentColor"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-[0.9375rem] leading-[1.55] text-text/85">
                  {item}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-5 border-t border-line pt-4">
            <ShiftLine from={bump.shift.from} to={bump.shift.to} />
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2">
            <span className="tnum text-2xl font-black leading-none text-text">
              +{peso(bump.price)}
            </span>
            {bump.wasPrice && (
              <>
                <span className="tnum text-base font-bold text-text-dim line-through">
                  {peso(bump.wasPrice)}
                </span>
                <span className="label-caps rounded-full bg-brand px-2.5 py-1 text-on-brand">
                  Save {peso(saving)}
                </span>
              </>
            )}
          </div>

        </div>
      </div>
    </label>
  );
}
