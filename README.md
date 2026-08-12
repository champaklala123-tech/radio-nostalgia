# Purani Yaadein — a nostalgia radio

A single-page site: a glass player floating over a golden-hour street
scene, playing 90s/2000s Bollywood off YouTube.

## Run it

```bash
npm install
npm run dev
```

## Before it plays anything

**`lib/tracks.ts` ships with every `videoId` blank on purpose.** These are
commercial film songs, so I didn't search YouTube and guess which upload is
the rights holder's own embeddable copy — that's the one thing the brief
asked not to be done automatically. Tracks with a blank id show up in the UI
as unavailable and get skipped during playback; the app runs fine before you
fill any in.

To wire one up: find the official upload (label channel — T-Series,
Saregama, Zee Music, Tips, Venus — or the film's own channel), confirm
embedding isn't disabled, and drop the 11-character id from the watch URL
into that track's `videoId`. One line each.

## Assets

- `public/bg/scene-wide.png` — the landscape background, from the image you
  uploaded.
- `public/bg/scene-tall.png` — **currently a copy of the wide image**, not a
  real portrait composition. Swap in an actual tall crop/repaint for
  portrait phones, or the mobile background will look off-center.

## Structure

- `app/page.tsx` — layout: fixed background, grain, top bar, bottom-anchored player.
- `components/player/` — `MusicPlayer` (state + both layouts), `Vinyl`, `SeekBar`, `Transport`.
- `components/top-bar/` — `Clock` (Asia/Kolkata, blinking colon), `ListenerCount` (simulated — see the comment in that file), `SocialLinks` (placeholder `#` hrefs, point these at real profiles).
- `hooks/useYouTubePlayer.ts` — loads the IFrame API once, drives a single visible player instance, exposes play/pause/seek + status.
- `hooks/useIsDesktop.ts` — decides whether the live YouTube embed mounts in the desktop pill or the mobile card, so there's only ever one real player instance and it's never sitting inside a hidden block.
- `lib/tracks.ts` — playlists, grouped to match the moods in your original list (Cassette Classics / Rain & Heartbreak / Golden Era & Indipop).

## Notes

- `Analytics` / `SpeedInsights` from `@vercel/analytics` and
  `@vercel/speed-insights` are wired into `app/layout.tsx`; they're inert
  until the app is actually deployed on Vercel.
- Playback errors (deleted video, embedding switched off) auto-advance to
  the next track and fire a `youtube_playback_error` analytics event with
  the error code and videoId.
