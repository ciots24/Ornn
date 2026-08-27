/**
 * Hand-drawn icon set.
 *
 * Deliberately not an icon library: a dependency would add bundle weight to a
 * page we just tuned, and stock geometric icons are exactly what makes a page
 * look templated. These are inline SVG, so they cost only HTML bytes.
 *
 * Every stroke is rounded and slightly loose, echoing the red marker
 * annotations that are the page's signature — the icons read as sketched in
 * the same hand rather than dropped in from a set. Each one names what its item
 * *is* (a hook is a fishing hook, the vault is a play button), which is why
 * they earn their place: they make a long list scannable instead of decorating it.
 */

export type IconName =
  | "script"
  | "image"
  | "rocket"
  | "fastForward"
  | "offer"
  | "blueprint"
  | "hook"
  | "video";

const paths: Record<IconName, React.ReactNode> = {
  // Ad copy: a page with written lines, last line short like real prose.
  script: (
    <>
      <path d="M6.5 3.5h8.2l3.8 3.9v12.1a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1v-15a1 1 0 0 1 1-1Z" />
      <path d="M14.4 3.6v4h4" />
      <path d="M9 12h6M9 15.4h6M9 18.6h3.4" />
    </>
  ),
  // Creative: a frame with a horizon and a sun — the shape of a picture.
  image: (
    <>
      <rect x="3.2" y="5" width="17.6" height="14" rx="2.4" />
      <circle cx="9" cy="10" r="1.6" />
      <path d="M3.6 16.2 8.4 12a1.9 1.9 0 0 1 2.6 0l5.2 4.8M14.6 14.4l1.6-1.4a1.9 1.9 0 0 1 2.6 0l1.8 1.7" />
    </>
  ),
  // Launch: a rocket mid-climb with a small exhaust tick.
  rocket: (
    <>
      <path d="M12 3.2c3.1 2.2 4.7 5.3 4.7 9.1L12 16.6l-4.7-4.3c0-3.8 1.6-6.9 4.7-9.1Z" />
      <circle cx="12" cy="10" r="1.7" />
      <path d="M9.2 15.5 7 17.9m7.8-2.4 2.2 2.4M12 17v3.4" />
    </>
  ),
  // Skipping ahead: two chevrons and the bar you land on.
  fastForward: (
    <>
      <path d="M4.4 6.6 10.6 12l-6.2 5.4V6.6Z" />
      <path d="M11.6 6.6 17.8 12l-6.2 5.4V6.6Z" />
      <path d="M20.4 6.4v11.2" />
    </>
  ),
  // The offer: a price tag, hole and all.
  offer: (
    <>
      <path d="M11.3 3.4H20a.6.6 0 0 1 .6.6v8.7a1 1 0 0 1-.3.7l-7.4 7.4a1 1 0 0 1-1.4 0l-7.6-7.6a1 1 0 0 1 0-1.4l7.4-7.4a1 1 0 0 1 .7-.3Z" />
      <circle cx="16.4" cy="7.6" r="1.5" />
    </>
  ),
  // Campaign structure: one campaign branching to one set and its creatives.
  blueprint: (
    <>
      <rect x="3.4" y="3.6" width="6.2" height="5" rx="1.2" />
      <rect x="14.4" y="3.6" width="6.2" height="5" rx="1.2" />
      <rect x="8.9" y="15.4" width="6.2" height="5" rx="1.2" />
      <path d="M6.5 8.8v3a1.4 1.4 0 0 0 1.4 1.4h8.2a1.4 1.4 0 0 0 1.4-1.4v-3M12 13.4v2" />
    </>
  ),
  // Hooks: an actual fishing hook — eye, shank, bend, barb. Literal on purpose;
  // it's the one place the page lets itself be funny.
  hook: (
    <>
      <circle cx="13.4" cy="4.3" r="1.8" />
      <path d="M13.4 6.1v8.1a4 4 0 0 1-8 0" />
      <path d="m5.4 14.2 2.5-2.6" />
    </>
  ),
  // The vault: a play button, because it's video.
  video: (
    <>
      <rect x="2.8" y="5.4" width="18.4" height="13.2" rx="2.4" />
      <path d="M10.2 9.6 15 12l-4.8 2.4V9.6Z" />
      <path d="M6.6 5.6v13M17.4 5.6v13" />
    </>
  ),
};

export function Icon({
  name,
  className = "h-5 w-5",
}: {
  name: IconName;
  className?: string;
}) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {paths[name]}
    </svg>
  );
}
