export type Track = {
  id: string;
  title: string;
  artist: string;
  film: string;
  year: number;
  /** seconds, used only as a fallback before the YT player reports real duration */
  duration: number;
  /**
   * YouTube video id (the 11-char code from the watch URL).
   * Leave "" for tracks that don't yet have a confirmed, embeddable,
   * rights-holder source — the player will show them as unavailable
   * and skip over them instead of guessing a video.
   */
  videoId: string;
};

export type Playlist = {
  id: string;
  name: string;
  tracks: Track[];
};

export type PlayerStatus = "idle" | "cued" | "playing" | "paused" | "buffering" | "ended";
