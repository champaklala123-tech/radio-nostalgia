"use client";

import { useCallback, useMemo, useState } from "react";
import { playlists } from "@/lib/tracks";
import { formatTime } from "@/lib/format";
import { useIsDesktop } from "@/hooks/useIsDesktop";
import { useYouTubePlayer } from "@/hooks/useYouTubePlayer";
import { Vinyl } from "./Vinyl";
import { SeekBar } from "./SeekBar";
import { Transport } from "./Transport";

const DESKTOP_CONTAINER_ID = "yt-mount-desktop";
const MOBILE_CONTAINER_ID = "yt-mount-mobile";

export function MusicPlayer() {
  const isDesktop = useIsDesktop();

  const [playlistIndex, setPlaylistIndex] = useState(0);
  const [trackIndex, setTrackIndex] = useState(0);

  const playlist = playlists[playlistIndex];
  const track = playlist.tracks[trackIndex];

  const advance = useCallback(
    (direction: 1 | -1) => {
      setTrackIndex((current) => {
        const count = playlist.tracks.length;
        return (current + direction + count) % count;
      });
    },
    [playlist.tracks.length]
  );

  const handleEnded = useCallback(() => advance(1), [advance]);

  const handleError = useCallback((code: number, videoId: string) => {
    // Rights holders pull videos or flip embedding off after we ship —
    // log it so it shows up in analytics instead of failing silently.
    if (typeof window !== "undefined") {
      import("@vercel/analytics").then(({ track }) =>
        track("youtube_playback_error", { code, videoId })
      );
    }
    advance(1);
  }, [advance]);

  const containerId =
    isDesktop === null ? null : isDesktop ? DESKTOP_CONTAINER_ID : MOBILE_CONTAINER_ID;

  const player = useYouTubePlayer({
    containerId,
    videoId: track.videoId,
    onEnded: handleEnded,
    onError: handleError,
  });

  const handleTogglePlay = useCallback(() => {
    if (player.status === "playing") player.pause();
    else player.play();
  }, [player]);

  const handleSelectPlaylist = useCallback((index: number) => {
    setPlaylistIndex(index);
    setTrackIndex(0);
  }, []);

  const subtitle = useMemo(
    () => `${track.film} · ${track.year}`,
    [track.film, track.year]
  );

  return (
    <div className="w-full max-w-xl px-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:px-0">
      <PlaylistTabs
        playlists={playlists}
        activeIndex={playlistIndex}
        onSelect={handleSelectPlaylist}
      />

      {/* DESKTOP — one horizontal pill */}
      <div className="glass hidden items-center gap-4 rounded-full p-3 pr-5 sm:flex">
        <Vinyl
          containerId={DESKTOP_CONTAINER_ID}
          size={80}
          playing={player.status === "playing"}
          hasVideo={Boolean(track.videoId)}
        />

        <div className="min-w-0 flex-1">
          <div className="flex items-baseline justify-between gap-3">
            <p className="truncate text-[15px] font-semibold text-cream">{track.title}</p>
            <span className="shrink-0 font-mono text-[10.5px] tabular-nums text-cream/60">
              {formatTime(player.currentTime)} / {formatTime(player.duration || track.duration)}
            </span>
          </div>
          <p className="truncate text-[12.5px] text-cream/70">
            {track.artist} — {subtitle}
          </p>
          <SeekBar
            currentTime={player.currentTime}
            duration={player.duration || track.duration}
            onSeek={player.seekTo}
            className="mt-1.5"
          />
        </div>

        <Transport
          size="sm"
          status={player.status}
          onPrev={() => advance(-1)}
          onNext={() => advance(1)}
          onTogglePlay={handleTogglePlay}
        />
      </div>

      {/* MOBILE — stacked card */}
      <div className="glass flex flex-col gap-3 rounded-[26px] p-4 sm:hidden">
        <div className="flex items-center gap-3">
          <Vinyl
            containerId={MOBILE_CONTAINER_ID}
            size={64}
            playing={player.status === "playing"}
            hasVideo={Boolean(track.videoId)}
          />
          <div className="min-w-0 flex-1">
            <p className="truncate text-[15px] font-semibold text-cream">{track.title}</p>
            <p className="truncate text-[12.5px] text-cream/70">
              {track.artist} — {subtitle}
            </p>
          </div>
        </div>

        <SeekBar currentTime={player.currentTime} duration={player.duration || track.duration} onSeek={player.seekTo} />

        <div className="flex items-center justify-between">
          <span className="font-mono text-[10.5px] tabular-nums text-cream/60">
            {formatTime(player.currentTime)} / {formatTime(player.duration || track.duration)}
          </span>
          <Transport
            size="lg"
            status={player.status}
            onPrev={() => advance(-1)}
            onNext={() => advance(1)}
            onTogglePlay={handleTogglePlay}
          />
          <span className="w-[52px]" aria-hidden />
        </div>
      </div>

      {!track.videoId && (
        <p className="mt-2 text-center text-[11px] text-cream/40 sm:text-left">
          This track has no confirmed video yet — see the comment at the top of lib/tracks.ts.
        </p>
      )}
    </div>
  );
}

function PlaylistTabs({
  playlists: allPlaylists,
  activeIndex,
  onSelect,
}: {
  playlists: typeof playlists;
  activeIndex: number;
  onSelect: (index: number) => void;
}) {
  return (
    <div className="mb-2 flex justify-center gap-1.5 sm:justify-start sm:pl-2">
      {allPlaylists.map((p, index) => (
        <button
          key={p.id}
          type="button"
          onClick={() => onSelect(index)}
          aria-pressed={index === activeIndex}
          className={`rounded-full px-3 py-1 text-[11px] font-medium transition ${
            index === activeIndex
              ? "bg-marigold text-ink"
              : "bg-white/5 text-cream/60 hover:bg-white/10 hover:text-cream/90"
          }`}
        >
          {p.name}
        </button>
      ))}
    </div>
  );
}
