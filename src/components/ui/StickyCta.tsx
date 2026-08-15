"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { offer, peso } from "@/content/offer";
import { BrandLockup } from "./Logo";

/** Roughly the bar's own height — a button hidden behind it is not "on screen". */
const BAR_CLEARANCE = 96;

/**
 * Keeps the offer one tap away once the visitor is past the hero, and steps
 * aside whenever a real CTA button is already on screen.
 *
 * Bottom bar on phones — thumb reach — and a slim top bar on desktop, where a
 * bottom bar reads as a cookie banner.
 */
export function StickyCta() {
  const [pastHero, setPastHero] = useState(false);
  const [ctaOnScreen, setCtaOnScreen] = useState(false);

  useEffect(() => {
    let frame = 0;

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        setPastHero(window.scrollY > 700);
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  // While a real CTA button is in view the bar is redundant, so it gets out of
  // the way — one less fixed element covering the page, and no competing target.
  useEffect(() => {
    const buttons = document.querySelectorAll("[data-cta]");
    if (buttons.length === 0) return;

    const onScreen = new Set<Element>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) onScreen.add(entry.target);
          else onScreen.delete(entry.target);
        }
        setCtaOnScreen(onScreen.size > 0);
      },
      { rootMargin: `0px 0px -${BAR_CLEARANCE}px 0px` },
    );

    buttons.forEach((button) => observer.observe(button));
    return () => observer.disconnect();
  }, []);

  const visible = pastHero && !ctaOnScreen;

  const price = (
    <span className="flex items-baseline gap-1.5">
      <span className="tnum text-sm text-text-dim line-through">
        {peso(offer.price.regular)}
      </span>
      <span className="tnum text-xl font-black leading-none text-text">
        {peso(offer.price.founding)}
      </span>
    </span>
  );

  return (
    <>
      {/* Phones */}
      <div
        className={`fixed inset-x-0 bottom-0 z-50 border-t border-line bg-surface/95 backdrop-blur-md transition-transform duration-300 md:hidden ${
          visible ? "translate-y-0" : "translate-y-full"
        }`}
        inert={!visible}
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="flex min-w-0 flex-col gap-0.5">
            {price}
            <span className="label-caps text-[0.6rem] text-text-dim">
              {offer.price.discountLabel} today
            </span>
          </div>
          <Link
            href={offer.checkoutUrl}
            prefetch
            className="btn-primary flex min-h-[3.25rem] flex-1 items-center justify-center gap-2 rounded-full px-4 text-[0.9375rem] font-black text-on-brand"
          >
            Get access
            <svg aria-hidden viewBox="0 0 24 24" fill="none" className="h-4 w-4">
              <path
                d="M5 12h13m0 0-5-5m5 5-5 5"
                stroke="currentColor"
                strokeWidth="2.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </div>

      {/* Desktop */}
      <div
        className={`fixed inset-x-0 top-0 z-50 hidden border-b border-line bg-surface/92 backdrop-blur-md transition-transform duration-300 md:block ${
          visible ? "translate-y-0" : "-translate-y-full"
        }`}
        inert={!visible}
      >
        <div className="mx-auto flex max-w-[72rem] items-center gap-6 px-6 py-3">
          <BrandLockup logoClassName="h-5" />

          <span className="ml-auto flex items-center gap-2.5">
            <span className="label-caps text-text-dim">
              Founding price ends {offer.deadlineLabel}
            </span>
            {price}
          </span>

          <Link
            href={offer.checkoutUrl}
            prefetch
            className="btn-primary btn-shine group flex min-h-[2.75rem] items-center gap-2 rounded-full px-6 text-[0.9375rem] font-black text-on-brand hover:btn-primary-hover"
          >
            Get access
            <svg
              aria-hidden
              viewBox="0 0 24 24"
              fill="none"
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
            >
              <path
                d="M5 12h13m0 0-5-5m5 5-5 5"
                stroke="currentColor"
                strokeWidth="2.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </div>
    </>
  );
}
