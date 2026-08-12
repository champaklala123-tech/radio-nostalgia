"use client";

import type { PlayerStatus } from "@/lib/types";

type TransportProps = {
  status: PlayerStatus;
  onPrev: () => void;
  onNext: () => void;
  onTogglePlay: () => void;
  /** desktop pill uses small icon buttons; mobile card uses a big play button */
  size: "sm" | "lg";
};

function PrevIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M6 5h2v14H6zM19 5v14l-11-7z" />
    </svg>
  );
}

function NextIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M16 5h2v14h-2zM5 5v14l11-7z" />
    </svg>
  );
}

function PlayIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function PauseIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M7 5h4v14H7zM13 5h4v14h-4z" />
    </svg>
  );
}

export function Transport({ status, onPrev, onNext, onTogglePlay, size }: TransportProps) {
  const isPlaying = status === "playing";
  const smallButton =
    "flex h-9 w-9 items-center justify-center rounded-full text-cream/80 transition hover:bg-white/10 hover:text-cream";
  const bigPlayButton =
    "flex h-[52px] w-[52px] items-center justify-center rounded-full bg-gradient-to-b from-marigold to-marigold-dim ring-1 ring-white/25 shadow-[0_8px_24px_-4px_rgba(232,150,60,0.6)] text-ink";

  if (size === "sm") {
    return (
      <div className="flex items-center gap-1">
        <button type="button" aria-label="Previous track" onClick={onPrev} className={smallButton}>
          <PrevIcon />
        </button>
        <button
          type="button"
          aria-label={isPlaying ? "Pause" : "Play"}
          onClick={onTogglePlay}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-b from-marigold to-marigold-dim text-ink shadow-[0_6px_16px_-4px_rgba(232,150,60,0.6)]"
        >
          {isPlaying ? <PauseIcon className="h-4 w-4" /> : <PlayIcon className="h-4 w-4" />}
        </button>
        <button type="button" aria-label="Next track" onClick={onNext} className={smallButton}>
          <NextIcon />
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center gap-5">
      <button
        type="button"
        aria-label="Previous track"
        onClick={onPrev}
        className="flex h-11 w-11 min-w-11 items-center justify-center rounded-full text-cream/80 transition hover:bg-white/10 hover:text-cream"
      >
        <PrevIcon />
      </button>
      <button type="button" aria-label={isPlaying ? "Pause" : "Play"} onClick={onTogglePlay} className={bigPlayButton}>
        {isPlaying ? <PauseIcon /> : <PlayIcon />}
      </button>
      <button
        type="button"
        aria-label="Next track"
        onClick={onNext}
        className="flex h-11 w-11 min-w-11 items-center justify-center rounded-full text-cream/80 transition hover:bg-white/10 hover:text-cream"
      >
        <NextIcon />
      </button>
    </div>
  );
}
