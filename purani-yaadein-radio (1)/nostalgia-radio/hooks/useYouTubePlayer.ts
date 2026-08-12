"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { PlayerStatus } from "@/lib/types";

// Minimal shape of the bits of the YT IFrame API this hook touches —
// the real global is untyped, this just keeps call sites honest.
type YTPlayer = {
  playVideo: () => void;
  pauseVideo: () => void;
  seekTo: (seconds: number, allowSeekAhead: boolean) => void;
  cueVideoById: (videoId: string) => void;
  getCurrentTime: () => number;
  getDuration: () => number;
  destroy: () => void;
};

declare global {
  interface Window {
    YT: {
      Player: new (elementId: string, options: Record<string, unknown>) => YTPlayer;
      PlayerState: {
        ENDED: number;
        PLAYING: number;
        PAUSED: number;
        BUFFERING: number;
        CUED: number;
      };
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

let apiPromise: Promise<void> | null = null;

function loadYouTubeApi(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (apiPromise) return apiPromise;

  apiPromise = new Promise((resolve) => {
    if (window.YT?.Player) {
      resolve();
      return;
    }
    const previousCallback = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      previousCallback?.();
      resolve();
    };
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(tag);
  });

  return apiPromise;
}

type UseYouTubePlayerArgs = {
  /** Pass null until the target mount is actually known (see useIsDesktop) — the hook won't create a player until then. */
  containerId: string | null;
  videoId: string;
  onEnded: () => void;
  onError: (code: number, videoId: string) => void;
};

export function useYouTubePlayer({ containerId, videoId, onEnded, onError }: UseYouTubePlayerArgs) {
  const playerRef = useRef<YTPlayer | null>(null);
  const readyRef = useRef(false);
  const [status, setStatus] = useState<PlayerStatus>("idle");
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Keep the latest callbacks without re-creating the player over them.
  const onEndedRef = useRef(onEnded);
  const onErrorRef = useRef(onError);
  useEffect(() => {
    onEndedRef.current = onEnded;
    onErrorRef.current = onError;
  }, [onEnded, onError]);

  // Create the player once per mounted container. If the container swaps
  // (desktop <-> mobile breakpoint change) this tears down and rebuilds it.
  // containerId is null until the breakpoint is actually resolved — skip
  // entirely rather than guess and risk attaching to a hidden block.
  useEffect(() => {
    if (!containerId) return;
    let cancelled = false;

    loadYouTubeApi().then(() => {
      if (cancelled) return;
      playerRef.current = new window.YT.Player(containerId, {
        videoId: videoId || undefined,
        playerVars: {
          playsinline: 1,
          rel: 0,
          modestbranding: 1,
        },
        events: {
          onReady: () => {
            readyRef.current = true;
            setDuration(playerRef.current?.getDuration() ?? 0);
          },
          onStateChange: (e: { data: number }) => {
            const YT = window.YT;
            if (e.data === YT.PlayerState.PLAYING) setStatus("playing");
            else if (e.data === YT.PlayerState.PAUSED) setStatus("paused");
            else if (e.data === YT.PlayerState.BUFFERING) setStatus("buffering");
            else if (e.data === YT.PlayerState.CUED) setStatus("cued");
            else if (e.data === YT.PlayerState.ENDED) {
              setStatus("ended");
              onEndedRef.current();
            }
            setDuration(playerRef.current?.getDuration() ?? 0);
          },
          // Videos get taken down or have embedding switched off after we
          // ship — don't get stuck, log it and move the queue along.
          onError: (e: { data: number }) => {
            onErrorRef.current(e.data, videoId);
            onEndedRef.current();
          },
        },
      });
    });

    return () => {
      cancelled = true;
      playerRef.current?.destroy();
      playerRef.current = null;
      readyRef.current = false;
    };
    // Intentionally only re-run when the mount point changes — video swaps
    // are handled by the cueVideoById effect below on the same instance.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerId]);

  // Load a new track into the existing player instance.
  useEffect(() => {
    if (!readyRef.current || !playerRef.current || !videoId) return;
    playerRef.current.cueVideoById(videoId);
    setStatus("cued");
    setCurrentTime(0);
  }, [videoId]);

  // The IFrame API has no time-update event — poll while actually playing.
  useEffect(() => {
    if (status !== "playing") return;
    const id = window.setInterval(() => {
      const t = playerRef.current?.getCurrentTime();
      if (typeof t === "number") setCurrentTime(t);
    }, 250);
    return () => window.clearInterval(id);
  }, [status]);

  const play = useCallback(() => {
    if (!readyRef.current || !videoId) return;
    playerRef.current?.playVideo();
  }, [videoId]);

  const pause = useCallback(() => {
    playerRef.current?.pauseVideo();
  }, []);

  const seekTo = useCallback((seconds: number) => {
    playerRef.current?.seekTo(seconds, true);
    setCurrentTime(seconds);
  }, []);

  return { status, currentTime, duration, play, pause, seekTo };
}
