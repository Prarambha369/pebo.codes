# Media placeholders for pebo.codes

This folder holds optimized media assets referenced by `src/config/site.js`. **Do not commit large/raw 4K masters.** Provide lightweight, web-ready variants instead.

## Expected files (defaults)
- `hero.webm` — primary background loop (recommended). Short seamless loop, capped resolution/bitrate (e.g. 1080p or 1440p, tuned for web).
- `hero.mp4` — fallback background loop for broader browser support.
- `hero-poster.jpg` — static poster image used before playback, for reduced-motion/static fallback, and when media fails to load.
- `ambient-8d.mp3` — optional separate ambient/8D audio track (played only after user "enter" gesture, with mute control).

## Guidance
- Keep loops short (e.g. ~5–15s) and compress aggressively for fast startup.
- Provide multiple renditions if needed and update `site.media.sources` in `src/config/site.js`.
- Ensure visuals have sufficient contrast with overlaid glass UI; poster should be representative.
- Audio is optional/enhancement: the site must remain fully usable without it.
- Consider a lower-motion or static-only experience on constrained devices/networks; reduced-motion preferences are respected in-app.
