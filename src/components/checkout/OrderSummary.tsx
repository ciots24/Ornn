"use client";

import { bumps, checkout } from "@/content/checkout";
import { offer, peso, totalValue, valueStack } from "@/content/offer";
import { Marker } from "@/components/ui/Marker";

/**
 * The order summary. Line items come from the same `valueStack` the landing
 * page prices against, so the two pages can't disagree about what's included.
 */
export function OrderSummary({
  selected,
  total,
}: {
  selected: readonly string[];
  total: number;
}) {
  const addedBumps = bumps.filter((bump) => selected.includes(bump.id));

  return (
    <div className="rounded-3xl border border-line bg-surface-raised p-5 sm:p-7">
      <p className="label-caps text-text-dim">{checkout.summary.title}</p>

      <p className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className="tnum text-xl font-bold text-text-dim line-through decoration-brand decoration-2">
          {peso(offer.price.regular)}
        </span>
        <span className="tnum text-4xl font-black leading-none tracking-[-0.04em] text-text sm:text-5xl">
          {peso(offer.price.founding)}
        </span>
      </p>
      <p className="mt-2.5 text-[0.8125rem] leading-relaxed text-text-dim">
        {checkout.summary.priceNote}
      </p>

      <ul className="mt-6 space-y-0 border-t border-line">
        {valueStack.map((item) => (
          <li
            key={item.name}
            className="flex items-baseline justify-between gap-3 border-b border-line py-2.5"
          >
            <span className="flex min-w-0 gap-2.5">
              <svg
                aria-hidden
                viewBox="0 0 20 20"
                fill="none"
                className="mt-[0.35em] h-3 w-3 shrink-0 text-brand"
              >
                <path
                  d="m4 10.5 4 4 8-9"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-[0.875rem] leading-snug text-text/85">
                {item.name}
              </span>
            </span>
            <span className="tnum shrink-0 text-[0.8125rem] text-text-dim">
              {peso(item.value)}
            </span>
          </li>
        ))}

        <li className="flex items-baseline justify-between gap-3 border-b border-line py-2.5">
          <span className="flex min-w-0 gap-2.5">
            <span aria-hidden className="mt-[0.15em] shrink-0 text-brand">
              ★
            </span>
            <span className="text-[0.875rem] leading-snug text-text/85">
              Bonus: How We Closed {offer.results.clients} Clients
            </span>
          </span>
          <span className="label-caps shrink-0 text-accent-text">Free</span>
        </li>
      </ul>

      <div className="mt-4 flex items-baseline justify-between gap-3">
        <span className="text-[0.875rem] text-text-muted">
          {checkout.summary.totalValueLabel}
        </span>
        <span className="tnum text-[0.875rem] text-text-dim line-through">
          {peso(totalValue)}+
        </span>
      </div>

      {/* Bumps appear here the moment they're ticked, so the buyer always sees
          exactly what changed their total. */}
      {addedBumps.map((bump) => (
        <div
          key={bump.id}
          className="mt-3 flex items-baseline justify-between gap-3 rounded-xl border border-brand/40 bg-brand/[0.08] px-3.5 py-2.5"
        >
          <span className="text-[0.875rem] font-bold leading-snug text-text">
            + {bump.name}
          </span>
          <span className="tnum shrink-0 text-[0.875rem] font-bold text-text">
            {peso(bump.price)}
          </span>
        </div>
      ))}

      <div className="mt-5 flex items-end justify-between gap-3 border-t-2 border-line-strong pt-5">
        <span className="label-caps text-text">
          {checkout.summary.totalLabel}
        </span>
        <Marker shape="circle">
          <span className="tnum text-3xl font-black leading-none tracking-[-0.03em] text-text sm:text-4xl">
            {peso(total)}
          </span>
        </Marker>
      </div>

    </div>
  );
}
