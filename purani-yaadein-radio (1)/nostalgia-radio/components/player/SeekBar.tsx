"use client";

import { useCallback, useRef, useState } from "react";

type SeekBarProps = {
  currentTime: number;
  duration: number;
  onSeek: (seconds: number) => void;
  className?: string;
};

export function SeekBar({ currentTime, duration, onSeek, className = "" }: SeekBarProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [dragFraction, setDragFraction] = useState<number | null>(null);
  const [hovering, setHovering] = useState(false);

  const fractionFromEvent = useCallback((clientX: number) => {
    const el = trackRef.current;
    if (!el) return 0;
    const rect = el.getBoundingClientRect();
    const raw = (clientX - rect.left) / rect.width;
    return Math.min(1, Math.max(0, raw));
  }, []);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      e.currentTarget.setPointerCapture(e.pointerId);
      const fraction = fractionFromEvent(e.clientX);
      setDragFraction(fraction);
    },
    [fractionFromEvent]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (dragFraction === null) return;
      setDragFraction(fractionFromEvent(e.clientX));
    },
    [dragFraction, fractionFromEvent]
  );

  const handlePointerUp = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (dragFraction === null) return;
      e.currentTarget.releasePointerCapture(e.pointerId);
      onSeek(dragFraction * duration);
      setDragFraction(null);
    },
    [dragFraction, duration, onSeek]
  );

  const fraction = dragFraction ?? (duration > 0 ? currentTime / duration : 0);

  return (
    <div
      ref={trackRef}
      role="slider"
      aria-label="Seek"
      aria-valuemin={0}
      aria-valuemax={Math.round(duration)}
      aria-valuenow={Math.round(currentTime)}
      tabIndex={0}
      className={`group relative flex h-6 w-full touch-none items-center ${className}`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerEnter={() => setHovering(true)}
      onPointerLeave={() => setHovering(false)}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") onSeek(Math.min(duration, currentTime + 5));
        if (e.key === "ArrowLeft") onSeek(Math.max(0, currentTime - 5));
      }}
    >
      <div className="relative h-[3px] w-full overflow-visible rounded-full bg-white/15">
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-marigold shadow-[0_0_8px_rgba(232,150,60,0.7)]"
          style={{ width: `${fraction * 100}%` }}
        />
        <div
          className={`absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-marigold transition-opacity ${
            hovering || dragFraction !== null ? "opacity-100" : "opacity-0"
          }`}
          style={{ left: `calc(${fraction * 100}% - 6px)` }}
        />
      </div>
    </div>
  );
}
