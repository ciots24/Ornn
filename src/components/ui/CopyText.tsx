"use client";

import { useEffect, useState } from "react";

/**
 * Copy-to-clipboard for every `[data-copy]` button on the page.
 *
 * Same shape as `ImageLightbox`: the triggers are plain server-rendered
 * buttons carrying their own text, and this single island listens for their
 * clicks. Twenty hooks would otherwise mean twenty hydration roots for what is
 * one line of behaviour.
 *
 * Feedback is a `data-copied` attribute the button styles itself from, plus
 * one live region here so the copy is announced rather than only shown.
 */
/**
 * Most of this page's traffic arrives from a Meta ad, which means a large
 * share of it is inside the Facebook in-app browser — where the async
 * clipboard API is frequently missing or silently denied. The old
 * execCommand path still works there, so it stays as the fallback.
 */
async function writeToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Off-screen rather than hidden: a display:none field can't be selected.
    const field = document.createElement("textarea");
    field.value = text;
    field.setAttribute("readonly", "");
    field.style.cssText = "position:fixed;top:0;left:-9999px;opacity:0";
    document.body.appendChild(field);
    field.select();
    field.setSelectionRange(0, text.length);
    let ok = false;
    try {
      ok = document.execCommand("copy");
    } catch {
      ok = false;
    }
    field.remove();
    return ok;
  }
}

export function CopyText() {
  const [announcement, setAnnouncement] = useState("");

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;

    const onClick = (event: MouseEvent) => {
      const trigger = (event.target as HTMLElement | null)?.closest<HTMLElement>(
        "[data-copy]",
      );
      const text = trigger?.dataset.copy;
      if (!trigger || !text) return;

      event.preventDefault();
      writeToClipboard(text).then((ok) => {
        if (!ok) {
          // Leave them one gesture from copying by hand rather than just
          // telling them it failed.
          const range = document.createRange();
          range.selectNodeContents(trigger);
          const selection = window.getSelection();
          selection?.removeAllRanges();
          selection?.addRange(range);
          setAnnouncement("Couldn't copy automatically — the hook is selected.");
          return;
        }

        // Clear any button still showing "Copied" from a previous click, so
        // two ticks are never on screen at once.
        document
          .querySelectorAll<HTMLElement>("[data-copied='true']")
          .forEach((el) => delete el.dataset.copied);

        trigger.dataset.copied = "true";
        setAnnouncement(`Copied: ${text}`);

        clearTimeout(timer);
        timer = setTimeout(() => {
          delete trigger.dataset.copied;
          setAnnouncement("");
        }, 1800);
      });
    };

    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("click", onClick);
      clearTimeout(timer);
    };
  }, []);

  return (
    <span role="status" aria-live="polite" className="sr-only">
      {announcement}
    </span>
  );
}
