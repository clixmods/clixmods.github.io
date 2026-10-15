// Render showreel.html frame by frame with headless Chromium and pipe it into ffmpeg.
//
//   node scripts/showreel/render.mjs                    # EN + FR MP4s (with soundtrack)
//   node scripts/showreel/render.mjs --lang fr          # one language
//   node scripts/showreel/render.mjs --stills 0.5,2.6   # PNG stills at given times (review)
//
// Requirements: Playwright (+ Chromium) and an ffmpeg build with libx264.
// FFMPEG env var overrides the ffmpeg binary; otherwise `ffmpeg` on PATH is used.
import { spawn } from "node:child_process";
import { createRequire } from "node:module";
import { existsSync, mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const require = createRequire(import.meta.url);
let chromium;
try { ({ chromium } = require("playwright")); }
catch { ({ chromium } = require(path.join(process.env.NODE_GLOBAL || "/opt/node22/lib/node_modules", "playwright"))); }

const here = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(here, "out");
mkdirSync(outDir, { recursive: true });

const args = process.argv.slice(2);
const opt = (name, def) => { const i = args.indexOf(`--${name}`); return i >= 0 ? args[i + 1] : def; };
const langs = (opt("lang", "en,fr")).split(",");
const stills = opt("stills", null);
const FFMPEG = process.env.FFMPEG || "ffmpeg";
const audio = path.join(outDir, "soundtrack.wav");

async function open(browser, lang) {
  const page = await browser.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 1 });
  page.on("pageerror", (e) => console.error(`[${lang}] page error:`, e.message));
  const url = pathToFileURL(path.join(here, "showreel.html")).href + `?lang=${lang}&render=1`;
  await page.goto(url);
  await page.waitForFunction(() => window.__ready === true, null, { timeout: 60000 });
  return page;
}

async function renderStills(browser, lang, times) {
  const page = await open(browser, lang);
  for (const t of times) {
    await page.evaluate((t) => window.renderFrame(t), t);
    const file = path.join(outDir, `still-${lang}-${t.toFixed(2)}.png`);
    await page.screenshot({ path: file });
    console.log("wrote", path.relative(process.cwd(), file));
  }
  await page.close();
}

async function renderVideo(browser, lang) {
  const page = await open(browser, lang);
  const { DUR, FPS } = await page.evaluate(() => window.__meta);
  const frames = Math.round(DUR * FPS);
  const out = path.join(outDir, `showreel-${lang}.mp4`);
  const withAudio = existsSync(audio);
  const ff = spawn(FFMPEG, [
    "-y", "-loglevel", "error",
    "-f", "image2pipe", "-framerate", String(FPS), "-c:v", "png", "-i", "-",
    ...(withAudio ? ["-i", audio] : []),
    "-c:v", "libx264", "-preset", "slow", "-crf", "17", "-pix_fmt", "yuv420p",
    "-profile:v", "high", "-level", "4.2", "-colorspace", "bt709", "-color_primaries", "bt709", "-color_trc", "bt709",
    ...(withAudio ? ["-c:a", "aac", "-b:a", "256k", "-ar", "48000"] : []),
    "-t", String(DUR), "-movflags", "+faststart", out,
  ], { stdio: ["pipe", "inherit", "inherit"] });
  const done = new Promise((res, rej) => ff.on("close", (c) => (c === 0 ? res() : rej(new Error(`ffmpeg exited ${c}`)))));
  const t0 = Date.now();
  for (let f = 0; f < frames; f++) {
    await page.evaluate((t) => window.renderFrame(t), f / FPS);
    const buf = await page.screenshot({ type: "png" });
    if (!ff.stdin.write(buf)) await new Promise((r) => ff.stdin.once("drain", r));
    if (f % 60 === 0) console.log(`[${lang}] frame ${f}/${frames}  ${((Date.now() - t0) / 1000).toFixed(0)}s`);
  }
  ff.stdin.end();
  await done;
  await page.close();
  console.log("wrote", path.relative(process.cwd(), out), withAudio ? "(with soundtrack)" : "(silent: run soundtrack.py first)");
}

const browser = await chromium.launch({ args: ["--force-color-profile=srgb", "--font-render-hinting=none", "--disable-lcd-text"] });
try {
  if (stills) await Promise.all(langs.map((l) => renderStills(browser, l, stills.split(",").map(Number))));
  else await Promise.all(langs.map((l) => renderVideo(browser, l)));
} finally {
  await browser.close();
}
