import { adCreatives, type AdCreative } from "@/content/ads";

/**
 * Swipeable wall of ads the system actually produced.
 *
 * Sits inside the Image Ads Strategist module because that module's promise is
 * "10 branded image ads in one hour" — showing ten of them is the proof of that
 * exact sentence, not decoration.
 *
 * Every tile is a `data-zoom-*` trigger, so the single `ImageLightbox` already
 * in the layout handles full-size viewing and zoom. No extra client JS.
 */
function srcSet(ad: AdCreative): string | undefined {
  if (!ad.widths.length) return undefined;
  const base = ad.src.replace(/\.webp$/, "");
  return [
    ...ad.widths.map((w) => `${base}-${w}w.webp ${w}w`),
    `${ad.src} ${ad.width}w`,
  ].join(", ");
}

export function AdGallery({ className = "" }: { className?: string }) {
  if (adCreatives.length === 0) return null;

  return (
    <div className={className}>
      <div className="flex items-baseline justify-between gap-4">
        <p className="label-caps text-brand-hi">
          {adCreatives.length} ads made with this GPT
        </p>
        <p className="label-caps text-fog-dim">
          Swipe <span aria-hidden>→</span>
        </p>
      </div>

      <div
        role="group"
        aria-label="Ad creatives generated with the Image Ads Strategist GPT"
        className="rail mt-3 gap-3 pb-2"
      >
        {adCreatives.map((ad, index) => (
          <button
            key={ad.src}
            type="button"
            data-zoom-src={ad.src}
            data-zoom-alt={ad.alt}
            data-zoom-caption={`Ad ${index + 1} of ${adCreatives.length}`}
            aria-label={`View ad ${index + 1} of ${adCreatives.length} at full size`}
            className="rail-item group w-[58%] max-w-[13rem] overflow-hidden rounded-xl border border-ink-500 bg-ink-700 transition-colors duration-200 hover:border-brand focus-visible:border-brand"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={ad.src}
              srcSet={srcSet(ad)}
              sizes="(min-width: 640px) 13rem, 58vw"
              alt={ad.alt}
              width={ad.width}
              height={ad.height}
              loading="lazy"
              decoding="async"
              className="block h-auto w-full transition-transform duration-300 group-hover:scale-[1.03]"
            />
          </button>
        ))}
        <span aria-hidden className="rail-item w-px" />
      </div>
    </div>
  );
}
