import { TopBar } from "@/components/top-bar/TopBar";
import { MusicPlayer } from "@/components/player/MusicPlayer";

export default function Home() {
  return (
    <main className="relative flex min-h-dvh flex-1 flex-col items-center justify-between overflow-hidden">
      {/* Background scene — swaps portrait art via CSS media query, see globals.css */}
      <div className="hero-bg fixed inset-0 -z-20">
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/80" />
      </div>

      {/* Film grain */}
      <div className="grain-overlay fixed inset-0 -z-10" aria-hidden />

      <TopBar />

      <div className="mb-[max(1.25rem,env(safe-area-inset-bottom))] mt-auto flex w-full flex-col items-center">
        <MusicPlayer />
      </div>
    </main>
  );
}
