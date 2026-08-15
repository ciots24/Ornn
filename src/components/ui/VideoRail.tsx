import { ProofVideo } from "@/components/ui/ProofVideo";
import type { ProofClip } from "@/content/videos";

/**
 * A swipeable row of proof videos.
 *
 * Each tile shows only its poster frame until played, so a rail of three
 * clips costs a few kilobytes rather than the ~17MB the videos weigh. That
 * property is what makes it safe to put video this far up a sales page at
 * all — nobody pays for footage they didn't ask to watch.
 */
export function VideoRail({
  clips,
  className = "",
  label,
}: {
  clips: readonly ProofClip[];
  className?: string;
  label: string;
}) {
  if (clips.length === 0) return null;

  return (
    <div className={className}>
      <div className="flex items-baseline justify-between gap-4">
        <p className="label-caps text-brand-hi">{label}</p>
        <p className="label-caps text-fog-dim">
          Swipe <span aria-hidden>→</span>
        </p>
      </div>

      <div
        role="group"
        aria-label={label}
        className="rail mt-3 gap-3 pb-2"
      >
        {clips.map((clip) => (
          <ProofVideo
            key={clip.src}
            {...clip}
            className="rail-item w-[70%] max-w-[15rem]"
          />
        ))}
        <span aria-hidden className="rail-item w-px" />
      </div>
    </div>
  );
}
