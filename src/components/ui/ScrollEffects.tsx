"use client";

import { useEffect } from "react";

/**
 * Drives every scroll-triggered effect on the page from one place.
 *
 * `Reveal` and `Marker` used to be client components, so a page with 62 reveals
 * shipped 62 hydration roots and created 62 IntersectionObservers. They render
 * identical markup and want identical behaviour, so they're now plain server
 * components that emit `data-reveal` / `data-marker`, and this single island
 * wires them all up after the HTML has already painted.
 *
 * Elements unobserve themselves once shown — these are one-shot animations, and
 * a page this long would otherwise keep dozens of observers live while scrolling.
 */
export function ScrollEffects() {
  useEffect(() => {
    const reveals = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-shown", "true");
          reveals.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 },
    );

    const markers = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target
            .querySelectorAll(".marker-path")
            .forEach((path) => path.setAttribute("data-shown", "true"));
          markers.unobserve(entry.target);
        }
      },
      { threshold: 0.6 },
    );

    document.querySelectorAll("[data-reveal]").forEach((el) => reveals.observe(el));
    document.querySelectorAll("[data-marker]").forEach((el) => markers.observe(el));

    return () => {
      reveals.disconnect();
      markers.disconnect();
    };
  }, []);

  return null;
}
