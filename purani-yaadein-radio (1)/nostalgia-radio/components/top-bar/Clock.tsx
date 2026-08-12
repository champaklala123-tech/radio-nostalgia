"use client";

import { useEffect, useState } from "react";

const formatter = new Intl.DateTimeFormat("en-IN", {
  timeZone: "Asia/Kolkata",
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
});

export function Clock() {
  // Null on first render so the server and client markup match; the
  // real time fills in a tick after mount.
  const [parts, setParts] = useState<{ time: string; meridiem: string } | null>(null);

  useEffect(() => {
    const tick = () => {
      const formatted = formatter.format(new Date()); // e.g. "6:15 PM"
      const [time, meridiem] = formatted.split(" ");
      setParts({ time, meridiem });
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  const [hours, minutes] = (parts?.time ?? "0:00").split(":");

  return (
    <div className="flex items-baseline gap-1 font-display text-cream/90">
      <span className="text-sm tabular-nums sm:text-base">{hours}</span>
      <span className="clock-colon text-sm sm:text-base">:</span>
      <span className="text-sm tabular-nums sm:text-base">{minutes}</span>
      <span className="ml-0.5 text-[10px] uppercase tracking-wide text-cream/50 sm:text-[11px]">
        {parts?.meridiem ?? "AM"} IST
      </span>
    </div>
  );
}
