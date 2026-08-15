import { imageVariants } from "@/content/image-variants";

/**
 * Builds a srcset from the pre-generated variants.
 *
 * `images.unoptimized` means Next emits a bare `src` with no srcset, so a phone
 * would download a 1345px-wide receipt to display it at 300px. Pairing this
 * with the `sizes` each rail already passes lets the browser pick the smallest
 * file that still looks sharp.
 */
function buildSrcSet(src: string, width: number): string | undefined {
  const base = src.replace(/^\/proof\//, "").replace(/\.webp$/, "");
  const widths = imageVariants[base];
  if (!widths?.length) return undefined;

  const entries = widths.map((w) => `/proof/${base}-${w}w.webp ${w}w`);
  entries.push(`${src} ${width}w`);
  return entries.join(", ");
}

/**
 * Portrait screenshots get a narrower card than landscape ones, so a rail of
 * mixed phone photos and desktop captures stays roughly level without cropping
 * anything. Proof is never cropped — the numbers in it are the point.
 */
export function railCardClass(image: { width: number; height: number }): string {
  return image.height > image.width
    ? "rail-item w-[56vw] max-w-[17rem]"
    : "rail-item w-[86vw] max-w-[29rem]";
}

export function railSizes(image: { width: number; height: number }): string {
  return image.height > image.width
    ? "(min-width: 640px) 17rem, 56vw"
    : "(min-width: 640px) 29rem, 86vw";
}

export type ExhibitImage = {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
  note?: string;
};

/**
 * A screenshot mounted as evidence: hairline frame, a specimen label bar
 * naming exactly what the shot proves, then the image at full brightness.
 * Proof is never dimmed or filtered — the whole point is that it is legible.
 */
export function Exhibit({
  image,
  priority = false,
  className = "",
  sizes = "(min-width: 1024px) 33vw, 100vw",
}: {
  image: ExhibitImage;
  priority?: boolean;
  className?: string;
  sizes?: string;
}) {
  return (
    <figure
      // @container lets the zoom button drop its text label on narrow cards,
      // where the caption needs every pixel it can get.
      className={`group @container overflow-hidden rounded-2xl border border-ink-500 bg-ink-600 transition-colors duration-300 hover:border-ink-400 ${className}`}
    >
      <figcaption className="flex items-center gap-2 border-b border-ink-500 py-2 pl-3.5 pr-2">
        <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
        {/* Narrow cards get tighter tracking rather than a shorter label —
            the caption is what tells you what the screenshot proves. */}
        <span className="label-caps truncate tracking-[0.07em] text-paper/85 @[20rem]:tracking-[0.16em]">
          {image.caption}
        </span>
        {/* Plain server-rendered trigger. The one <ImageLightbox> in the
            layout listens for these, so exhibits cost no client JS. */}
        <button
          type="button"
          data-zoom-src={image.src}
          data-zoom-alt={image.alt}
          data-zoom-caption={image.caption}
          aria-label={`View ${image.caption} at full size`}
          className="ml-auto flex shrink-0 items-center gap-1.5 rounded-full border border-ink-400 px-2 py-1 text-fog transition-colors duration-200 hover:border-brand hover:text-brand-hi @[20rem]:px-2.5"
        >
          <svg aria-hidden viewBox="0 0 20 20" fill="none" className="h-3.5 w-3.5">
            <circle cx="8.75" cy="8.75" r="5.25" stroke="currentColor" strokeWidth="1.8" />
            <path
              d="m12.75 12.75 3.75 3.75M6.75 8.75h4M8.75 6.75v4"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
          <span aria-hidden className="label-caps hidden text-[0.6rem] @[20rem]:inline">
            Full size
          </span>
        </button>
      </figcaption>

      <div className="bg-ink-700 p-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image.src}
          srcSet={buildSrcSet(image.src, image.width)}
          alt={image.alt}
          width={image.width}
          height={image.height}
          sizes={sizes}
          decoding="async"
          fetchPriority={priority ? "high" : undefined}
          loading={priority ? "eager" : "lazy"}
          className="h-auto w-full rounded-lg"
        />
      </div>

      {image.note && (
        <p className="border-t border-ink-500 px-3.5 py-2.5 text-[0.8125rem] leading-snug text-fog-dim">
          {image.note}
        </p>
      )}
    </figure>
  );
}
