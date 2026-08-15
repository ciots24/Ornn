"use client";

import { useEffect, useState } from "react";
import { peso } from "@/content/offer";
import { checkout } from "@/content/checkout";

/**
 * Running total pinned to the bottom of the viewport, so the buyer never has
 * to scroll back to find out what a ticked bump did to their bill.
 *
 * It steps aside while the real submit button is on screen — two buttons
 * competing for the same tap is the same leak the landing page avoids.
 */
export function StickyTotal({ total }: { total: number }) {
  const [submitVisible, setSubmitVisible] = useState(false);

  useEffect(() => {
    const target = document.querySelector("[data-checkout-submit]");
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => setSubmitVisible(entry.isIntersecting),
      { rootMargin: "0px 0px -96px 0px" },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  const hidden = submitVisible;

  const scrollToSubmit = () => {
    document
      .querySelector("[data-checkout-submit]")
      ?.scrollIntoView({ block: "center", behavior: "smooth" });
  };

  return (
    <div
      inert={hidden}
      className={`fixed inset-x-0 bottom-0 z-50 border-t border-ink-500 bg-ink-900/95 backdrop-blur-md transition-transform duration-300 lg:hidden ${
        hidden ? "translate-y-full" : "translate-y-0"
      }`}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="flex items-center gap-3 px-4 py-3">
        <div className="flex min-w-0 flex-col gap-0.5">
          <span className="label-caps text-[0.6rem] text-fog-dim">
            {checkout.summary.totalLabel}
          </span>
          <span className="tnum text-xl font-black leading-none text-paper">
            {peso(total)}
          </span>
        </div>

        <button
          type="button"
          onClick={scrollToSubmit}
          className="btn-primary flex min-h-[3.25rem] flex-1 items-center justify-center gap-2 rounded-full px-4 text-[0.9375rem] font-black text-paper"
        >
          Pay now
          <svg aria-hidden viewBox="0 0 24 24" fill="none" className="h-4 w-4">
            <path
              d="M5 12h13m0 0-5-5m5 5-5 5"
              stroke="currentColor"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
