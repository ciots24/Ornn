/**
 * A proof video mounted like an exhibit.
 *
 * `preload="none"` is the whole point: the file costs the visitor **zero bytes**
 * until they choose to play it. A proof clip is worth several megabytes to
 * someone who wants to watch it and worth nothing to someone scrolling past, so
 * the poster frame carries the still image and the video downloads on demand.
 *
 * `width`/`height` are set so the browser reserves the box before the poster
 * loads — otherwise this would be the one element on the page causing layout
 * shift.
 */
export function ProofVideo({
  src,
  poster,
  width,
  height,
  caption,
  note,
  className = "",
}: {
  src: string;
  poster: string;
  width: number;
  height: number;
  caption: string;
  note?: string;
  className?: string;
}) {
  return (
    <figure
      className={`group @container overflow-hidden rounded-2xl border border-ink-500 bg-ink-600 ${className}`}
    >
      <figcaption className="flex items-center gap-2 border-b border-ink-500 py-2 pl-3.5 pr-3">
        <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
        <span className="label-caps truncate tracking-[0.07em] text-paper/85 @[20rem]:tracking-[0.16em]">
          {caption}
        </span>
        <span className="label-caps ml-auto shrink-0 text-[0.6rem] text-fog-dim">
          Video
        </span>
      </figcaption>

      <div className="bg-ink-700 p-2">
        <video
          controls
          preload="none"
          playsInline
          poster={poster}
          width={width}
          height={height}
          className="block h-auto w-full rounded-lg"
        >
          <source src={src} type="video/mp4" />
          Your browser can&rsquo;t play this video.
        </video>
      </div>

      {note && (
        <p className="border-t border-ink-500 px-3.5 py-2.5 text-[0.8125rem] leading-snug text-fog-dim">
          {note}
        </p>
      )}
    </figure>
  );
}
