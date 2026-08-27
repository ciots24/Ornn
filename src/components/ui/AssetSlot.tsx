import Image from "next/image";

export type SlotSpec = {
  /** CSS aspect-ratio, e.g. "4 / 3". */
  ratio: string;
  /** What this asset is, in the client's words. */
  label: string;
  /** What to shoot or export, including target pixel size. */
  spec: string;
};

export type SlotImage = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

/**
 * A reserved space for an asset that does not exist yet.
 *
 * Pass `image` and it renders the real thing. Leave it out and it renders a
 * labelled placeholder holding the exact slot — so the layout never shifts
 * when the client drops the file in, and nobody has to guess the crop.
 */
export function AssetSlot({
  slot,
  image,
  className = "",
  sizes = "(min-width: 768px) 50vw, 100vw",
}: {
  slot: SlotSpec;
  image?: SlotImage;
  className?: string;
  sizes?: string;
}) {
  if (image) {
    return (
      <div
        className={`overflow-hidden rounded-2xl border border-line bg-surface-raised p-2 ${className}`}
      >
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          sizes={sizes}
          loading="lazy"
          className="w-full rounded-lg"
        />
      </div>
    );
  }

  return (
    <div
      style={{ aspectRatio: slot.ratio }}
      className={`flex w-full flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-line-strong bg-surface-sunken/60 px-5 py-8 text-center ${className}`}
    >
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        fill="none"
        className="h-6 w-6 text-text-dim"
      >
        <rect
          x="3"
          y="4.5"
          width="18"
          height="15"
          rx="2.5"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <path
          d="m3.5 16 4.2-4.2a2 2 0 0 1 2.8 0l3.3 3.3m0 0 1.8-1.8a2 2 0 0 1 2.8 0l2 2m-6.6-.2.3.3"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <circle cx="15.2" cy="9.2" r="1.4" fill="currentColor" />
      </svg>
      <p className="label-caps text-text-muted">{slot.label}</p>
      <p className="max-w-[22rem] text-[0.8125rem] leading-snug text-text-dim">
        {slot.spec}
      </p>
    </div>
  );
}
