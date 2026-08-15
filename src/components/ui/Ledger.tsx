"use client";

import { useEffect, useRef, useState } from "react";
import { offer, peso } from "@/content/offer";
import { Marker } from "./Marker";

const TOTAL = offer.results.clients;
const CELLS = Array.from({ length: TOTAL }, (_, i) => i);

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * The page's one orchestrated motion moment.
 *
 * Thirty-seven cells stamp in while the counter runs — one cell per client
 * actually closed, in the order they were closed. The tally is the claim; the
 * spreadsheet screenshot beside it is the receipt.
 */
export function Ledger() {
  const ref = useRef<HTMLDivElement>(null);
  const [running, setRunning] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setRunning(true);
        observer.disconnect();
      },
      { threshold: 0.25 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!running) return;

    // Reduced motion lands on the final number on the very first frame.
    const duration = prefersReducedMotion() ? 0 : 1500;
    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const t = duration === 0 ? 1 : Math.min((now - start) / duration, 1);
      // Ease-out cubic: fast off the line, settles on the number.
      const eased = 1 - Math.pow(1 - t, 3);
      setCount(Math.round(eased * TOTAL));
      if (t < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [running]);

  return (
    <div ref={ref} className="rounded-3xl border border-line bg-surface-raised p-5 sm:p-7">
      <p className="label-caps text-text-dim">Clients closed</p>

      {/* The circle mark overflows its box, so the number gets its own row. */}
      <p className="mt-5 flex items-baseline gap-8 pl-3 sm:gap-10 sm:pl-5">
        <Marker shape="circle">
          <span className="tnum text-[4.5rem] font-black leading-[0.85] tracking-[-0.05em] text-text sm:text-[6rem]">
            {count}
          </span>
        </Marker>
        <span className="label-caps text-text-muted">in 14 days</span>
      </p>

      <dl className="mt-8 grid grid-cols-3 gap-3 border-t border-line pt-5">
        <Stat label="Ad spend" value={peso(offer.results.totalSpend)} />
        <Stat label="Started at" value={`${peso(offer.results.dailySpend)}/day`} />
        <Stat
          label="Revenue"
          value={`₱${offer.results.revenueLow}–${offer.results.revenueHigh}K`}
          highlight
        />
      </dl>

      {/* Receipt tape: one cell per client, stamped in sequence. */}
      <div
        className="mt-7 grid grid-cols-[repeat(10,minmax(0,1fr))] gap-1.5 sm:grid-cols-[repeat(19,minmax(0,1fr))] lg:grid-cols-[repeat(37,minmax(0,1fr))]"
        role="img"
        aria-label={`${TOTAL} clients closed, each at ${peso(offer.results.frontendPrice)}`}
      >
        {CELLS.map((index) => (
          <span
            key={index}
            aria-hidden
            data-filled={running}
            style={{ transitionDelay: `${index * 34}ms` }}
            className="flex aspect-square items-center justify-center rounded-[5px] border border-line-strong bg-surface-raised text-transparent transition-all duration-300 ease-out data-[filled=true]:border-brand data-[filled=true]:bg-brand data-[filled=true]:text-on-brand motion-reduce:transition-none motion-reduce:delay-0"
          >
            <svg viewBox="0 0 20 20" fill="none" className="h-2/5 w-2/5">
              <path
                d="m4 10.5 4 4 8-9"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        ))}
      </div>

      <p className="mt-4 text-[0.8125rem] leading-relaxed text-text-dim">
        {peso(offer.results.frontendPrice)} frontend each · around half added a{" "}
        {peso(5000)} upsell · {offer.results.retained} of {TOTAL} still paying
        monthly, six months on
      </p>
    </div>
  );
}

function Stat({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div>
      <dt className="label-caps text-text-dim">{label}</dt>
      <dd
        className={`tnum mt-1.5 text-[0.9375rem] font-black leading-tight sm:text-2xl ${
          highlight ? "text-accent-text" : "text-text"
        }`}
      >
        {value}
      </dd>
    </div>
  );
}
