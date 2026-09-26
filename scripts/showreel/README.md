# Showreel — 15 s motion-graphics profile video

A vertical social-media showreel (1080×1920, 60 fps, H.264 + AAC), in English and French,
built from the portfolio's own content and art direction (blueprint grid, glass surfaces,
night-blue ↔ red palette, Space Grotesk / Inter).

| Time | Scene | Content |
|------|-------|---------|
| 0.0 – 2.0 s | Boot | Blueprint grid draws on, terminal types `whoami` / `./showreel --play` |
| 2.0 – 4.5 s | Identity | Photo with rotating ring, kinetic name, role, core stack chips |
| 4.5 – 7.0 s | Numbers | Counters: 2.5 yrs pro C#/.NET · 1M+ Steam Workshop downloads · 30+ projects |
| 7.0 – 10.5 s | Work | Beat-cut montage: Terra Memoria, Nuketown Zombies, Mori Rebirth, My Game Showcase, MC Skin Creator, then a "+25 more" collage |
| 10.5 – 12.5 s | Stack | 12 technology tiles pop in on 16th notes |
| 12.5 – 15.0 s | Contact | "Available now" CTA, contract types, `clixmods.github.io`, LinkedIn / GitHub |

The soundtrack (120 BPM, A minor) is synthesized in code, with every hit locked to the picture:
drops on 2.0 s and 12.5 s, whooshes into each scene, typing clicks, counter ticks, tile blips.

## Files

- `showreel.html`: the whole animation as a pure function of time (`window.renderFrame(t)`).
  Open it in a browser for a live looping preview (`?lang=fr` for French, `?t=7.2` to freeze a frame).
- `soundtrack.py`: synthesizes `out/soundtrack.wav` (numpy + scipy).
- `render.mjs`: drives headless Chromium frame by frame and pipes PNGs into ffmpeg.
- `fonts/`: Inter, Space Grotesk and JetBrains Mono (SIL OFL), vendored so renders are offline and deterministic.

Images are read straight from `static/images/` (profile photo, project screenshots, technology icons).

## Render

```bash
pip install numpy scipy                      # soundtrack
python3 scripts/showreel/soundtrack.py       # -> scripts/showreel/out/soundtrack.wav
node scripts/showreel/render.mjs             # -> scripts/showreel/out/showreel-{en,fr}.mp4
node scripts/showreel/render.mjs --lang fr   # one language only
node scripts/showreel/render.mjs --stills 2.6,8.3   # PNG stills for review
```

Needs Playwright with Chromium and an ffmpeg build with `libx264`. If `ffmpeg` is not on PATH, set
`FFMPEG=/path/to/ffmpeg` (for example the binary shipped by `pip install imageio-ffmpeg`).

To change the copy, edit the `COPY` object at the top of the script in `showreel.html`. Project
cards come from `PROJECTS`, the collage from `COLLAGE`, the tech tiles from `STACK`. Scene timings live
in `SCENES` and the constants below it. If you move a beat, mirror it in `soundtrack.py`.
