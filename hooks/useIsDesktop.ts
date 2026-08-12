"use client";

import { useEffect, useState } from "react";

/** Matches Tailwind's `sm` breakpoint (40rem / 640px). */
const QUERY = "(min-width: 640px)";

/**
 * Tracks whether the viewport is at/above the `sm` breakpoint.
 *
 * Returns `null` until the real value is known (server render + first
 * client tick, so hydration matches). Callers that gate a *live* embed
 * on this — like which vinyl mounts the YouTube iframe — should treat
 * `null` as "don't attach anything yet": briefly attaching a real
 * player to whichever side guesses wrong would mean a live iframe
 * sitting inside a `display:none` block, which is exactly the hidden-
 * player pattern the brief rules out.
 */
export function useIsDesktop(): boolean | null {
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);

  useEffect(() => {
    const mql = window.matchMedia(QUERY);
    setIsDesktop(mql.matches);
    const listener = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mql.addEventListener("change", listener);
    return () => mql.removeEventListener("change", listener);
  }, []);

  return isDesktop;
}
