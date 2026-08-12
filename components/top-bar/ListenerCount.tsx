"use client";

import { useEffect, useState } from "react";

const BASE_COUNT = 214;

/**
 * There's no real listener-tracking backend here, so this is a small
 * simulated wander around a base number — it's atmosphere, not telemetry.
 * Swap in a real count (e.g. from an analytics or presence API) if you
 * wire one up later.
 */
export function ListenerCount() {
  const [count, setCount] = useState(BASE_COUNT);

  useEffect(() => {
    const id = window.setInterval(() => {
      setCount((current) => {
        const drift = Math.round((Math.random() - 0.5) * 6);
        const next = current + drift;
        return Math.min(320, Math.max(180, next));
      });
    }, 4000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="flex items-center gap-1.5 text-cream/70">
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-marigold/70" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-marigold" />
      </span>
      <span className="text-[11px] tabular-nums sm:text-xs">
        {count.toLocaleString("en-IN")} listening
      </span>
    </div>
  );
}
