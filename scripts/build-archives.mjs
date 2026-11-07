#!/usr/bin/env node
// Reconstruit les anciennes versions du portfolio (scripts/archives.json) et
// les publie sous <out>/<id>/, pour qu'on puisse les visiter depuis le site
// actuel (projets « Thème v1 », « Thème v2 »…).
//
// Pour chaque archive : worktree Git au commit voulu (+ sous-modules), build
// Hugo avec baseURL <base>archives/<id>/, retrait des pages générées en masse
// (drop), puis déduplication : une image identique à celle du site actuel
// (même chemin, même taille, dans --compare) est supprimée de l'archive et
// ses références pointent vers /images/… du site actuel. L'archive passe
// ainsi de plusieurs centaines de Mo à quelques dizaines.
//
// CI (après le build du site) :
//   node scripts/build-archives.mjs --out public/archives --compare public --base https://clixmods.github.io/
// Local (aperçu avec `hugo server`, dossier ignoré par Git) :
//   hugo --gc --minify -d "$TMP/cur" && node scripts/build-archives.mjs --out static/archives --compare "$TMP/cur" --base http://localhost:1313/
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const args = Object.fromEntries(process.argv.slice(2).reduce((acc, a, i, all) => {
  if (a.startsWith("--")) acc.push([a.slice(2), all[i + 1] && !all[i + 1].startsWith("--") ? all[i + 1] : "1"]);
  return acc;
}, []));
const root = process.cwd();
const outDir = path.resolve(args.out || "public/archives");
const compareDir = path.resolve(args.compare || "public");
const base = (args.base || "http://localhost:1313/").replace(/\/?$/, "/");
const only = args.only ? args.only.split(",") : null;
const cfg = JSON.parse(fs.readFileSync(path.join(root, "scripts/archives.json"), "utf8"));

const run = (cmd, argv, opts = {}) => execFileSync(cmd, argv, { stdio: "inherit", ...opts });
const walk = (d) => fs.existsSync(d)
  ? fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)])
  : [];
const TEXT = /\.(html|css|js|xml|json|txt|webmanifest)$/i;
const mb = (n) => (n / 1e6).toFixed(1) + " Mo";

for (const a of cfg.archives) {
  if (only && !only.includes(a.id)) continue;
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), `portfolio-${a.id}-`));
  const wt = path.join(tmp, "src");
  const build = path.join(tmp, "out");
  console.log(`\n── Archive ${a.id} : ${a.label} (${a.ref.slice(0, 7)})`);
  try {
    run("git", ["worktree", "add", "--detach", wt, a.ref]);
    if (fs.existsSync(path.join(wt, ".gitmodules"))) run("git", ["-C", wt, "submodule", "update", "--init", "--depth", "1"]);
    const hugoArgs = ["--gc", "--minify", "--environment", "production", "--baseURL", `${base}archives/${a.id}/`, "-d", build];
    if (args["cache-dir"]) hugoArgs.push("--cacheDir", path.resolve(args["cache-dir"]));
    run("hugo", hugoArgs, { cwd: wt });

    // Pages générées en masse, inutiles pour montrer le thème.
    for (const d of a.drop || []) fs.rmSync(path.join(build, d), { recursive: true, force: true });

    // Images identiques au site actuel : supprimées, références redirigées.
    const shared = new Set();
    let saved = 0;
    for (const f of walk(path.join(build, "images"))) {
      const rel = path.relative(build, f).split(path.sep).join("/");
      const twin = path.join(compareDir, rel);
      const size = fs.statSync(f).size;
      if (fs.existsSync(twin) && fs.statSync(twin).size === size) { fs.rmSync(f); shared.add(rel); saved += size; }
    }
    const ref = new RegExp(`archives/${a.id}/(images/[^"'\\s)<>,]+)`, "g");
    const robots = '<meta name="robots" content="noindex">';
    for (const f of walk(build)) {
      if (!TEXT.test(f)) continue;
      let t = fs.readFileSync(f, "utf8");
      const before = t;
      t = t.replace(ref, (m, p) => {
        let key = p.split(/[?#]/)[0];
        try { key = decodeURI(key); } catch (e) { /* garde tel quel */ }
        return shared.has(key) ? p : m;
      });
      // Une archive ne doit pas concurrencer le site actuel dans les moteurs.
      if (/\.html$/i.test(f) && !t.includes(robots)) t = t.replace(/<head([^>]*)>/i, `<head$1>${robots}`);
      if (t !== before) fs.writeFileSync(f, t);
    }

    const dest = path.join(outDir, a.id);
    fs.rmSync(dest, { recursive: true, force: true });
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.cpSync(build, dest, { recursive: true });
    const size = walk(dest).reduce((n, f) => n + fs.statSync(f).size, 0);
    console.log(`   ${shared.size} images partagées avec le site actuel (${mb(saved)} évités), archive : ${mb(size)}`);
  } finally {
    try { run("git", ["worktree", "remove", "--force", wt]); } catch (e) { /* déjà retiré */ }
    fs.rmSync(tmp, { recursive: true, force: true });
  }
}
