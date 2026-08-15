import Image from "next/image";
import { ExhibitZoom } from "./ExhibitZoom";

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
        <ExhibitZoom src={image.src} alt={image.alt} caption={image.caption} />
      </figcaption>

      <div className="bg-ink-700 p-2">
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          sizes={sizes}
          priority={priority}
          loading={priority ? undefined : "lazy"}
          className="w-full rounded-lg"
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
