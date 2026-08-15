import { offer } from "@/content/offer";

/**
 * The ORNN lockup, and the brand line it sits in.
 *
 * The asset is pure white with the black keyed out through its own luminance,
 * so it needs no per-surface variant — it reads on the near-black page, on the
 * paper of a light section, and on the brand red alike.
 *
 * Sized in `rem` off the height so a caller sets one number and the width
 * follows; the intrinsic dimensions stay on the tag so nothing shifts on load.
 */
export function Logo({
  className = "h-6",
  alt = offer.brand,
  priority = false,
}: {
  className?: string;
  /** Empty when the brand name is already in adjacent text. */
  alt?: string;
  priority?: boolean;
}) {
  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src="/ornn-logo.webp"
      alt={alt}
      width={600}
      height={156}
      decoding={priority ? "sync" : "async"}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      className={`w-auto ${className}`}
    />
  );
}

/**
 * Logo + product name — the same lockup used by the header, the offer bar and
 * the footer, so the three can never drift apart.
 */
export function BrandLockup({
  className = "",
  logoClassName = "h-5",
  priority = false,
}: {
  className?: string;
  logoClassName?: string;
  priority?: boolean;
}) {
  return (
    <span className={`flex items-center ${className}`}>
      <Logo className={logoClassName} priority={priority} />
      <span aria-hidden className="mx-2 text-line-strong">
        /
      </span>
      <span className="label-caps text-text-muted">{offer.product}</span>
    </span>
  );
}
