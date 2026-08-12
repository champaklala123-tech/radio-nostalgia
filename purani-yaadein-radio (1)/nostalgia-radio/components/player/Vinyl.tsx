type VinylProps = {
  containerId: string;
  size: number;
  playing: boolean;
  hasVideo: boolean;
};

/**
 * The video itself is the label on the record — this is the "visible
 * player" the brief requires, not a hidden iframe behind a static
 * thumbnail. It's square (options.width/height match `size`) and the
 * circular mask + spin do the rest.
 */
export function Vinyl({ containerId, size, playing, hasVideo }: VinylProps) {
  return (
    <div
      className="vinyl-spin relative shrink-0 overflow-hidden rounded-full bg-ink ring-2 ring-white/10 [&_iframe]:absolute [&_iframe]:inset-0 [&_iframe]:h-full [&_iframe]:w-full"
      style={{
        width: size,
        height: size,
        animationPlayState: playing ? "running" : "paused",
      }}
    >
      <div id={containerId} className="h-full w-full" />
      {!hasVideo && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-teal to-ink text-cream/50">
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-1/3 w-1/3">
            <path d="M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6z" />
          </svg>
        </div>
      )}
      <span className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/70 ring-2 ring-white/40" />
    </div>
  );
}
