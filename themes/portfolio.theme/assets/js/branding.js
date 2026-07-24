/* ============================================================
   Générateur de branding — moteur Canvas 2D natif (zéro dépendance)
   Reproduit la DA du site : glass/blur, halos, grille blueprint,
   dégradés cold→warm, typo Space Grotesk / Inter.

   Carte composable : blocs activables/réordonnables (avatar, titre,
   compétences, stats, projet, dispo, contacts…) + templates
   sauvegardables (localStorage).
   ============================================================ */
(function () {
  "use strict";

  var root = document.querySelector(".branding-page");
  if (!root) return;

  /* ── Palette (miroir de _tokens.scss) ─────────────────────── */
  var THEME = {
    bg: "#080b16",
    bg2: "#05070f",
    surface: "#0d1222",
    cold: "#3b82f6",
    cyan: "#38bdf8",
    violet: "#8b5cf6",
    warm: "#f43f5e",
    orange: "#fb7185",
    green: "#34d399",
    text: "#e8edf5",
    textSoft: "#b6c0d4",
    textDim: "#8a96ad",
    grid: "rgba(125,155,220,0.09)",
    gridMinor: "rgba(125,155,220,0.045)",
    wire: "rgba(150,180,240,0.5)",
    glassFill: "rgba(255,255,255,0.06)",
    glassBorder: "rgba(140,170,255,0.28)",
    fontHead: '"Space Grotesk", "Inter", system-ui, sans-serif',
    fontBody: '"Inter", system-ui, sans-serif',
    fontMono: 'ui-monospace, "SFMono-Regular", Menlo, monospace'
  };

  /* ── Dégradés d'accent ────────────────────────────────────── */
  var ACCENTS = {
    cold: { stops: [THEME.cold, THEME.cyan], glow: "59,130,246" },
    warm: { stops: [THEME.warm, THEME.orange], glow: "244,63,94" },
    violet: { stops: [THEME.violet, THEME.cyan], glow: "139,92,246" },
    mix: { stops: [THEME.cyan, THEME.violet, THEME.warm], glow: "139,92,246" }
  };

  /* ── Registre des formats ─────────────────────────────────── */
  var FORMATS = [
    // Bannières / headers
    { id: "linkedin-banner", label: "LinkedIn — Bannière", cat: "banner", group: "Bannières", w: 1584, h: 396 },
    { id: "x-header", label: "X / Twitter — Header", cat: "banner", group: "Bannières", w: 1500, h: 500 },
    { id: "youtube-banner", label: "YouTube — Bannière", cat: "banner", group: "Bannières", w: 2560, h: 1440, safe: { w: 1546, h: 423 } },
    { id: "facebook-cover", label: "Facebook — Couverture", cat: "banner", group: "Bannières", w: 1640, h: 624 },
    { id: "twitch-banner", label: "Twitch — Bannière", cat: "banner", group: "Bannières", w: 1200, h: 480 },
    // Avatars
    { id: "avatar", label: "Avatar / Photo de profil", cat: "square", group: "Avatars", w: 800, h: 800 },
    // Posts & stories
    { id: "ig-post", label: "Instagram — Post", cat: "square", group: "Posts & stories", w: 1080, h: 1080 },
    { id: "ig-story", label: "Instagram — Story", cat: "vertical", group: "Posts & stories", w: 1080, h: 1920 },
    { id: "og-card", label: "Carte OG (partage)", cat: "wide", group: "Posts & stories", w: 1200, h: 630 },
    // Panneaux / vignettes
    { id: "youtube-thumb", label: "YouTube — Miniature", cat: "wide", group: "Panneaux & vignettes", w: 1280, h: 720 },
    { id: "twitch-panel", label: "Twitch — Panneau", cat: "wide", group: "Panneaux & vignettes", w: 320, h: 160 },
    // Discord
    { id: "discord-banner", label: "Discord — Bannière profil", cat: "banner", group: "Discord", w: 600, h: 240 },
    { id: "discord-icon", label: "Discord — Icône serveur", cat: "icon", group: "Discord", w: 512, h: 512 },
    // Fiverr
    { id: "fiverr-gig", label: "Fiverr — Vignette gig", cat: "wide", group: "Fiverr", w: 1280, h: 769 },
    { id: "fiverr-banner", label: "Fiverr — Bannière profil", cat: "banner", group: "Fiverr", w: 1280, h: 260 },
    // Malt
    { id: "malt-cover", label: "Malt — Couverture profil", cat: "banner", group: "Malt", w: 1920, h: 480 }
  ];

  /* ── Presets disponibles par catégorie ────────────────────── */
  var PRESETS_BY_CAT = {
    banner: ["centered", "left", "minimal"],
    wide: ["centered", "left", "minimal"],
    square: ["centered", "left", "minimal"],
    vertical: ["centered", "minimal"],
    icon: ["monogram", "centered"]
  };
  var PRESET_LABELS = {
    centered: { fr: "Centré", en: "Centered" },
    left: { fr: "Aligné à gauche", en: "Left-aligned" },
    minimal: { fr: "Minimal", en: "Minimal" },
    monogram: { fr: "Monogramme", en: "Monogram" }
  };

  /* ── Données injectées + langue ───────────────────────────── */
  var D = window.BRANDING_DEFAULTS || {};
  var DATA = window.BRANDING_DATA || {};
  DATA.skills = DATA.skills || [];
  DATA.projects = DATA.projects || [];
  DATA.stats = DATA.stats || {};
  DATA.availability = DATA.availability || {};
  DATA.contacts = DATA.contacts || {};
  var LANG = window.BRANDING_LANG === "en" ? "en" : "fr";
  var EN = LANG === "en";

  /* ── Libellés localisés (contrôles générés en JS) ─────────── */
  var L = {
    modules: {
      avatar: EN ? "Photo / avatar" : "Photo / avatar",
      title: EN ? "Title" : "Titre",
      role: EN ? "Role" : "Rôle",
      subtitle: EN ? "Subtitle" : "Sous-titre",
      handle: EN ? "Handle" : "Identifiant",
      skills: EN ? "Skills" : "Compétences",
      stats: EN ? "Stats" : "Statistiques",
      availability: EN ? "Availability" : "Disponibilité",
      contacts: EN ? "Contacts" : "Contacts",
      project: EN ? "Project" : "Projet"
    },
    groups: {
      languages: EN ? "Languages" : "Langages",
      frameworks: EN ? "Frameworks & engines" : "Frameworks & moteurs",
      specialties: EN ? "Specialties" : "Spécialités",
      softskills: EN ? "Soft skills" : "Soft skills",
      tools: EN ? "Tools" : "Outils"
    },
    stats: {
      downloads: EN ? "Downloads" : "Téléchargements",
      projects: EN ? "Projects" : "Projets",
      years: EN ? "Years of exp." : "Ans d'exp.",
      engines: EN ? "Engines" : "Moteurs"
    },
    avail: {
      on: EN ? "Available for freelance" : "Disponible pour freelance",
      off: EN ? "Currently unavailable" : "Actuellement indisponible"
    },
    tpl: { newName: EN ? "Template name:" : "Nom du modèle :", none: EN ? "— Custom —" : "— Personnalisé —", saved: EN ? "Saved templates" : "Modèles enregistrés", builtin: EN ? "Presets" : "Modèles prédéfinis" }
  };

  /* ── Ordre de blocs par défaut (reproduit la carte identité) ─ */
  var DEFAULT_MODULES = [
    { id: "avatar", on: true },
    { id: "title", on: true },
    { id: "role", on: true },
    { id: "subtitle", on: true },
    { id: "handle", on: true },
    { id: "skills", on: false },
    { id: "stats", on: false },
    { id: "availability", on: false },
    { id: "contacts", on: false },
    { id: "project", on: false }
  ];

  function num(n) { n = Number(n) || 0; return n; }
  function fmtNum(n) {
    n = num(n);
    if (n >= 1e6) return (n / 1e6).toFixed(n >= 1e7 ? 0 : 1).replace(/\.0$/, "") + "M";
    if (n >= 1e3) return Math.round(n / 1e3) + "k";
    return "" + n;
  }

  function defaultStats() {
    var s = DATA.stats;
    return [
      { id: "downloads", on: true, value: fmtNum(s.totalDownloads), label: L.stats.downloads },
      { id: "projects", on: true, value: (num(s.projectCount)) + "+", label: L.stats.projects },
      { id: "years", on: true, value: s.yearsExperience || "", label: L.stats.years },
      { id: "engines", on: false, value: "" + num(s.enginesCount), label: L.stats.engines }
    ];
  }

  function defaultProjectId() {
    var f = null, i;
    for (i = 0; i < DATA.projects.length; i++) {
      if (DATA.projects[i].featured && DATA.projects[i].image) { f = i; break; }
      if (f === null && DATA.projects[i].image) f = i;
    }
    return f === null ? (DATA.projects.length ? 0 : -1) : f;
  }

  /* ── État ─────────────────────────────────────────────────── */
  function freshState() {
    return {
      formatId: FORMATS[0].id,
      preset: "centered",
      title: D.fullName || "Clément 'Clix' GARCIA",
      subtitle: D.speciality || "",
      role: EN ? "Software & Game Developer" : "Développeur logiciel & jeu vidéo",
      handle: "@" + (D.discord || "clixmods"),
      accent: "cold",
      photo: null,
      blueprint: true,
      intensity: 1,
      modules: DEFAULT_MODULES.map(function (m) { return { id: m.id, on: m.on }; }),
      selectedSkills: [],
      stats: defaultStats(),
      projectId: defaultProjectId(),
      projectMode: "background"
    };
  }
  var state = freshState();

  /* ── Helpers géométrie / texte ────────────────────────────── */
  function roundRect(ctx, x, y, w, h, r) {
    r = Math.min(r, w / 2, h / 2);
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  function setLetterSpacing(ctx, px) {
    try { ctx.letterSpacing = px + "px"; } catch (e) { /* non supporté */ }
  }

  function accentGrad(ctx, x0, y0, x1, y1, accent) {
    var a = ACCENTS[accent] || ACCENTS.cold;
    var g = ctx.createLinearGradient(x0, y0, x1, y1);
    var n = a.stops.length;
    for (var i = 0; i < n; i++) g.addColorStop(i / (n - 1), a.stops[i]);
    return g;
  }

  /* ── Couches de fond ──────────────────────────────────────── */
  function paintBackdrop(ctx, w, h, intensity) {
    var base = ctx.createLinearGradient(0, 0, 0, h);
    base.addColorStop(0, THEME.bg2);
    base.addColorStop(0.4, THEME.bg);
    base.addColorStop(1, THEME.bg);
    ctx.fillStyle = base;
    ctx.fillRect(0, 0, w, h);

    var k = intensity;
    radial(ctx, w * 0.08, 0, Math.max(w, h) * 0.65, "rgba(59,130,246," + (0.30 * k) + ")");
    radial(ctx, w, h * 0.04, Math.max(w, h) * 0.6, "rgba(244,63,94," + (0.26 * k) + ")");
    radial(ctx, w * 0.6, h * 0.18, Math.max(w, h) * 0.5, "rgba(139,92,246," + (0.18 * k) + ")");
  }

  function radial(ctx, cx, cy, r, color) {
    var g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
    g.addColorStop(0, color);
    g.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  }

  // Screenshot de projet en fond + voile sombre (mode "background").
  function paintProjectBackground(ctx, w, h, s) {
    var p = currentProject();
    if (!p || !p.image) return;
    var img = getImage(p.image);
    if (!img) return;
    ctx.save();
    drawImageCover(ctx, img, 0, 0, w, h);
    // voile sombre pour garder le texte lisible
    var scrim = ctx.createLinearGradient(0, 0, 0, h);
    scrim.addColorStop(0, "rgba(6,9,18,0.72)");
    scrim.addColorStop(1, "rgba(6,9,18,0.88)");
    ctx.fillStyle = scrim;
    ctx.fillRect(0, 0, w, h);
    ctx.restore();
  }

  function paintGrid(ctx, w, h, s) {
    var layer = document.createElement("canvas");
    layer.width = Math.round(w * s);
    layer.height = Math.round(h * s);
    var lc = layer.getContext("2d");
    lc.setTransform(s, 0, 0, s, 0, 0);
    var major = Math.max(60, Math.round(Math.min(w, h) / 8));
    var minor = major / 5;
    gridLines(lc, w, h, minor, THEME.gridMinor);
    gridLines(lc, w, h, major, THEME.grid);
    lc.globalCompositeOperation = "destination-out";
    var fade = lc.createLinearGradient(0, 0, 0, h);
    fade.addColorStop(0, "rgba(0,0,0,0)");
    fade.addColorStop(0.6, "rgba(0,0,0,0.55)");
    fade.addColorStop(1, "rgba(0,0,0,1)");
    lc.fillStyle = fade;
    lc.fillRect(0, 0, w, h);
    lc.globalCompositeOperation = "source-over";
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.drawImage(layer, 0, 0);
    ctx.setTransform(s, 0, 0, s, 0, 0);
    ctx.restore();
  }

  function gridLines(ctx, w, h, step, color) {
    ctx.strokeStyle = color;
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (var x = step; x < w; x += step) { ctx.moveTo(Math.round(x) + 0.5, 0); ctx.lineTo(Math.round(x) + 0.5, h); }
    for (var y = step; y < h; y += step) { ctx.moveTo(0, Math.round(y) + 0.5); ctx.lineTo(w, Math.round(y) + 0.5); }
    ctx.stroke();
  }

  function paintBlueprint(ctx, w, h, s) {
    ctx.save();
    ctx.strokeStyle = THEME.wire;
    ctx.globalAlpha = 0.5;
    ctx.lineWidth = 1.2 / s;
    var u = Math.min(w, h);
    var cx = w * 0.05, cy = h * 0.12, cw = u * 0.28, ch = u * 0.2;
    roundRect(ctx, cx, cy, cw, ch, 10 / s); ctx.stroke();
    ctx.setLineDash([4 / s, 4 / s]);
    roundRect(ctx, cx + cw * 0.08, cy + ch * 0.12, cw * 0.3, ch * 0.3, 6 / s); ctx.stroke();
    ctx.setLineDash([]);
    line(ctx, cx + cw * 0.45, cy + ch * 0.2, cx + cw * 0.9, cy + ch * 0.2);
    line(ctx, cx + cw * 0.45, cy + ch * 0.35, cx + cw * 0.82, cy + ch * 0.35);
    ctx.globalAlpha = 0.4;
    var bx = w * 0.82, by = h * 0.1, bs = u * 0.14;
    poly(ctx, [[bx, by + bs * 0.6], [bx + bs * 0.8, by + bs * 0.2], [bx + bs * 2, by + bs * 0.6], [bx + bs * 1.2, by + bs]], true);
    poly(ctx, [[bx, by + bs * 0.6], [bx, by + bs * 1.6], [bx + bs * 1.2, by + bs * 2], [bx + bs * 1.2, by + bs]]);
    ctx.globalAlpha = 0.45;
    ctx.setLineDash([3 / s, 6 / s]);
    line(ctx, w * 0.55, h * 0.82, w * 0.92, h * 0.82);
    ctx.setLineDash([]);
    ctx.restore();
  }

  function line(ctx, x0, y0, x1, y1) { ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke(); }
  function poly(ctx, pts, close) {
    ctx.beginPath();
    ctx.moveTo(pts[0][0], pts[0][1]);
    for (var j = 1; j < pts.length; j++) ctx.lineTo(pts[j][0], pts[j][1]);
    if (close) ctx.closePath();
    ctx.stroke();
  }

  /* ── Panneau glass (frosted réel) ─────────────────────────── */
  function paintGlass(ctx, x, y, w, h, r, s, intensity) {
    ctx.save();
    ctx.shadowColor = "rgba(0,0,0,0.8)";
    ctx.shadowBlur = 60 / 1;
    ctx.shadowOffsetY = 24;
    roundRect(ctx, x, y, w, h, r);
    ctx.fillStyle = "rgba(8,11,22,0.15)";
    ctx.fill();
    ctx.restore();

    ctx.save();
    roundRect(ctx, x, y, w, h, r);
    ctx.clip();
    ctx.filter = "blur(" + (18 * s) + "px)";
    paintBackdrop(ctx, ctx.canvas.width / s, ctx.canvas.height / s, intensity);
    ctx.filter = "none";
    ctx.fillStyle = THEME.glassFill;
    ctx.fillRect(x, y, w, h);
    ctx.restore();

    ctx.save();
    roundRect(ctx, x, y, w, h, r);
    ctx.lineWidth = 1.5 / s;
    ctx.strokeStyle = THEME.glassBorder;
    ctx.stroke();
    var sheen = ctx.createLinearGradient(x, y, x + w * 0.6, y + h);
    sheen.addColorStop(0, "rgba(255,255,255,0.35)");
    sheen.addColorStop(0.35, "rgba(255,255,255,0)");
    sheen.addColorStop(1, "rgba(140,170,255,0.15)");
    ctx.lineWidth = 1.5 / s;
    ctx.strokeStyle = sheen;
    roundRect(ctx, x + 0.5 / s, y + 0.5 / s, w - 1 / s, h - 1 / s, r);
    ctx.stroke();
    ctx.restore();
  }

  /* ── Avatar (anneau conique + photo ou monogramme) ────────── */
  function paintAvatar(ctx, cx, cy, radius, s) {
    var a = ACCENTS[state.accent] || ACCENTS.cold;
    ctx.save();
    var ring;
    if (ctx.createConicGradient) {
      ring = ctx.createConicGradient(Math.PI * 1.16, cx, cy);
      ring.addColorStop(0, THEME.cyan);
      ring.addColorStop(0.4, THEME.violet);
      ring.addColorStop(0.7, THEME.warm);
      ring.addColorStop(1, THEME.cyan);
    } else {
      ring = accentGrad(ctx, cx - radius, cy - radius, cx + radius, cy + radius, state.accent);
    }
    ctx.shadowColor = "rgba(" + a.glow + ",0.5)";
    ctx.shadowBlur = 70 / 1;
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.fillStyle = ring;
    ctx.fill();
    ctx.restore();

    var inner = radius - Math.max(3, radius * 0.05);
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, inner, 0, Math.PI * 2);
    ctx.clip();
    if (state.photo) {
      drawImageCover(ctx, state.photo, cx - inner, cy - inner, inner * 2, inner * 2);
    } else {
      ctx.fillStyle = THEME.surface;
      ctx.fillRect(cx - inner, cy - inner, inner * 2, inner * 2);
      var initial = (D.firstName || state.title || "C").trim().charAt(0).toUpperCase() || "C";
      ctx.fillStyle = accentGrad(ctx, cx - inner, cy - inner, cx + inner, cy + inner, state.accent);
      ctx.font = "700 " + (inner * 1.1) + 'px ' + THEME.fontHead;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(initial, cx, cy + inner * 0.04);
    }
    ctx.restore();
  }

  function drawImageCover(ctx, img, dx, dy, dw, dh) {
    var iw = img.naturalWidth || img.width, ih = img.naturalHeight || img.height;
    if (!iw || !ih) return;
    var scale = Math.max(dw / iw, dh / ih);
    var sw = dw / scale, sh = dh / scale;
    var sx = (iw - sw) / 2, sy = (ih - sh) / 2;
    ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh);
  }

  function drawImageContain(ctx, img, dx, dy, dw, dh) {
    var iw = img.naturalWidth || img.width, ih = img.naturalHeight || img.height;
    if (!iw || !ih) return;
    var scale = Math.min(dw / iw, dh / ih);
    var w = iw * scale, h = ih * scale;
    ctx.drawImage(img, dx + (dw - w) / 2, dy + (dh - h) / 2, w, h);
  }

  /* ── Texte : titre dégradé, sous-titre, rôle, handle ──────── */
  function fitFontSize(ctx, text, maxWidth, baseSize, weight, font, spacingRatio) {
    if (!text) return baseSize;
    var size = baseSize, min = baseSize * 0.45;
    ctx.save();
    for (var i = 0; i < 16; i++) {
      ctx.font = weight + " " + size + "px " + font;
      setLetterSpacing(ctx, (spacingRatio || 0) * size);
      if (ctx.measureText(text).width <= maxWidth || size <= min) break;
      size *= 0.93;
    }
    ctx.restore();
    return size;
  }

  function drawTitle(ctx, text, x, y, size, align, accent) {
    ctx.save();
    ctx.font = "700 " + size + "px " + THEME.fontHead;
    ctx.textAlign = align;
    ctx.textBaseline = "alphabetic";
    setLetterSpacing(ctx, -0.03 * size);
    var wmeasure = ctx.measureText(text).width;
    var gx = align === "center" ? x - wmeasure / 2 : (align === "right" ? x - wmeasure : x);
    ctx.fillStyle = accentGrad(ctx, gx, y, gx + Math.max(wmeasure, 1), y, accent);
    ctx.fillText(text, x, y);
    ctx.restore();
  }

  function drawLine(ctx, text, x, y, size, color, align, weight, font, spacing) {
    if (!text) return;
    ctx.save();
    ctx.font = (weight || 500) + " " + size + "px " + (font || THEME.fontBody);
    ctx.fillStyle = color;
    ctx.textAlign = align || "left";
    ctx.textBaseline = "alphabetic";
    setLetterSpacing(ctx, spacing || 0);
    ctx.fillText(text, x, y);
    ctx.restore();
  }

  function drawHandlePill(ctx, text, x, y, size, align) {
    if (!text) return;
    ctx.save();
    ctx.font = "600 " + size + "px " + THEME.fontHead;
    setLetterSpacing(ctx, 0.02 * size);
    var tw = ctx.measureText(text).width;
    var padX = size * 0.9, padY = size * 0.55;
    var pw = tw + padX * 2, ph = size + padY * 2;
    var px = align === "center" ? x - pw / 2 : (align === "right" ? x - pw : x);
    roundRect(ctx, px, y, pw, ph, ph / 2);
    ctx.fillStyle = "rgba(255,255,255,0.06)";
    ctx.fill();
    ctx.lineWidth = 1.2;
    ctx.strokeStyle = THEME.glassBorder;
    ctx.stroke();
    ctx.fillStyle = THEME.textSoft;
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.fillText(text, px + padX, y + ph / 2 + size * 0.04);
    ctx.restore();
  }
  function pillHeight(size) { return size + size * 0.55 * 2; }

  /* ── Cache d'images (icônes SVG, logos, screenshots) ──────── */
  var imgCache = {};
  function getImage(src) {
    if (!src) return null;
    var e = imgCache[src];
    if (e) return e.ready === true ? e.img : null;
    var img = new Image();
    imgCache[src] = { img: img, ready: false };
    img.onload = function () { imgCache[src].ready = true; scheduleRedraw(); };
    img.onerror = function () { imgCache[src].ready = "error"; };
    img.src = src;
    return null;
  }
  var redrawPending = false;
  function scheduleRedraw() {
    if (redrawPending) return;
    redrawPending = true;
    var cb = function () { redrawPending = false; draw(); };
    if (window.requestAnimationFrame) window.requestAnimationFrame(cb);
    else window.setTimeout(cb, 16);
  }

  function skillByKey(key) {
    for (var i = 0; i < DATA.skills.length; i++) if (DATA.skills[i].key === key) return DATA.skills[i];
    return null;
  }
  function currentProject() {
    return (state.projectId >= 0 && state.projectId < DATA.projects.length) ? DATA.projects[state.projectId] : null;
  }

  /* ============================================================
     Système de blocs composables
     Chaque bloc : build(ctx, ll) → { h, render(ctx, x, yTop, w, align) }
     ou null si le bloc n'a pas de contenu (donc ignoré).
     ll = { u, maxW, s } contexte de mise en page.
     ============================================================ */
  function buildBlock(id, ctx, ll) {
    switch (id) {
      case "avatar": return blkAvatar(ctx, ll);
      case "title": return blkTitle(ctx, ll);
      case "role": return blkLine(ctx, ll, state.role, ll.u * 0.044, "600", THEME.fontHead, THEME.textSoft, 0.01);
      case "subtitle": return blkLine(ctx, ll, state.subtitle, ll.u * 0.036, "400", THEME.fontBody, THEME.textDim, 0);
      case "handle": return blkHandle(ctx, ll);
      case "skills": return blkSkills(ctx, ll);
      case "stats": return blkStats(ctx, ll);
      case "availability": return blkAvailability(ctx, ll);
      case "contacts": return blkContacts(ctx, ll);
      case "project": return state.projectMode === "card" ? blkProjectCard(ctx, ll)
        : (state.projectMode === "strip" ? blkProjectStrip(ctx, ll) : null);
      default: return null;
    }
  }

  function blkAvatar(ctx, ll) {
    var r = ll.u * (ll.vertical ? 0.11 : 0.13);
    return {
      h: r * 2,
      render: function (ctx, x, y, w, align) {
        var cx = align === "left" ? x + r : x + w / 2;
        paintAvatar(ctx, cx, y + r, r, ll.s);
      }
    };
  }

  function blkTitle(ctx, ll) {
    if (!state.title) return null;
    var size = fitFontSize(ctx, state.title, ll.maxW, ll.u * (ll.vertical ? 0.072 : 0.1), "700", THEME.fontHead, -0.03);
    return {
      h: size,
      render: function (ctx, x, y, w, align) {
        var ax = align === "left" ? x : x + w / 2;
        drawTitle(ctx, state.title, ax, y + size, size, align === "left" ? "left" : "center", state.accent);
      }
    };
  }

  function blkLine(ctx, ll, text, base, weight, font, color, spacing) {
    if (!text) return null;
    var size = fitFontSize(ctx, text, ll.maxW, base, weight, font, 0);
    return {
      h: size,
      render: function (ctx, x, y, w, align) {
        var ax = align === "left" ? x : x + w / 2;
        drawLine(ctx, text, ax, y + size, size, color, align === "left" ? "left" : "center", weight, font, spacing * size);
      }
    };
  }

  function blkHandle(ctx, ll) {
    if (!state.handle) return null;
    var size = ll.u * 0.038;
    return {
      h: pillHeight(size),
      render: function (ctx, x, y, w, align) {
        var ax = align === "left" ? x : x + w / 2;
        drawHandlePill(ctx, state.handle, ax, y, size, align === "left" ? "left" : "center");
      }
    };
  }

  // Rangée(s) de puces compétences (avec retour à la ligne).
  function blkSkills(ctx, ll) {
    var keys = state.selectedSkills;
    if (!keys.length) return null;
    var fs = ll.u * 0.03;                 // taille du texte de puce
    var chipH = fs + fs * 1.1;            // hauteur de puce
    var icon = chipH * 0.58;
    var padX = fs * 0.7, gap = fs * 0.6, iconGap = fs * 0.4;
    var rowGap = fs * 0.55;

    ctx.save();
    ctx.font = "600 " + fs + "px " + THEME.fontBody;
    var chips = [];
    for (var i = 0; i < keys.length; i++) {
      var sk = skillByKey(keys[i]);
      if (!sk) continue;
      var tw = ctx.measureText(sk.label).width;
      chips.push({ sk: sk, w: padX + icon + iconGap + tw + padX, tw: tw });
    }
    ctx.restore();
    if (!chips.length) return null;

    // Répartition en lignes selon maxW
    var lines = [], cur = [], curW = 0;
    for (var j = 0; j < chips.length; j++) {
      var cw = chips[j].w;
      if (cur.length && curW + gap + cw > ll.maxW) { lines.push({ items: cur, w: curW }); cur = []; curW = 0; }
      if (cur.length) curW += gap;
      cur.push(chips[j]); curW += cw;
    }
    if (cur.length) lines.push({ items: cur, w: curW });

    var totalH = lines.length * chipH + (lines.length - 1) * rowGap;
    return {
      h: totalH,
      render: function (ctx, x, y, w, align) {
        var ly = y;
        for (var li = 0; li < lines.length; li++) {
          var ln = lines[li];
          var lx = align === "left" ? x : x + (w - ln.w) / 2;
          for (var ci = 0; ci < ln.items.length; ci++) {
            drawChip(ctx, ln.items[ci], lx, ly, chipH, icon, padX, iconGap, fs);
            lx += ln.items[ci].w + gap;
          }
          ly += chipH + rowGap;
        }
      }
    };
  }

  function drawChip(ctx, chip, x, y, chipH, icon, padX, iconGap, fs) {
    var sk = chip.sk;
    ctx.save();
    roundRect(ctx, x, y, chip.w, chipH, chipH / 2);
    ctx.fillStyle = "rgba(255,255,255,0.06)";
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle = THEME.glassBorder;
    ctx.stroke();
    var iconX = x + padX, iconY = y + (chipH - icon) / 2;
    var img = sk.iconPath ? getImage(sk.iconPath) : null;
    if (img) {
      drawImageContain(ctx, img, iconX, iconY, icon, icon);
    } else if (sk.icon) {
      ctx.font = icon * 0.9 + "px " + THEME.fontBody;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(sk.icon, iconX + icon / 2, iconY + icon / 2 + icon * 0.05);
    } else {
      ctx.beginPath();
      ctx.arc(iconX + icon / 2, iconY + icon / 2, icon * 0.42, 0, Math.PI * 2);
      ctx.fillStyle = sk.color || THEME.cyan;
      ctx.fill();
    }
    ctx.fillStyle = THEME.text;
    ctx.font = "600 " + fs + "px " + THEME.fontBody;
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.fillText(sk.label, iconX + icon + iconGap, y + chipH / 2 + fs * 0.04);
    ctx.restore();
  }

  // Tuiles de stats (grand chiffre + label).
  function blkStats(ctx, ll) {
    var items = state.stats.filter(function (s) { return s.on && (s.value || s.value === 0); });
    if (!items.length) return null;
    var valSize = ll.u * 0.075;
    var labSize = ll.u * 0.028;
    var gap = ll.u * 0.012;
    var tileH = valSize + gap + labSize;
    var sep = ll.u * 0.05;

    ctx.save();
    ctx.font = "700 " + valSize + "px " + THEME.fontHead;
    var tiles = [];
    for (var i = 0; i < items.length; i++) {
      var vw = ctx.measureText("" + items[i].value).width;
      ctx.font = "500 " + labSize + "px " + THEME.fontBody;
      var lw = ctx.measureText(items[i].label).width;
      ctx.font = "700 " + valSize + "px " + THEME.fontHead;
      tiles.push({ it: items[i], w: Math.max(vw, lw) });
    }
    ctx.restore();
    var totalW = tiles.reduce(function (a, t) { return a + t.w; }, 0) + sep * (tiles.length - 1);

    return {
      h: tileH,
      render: function (ctx, x, y, w, align) {
        var lx = align === "left" ? x : x + (w - totalW) / 2;
        for (var i = 0; i < tiles.length; i++) {
          var t = tiles[i], cx = lx + t.w / 2;
          ctx.save();
          ctx.textAlign = "center";
          ctx.textBaseline = "alphabetic";
          setLetterSpacing(ctx, -0.02 * valSize);
          ctx.font = "700 " + valSize + "px " + THEME.fontHead;
          ctx.fillStyle = accentGrad(ctx, cx - t.w / 2, y, cx + t.w / 2, y, state.accent);
          ctx.fillText("" + t.it.value, cx, y + valSize);
          setLetterSpacing(ctx, 0.06 * labSize);
          ctx.font = "500 " + labSize + "px " + THEME.fontBody;
          ctx.fillStyle = THEME.textDim;
          ctx.fillText((t.it.label || "").toUpperCase(), cx, y + valSize + gap + labSize);
          ctx.restore();
          lx += t.w + sep;
        }
      }
    };
  }

  // Pastille de disponibilité (point + texte).
  function blkAvailability(ctx, ll) {
    var av = DATA.availability;
    var on = av.available !== false;
    var text = (av.message && String(av.message)) || (on ? L.avail.on : L.avail.off);
    var size = ll.u * 0.032;
    var dot = size * 0.55;
    ctx.save();
    ctx.font = "600 " + size + "px " + THEME.fontHead;
    var tw = ctx.measureText(text).width;
    ctx.restore();
    var padX = size * 0.9, padY = size * 0.5, gap = size * 0.5;
    var pw = padX * 2 + dot + gap + tw, ph = size + padY * 2;
    return {
      h: ph,
      render: function (ctx, x, y, w, align) {
        var px = align === "left" ? x : x + (w - pw) / 2;
        roundRect(ctx, px, y, pw, ph, ph / 2);
        ctx.fillStyle = "rgba(52,211,153,0.10)";
        ctx.fill();
        ctx.lineWidth = 1.2;
        ctx.strokeStyle = "rgba(52,211,153,0.45)";
        ctx.stroke();
        ctx.save();
        ctx.shadowColor = THEME.green; ctx.shadowBlur = dot * 2.4;
        ctx.beginPath();
        ctx.arc(px + padX + dot / 2, y + ph / 2, dot / 2, 0, Math.PI * 2);
        ctx.fillStyle = on ? THEME.green : THEME.textDim;
        ctx.fill();
        ctx.restore();
        ctx.fillStyle = THEME.text;
        ctx.font = "600 " + size + "px " + THEME.fontHead;
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        ctx.fillText(text, px + padX + dot + gap, y + ph / 2 + size * 0.04);
      }
    };
  }

  // Ligne de contacts (mono, séparés par des points).
  function blkContacts(ctx, ll) {
    var c = DATA.contacts, parts = [];
    if (c.linkedin) parts.push(String(c.linkedin).replace(/^https?:\/\//, ""));
    if (c.github) parts.push(String(c.github).replace(/^https?:\/\//, ""));
    if (c.discord) parts.push("@" + c.discord);
    if (!parts.length) return null;
    var text = parts.join("   •   ");
    var size = fitFontSize(ctx, text, ll.maxW, ll.u * 0.03, "500", THEME.fontMono, 0);
    return {
      h: size,
      render: function (ctx, x, y, w, align) {
        var ax = align === "left" ? x : x + w / 2;
        drawLine(ctx, text, ax, y + size, size, THEME.textDim, align === "left" ? "left" : "center", 500, THEME.fontMono, 0);
      }
    };
  }

  // Carte projet : logo + titre + KPI téléchargements.
  function blkProjectCard(ctx, ll) {
    var p = currentProject();
    if (!p) return null;
    var logo = p.logo ? getImage(p.logo) : null;
    var logoH = logo ? ll.u * 0.16 : 0;
    var titleSize = ll.u * 0.05;
    var kpiSize = p.downloads ? ll.u * 0.065 : 0;
    var kpiLab = p.downloads ? ll.u * 0.026 : 0;
    var gap = ll.u * 0.03;
    var h = 0;
    if (logo) h += logoH + gap;
    h += titleSize;
    if (p.downloads) h += gap + kpiSize + kpiLab * 0.4 + kpiLab;
    return {
      h: h,
      render: function (ctx, x, y, w, align) {
        var cx = align === "left" ? x : x + w / 2;
        var yy = y;
        if (logo) {
          var lw = ll.u * 0.3;
          var lx = align === "left" ? x : x + (w - lw) / 2;
          drawImageContain(ctx, logo, lx, yy, lw, logoH);
          yy += logoH + gap;
        }
        drawLine(ctx, p.title, cx, yy + titleSize, titleSize, THEME.text, align === "left" ? "left" : "center", 700, THEME.fontHead, 0);
        yy += titleSize;
        if (p.downloads) {
          yy += gap;
          ctx.save();
          ctx.textAlign = align === "left" ? "left" : "center";
          ctx.textBaseline = "alphabetic";
          ctx.font = "700 " + kpiSize + "px " + THEME.fontHead;
          ctx.fillStyle = accentGrad(ctx, cx - w * 0.2, yy, cx + w * 0.2, yy, state.accent);
          ctx.fillText(fmtNum(p.downloads), cx, yy + kpiSize);
          ctx.font = "500 " + kpiLab + "px " + THEME.fontBody;
          setLetterSpacing(ctx, 0.06 * kpiLab);
          ctx.fillStyle = THEME.textDim;
          ctx.fillText((EN ? "DOWNLOADS" : "TÉLÉCHARGEMENTS"), cx, yy + kpiSize + kpiLab * 0.4 + kpiLab);
          ctx.restore();
        }
      }
    };
  }

  // Bande de logos des projets featured.
  function blkProjectStrip(ctx, ll) {
    var logos = [];
    for (var i = 0; i < DATA.projects.length && logos.length < 6; i++) {
      var p = DATA.projects[i];
      if (p.featured && p.logo) { var im = getImage(p.logo); if (im) logos.push(im); }
    }
    if (!logos.length) return null;
    var cell = ll.u * 0.13, gap = ll.u * 0.035;
    var totalW = logos.length * cell + (logos.length - 1) * gap;
    return {
      h: cell,
      render: function (ctx, x, y, w, align) {
        var lx = align === "left" ? x : x + (w - totalW) / 2;
        for (var i = 0; i < logos.length; i++) {
          drawImageContain(ctx, logos[i], lx, y, cell, cell);
          lx += cell + gap;
        }
      }
    };
  }

  /* ── Empilage générique de blocs dans un panneau ──────────── */
  function collectBlocks(ctx, ll) {
    var blocks = [];
    for (var i = 0; i < state.modules.length; i++) {
      var m = state.modules[i];
      if (!m.on) continue;
      // le projet en mode "fond" est peint en arrière-plan, pas dans la pile
      if (m.id === "project" && state.projectMode === "background") continue;
      var b = buildBlock(m.id, ctx, ll);
      if (b) blocks.push(b);
    }
    return blocks;
  }

  function renderStack(ctx, area, s, align, panelRatio) {
    var u = Math.min(area.w, area.h);
    var vertical = area.vertical;
    var pw = area.w * (vertical ? 0.84 : (panelRatio || 0.82));
    var ph = area.h * (vertical ? 0.78 : 0.82);
    var px = align === "left" ? area.x + area.w * 0.05 : area.x + (area.w - pw) / 2;
    if (align === "left") pw = area.w - area.w * 0.1;
    var py = area.y + (area.h - ph) / 2;
    paintGlass(ctx, px, py, pw, ph, Math.min(u * 0.06, 34), s, state.intensity);

    var innerX = px + pw * 0.07;
    var innerW = pw - pw * 0.14;
    var ll = { u: u, maxW: innerW * 0.98, s: s, vertical: vertical };
    var blocks = collectBlocks(ctx, ll);
    if (!blocks.length) return;
    var gap = u * 0.04;
    var total = 0;
    for (var i = 0; i < blocks.length; i++) total += blocks[i].h;
    total += gap * (blocks.length - 1);

    var y = py + (ph - total) / 2;
    for (var j = 0; j < blocks.length; j++) {
      blocks[j].render(ctx, innerX, y, innerW, align);
      y += blocks[j].h + gap;
    }
  }

  function renderMinimal(ctx, area, s) {
    var u = Math.min(area.w, area.h);
    var cx = area.x + area.w / 2;
    var maxW = area.w * 0.82;
    var titleSize = state.title ? fitFontSize(ctx, state.title, maxW, u * (area.vertical ? 0.088 : 0.12), "700", THEME.fontHead, -0.03) : 0;
    var roleSize = state.role ? fitFontSize(ctx, state.role, maxW, u * 0.04, "600", THEME.fontHead, 0.02) : 0;
    var handleSize = state.handle ? u * 0.034 : 0;
    var gRole = u * 0.045, gHandle = u * 0.05;

    var total = titleSize;
    if (roleSize) total += gRole + roleSize;
    if (handleSize) total += gHandle + handleSize;

    var y = area.y + (area.h - total) / 2;
    if (titleSize) { drawTitle(ctx, state.title, cx, y + titleSize, titleSize, "center", state.accent); y += titleSize; }
    if (roleSize) { y += gRole; drawLine(ctx, state.role, cx, y + roleSize, roleSize, THEME.textSoft, "center", 600, THEME.fontHead, 0.02 * roleSize); y += roleSize; }
    if (handleSize) { y += gHandle; drawLine(ctx, state.handle, cx, y + handleSize, handleSize, THEME.textDim, "center", 500, THEME.fontMono); }
  }

  function presetMonogram(ctx, fmt, s) {
    var w = fmt.w, h = fmt.h, u = Math.min(w, h);
    var m = u * 0.14;
    paintGlass(ctx, m, m, w - m * 2, h - m * 2, u * 0.12, s, state.intensity);
    var initial = (D.firstName || state.title || "C").trim().charAt(0).toUpperCase() || "C";
    ctx.save();
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "700 " + (u * 0.5) + "px " + THEME.fontHead;
    setLetterSpacing(ctx, -0.03 * u * 0.5);
    ctx.fillStyle = accentGrad(ctx, w * 0.3, h * 0.3, w * 0.7, h * 0.7, state.accent);
    ctx.fillText(initial, w / 2, h / 2 + u * 0.02);
    ctx.restore();
  }

  function presetIconCentered(ctx, fmt, s) {
    var w = fmt.w, h = fmt.h, u = Math.min(w, h);
    if (avatarOn()) paintAvatar(ctx, w / 2, h / 2, u * 0.36, s);
    else presetMonogram(ctx, fmt, s);
  }

  function avatarOn() {
    for (var i = 0; i < state.modules.length; i++) if (state.modules[i].id === "avatar") return state.modules[i].on;
    return false;
  }

  function renderPreset(ctx, fmt, s) {
    var w = fmt.w, h = fmt.h;
    var area = fmt.safe
      ? { w: fmt.safe.w, h: fmt.safe.h, x: (w - fmt.safe.w) / 2, y: (h - fmt.safe.h) / 2 }
      : { w: w, h: h, x: 0, y: 0 };
    area.vertical = fmt.cat === "vertical";
    if (fmt.cat === "icon") return state.preset === "centered" ? presetIconCentered(ctx, fmt, s) : presetMonogram(ctx, fmt, s);
    if (state.preset === "minimal") return renderMinimal(ctx, area, s);
    return renderStack(ctx, area, s, state.preset === "left" ? "left" : "center");
  }

  /* ── Rendu global ─────────────────────────────────────────── */
  function render(ctx, fmt, s) {
    var w = fmt.w, h = fmt.h;
    ctx.canvas.width = Math.round(w * s);
    ctx.canvas.height = Math.round(h * s);
    ctx.setTransform(s, 0, 0, s, 0, 0);
    ctx.clearRect(0, 0, w, h);
    paintBackdrop(ctx, w, h, state.intensity);
    if (projectBackgroundActive()) paintProjectBackground(ctx, w, h, s);
    paintGrid(ctx, w, h, s);
    if (state.blueprint) paintBlueprint(ctx, w, h, s);
    renderPreset(ctx, fmt, s);
    ctx.save();
    var vg = ctx.createRadialGradient(w / 2, h * 0.1, Math.min(w, h) * 0.2, w / 2, h / 2, Math.max(w, h) * 0.75);
    vg.addColorStop(0.55, "rgba(0,0,0,0)");
    vg.addColorStop(1, "rgba(0,0,0,0.5)");
    ctx.fillStyle = vg;
    ctx.fillRect(0, 0, w, h);
    ctx.restore();
  }

  function projectBackgroundActive() {
    if (state.projectMode !== "background") return false;
    for (var i = 0; i < state.modules.length; i++) if (state.modules[i].id === "project") return state.modules[i].on;
    return false;
  }

  /* ── DOM refs ─────────────────────────────────────────────── */
  var canvas = document.getElementById("bg-canvas");
  var ctx = canvas.getContext("2d");
  var elTemplate = document.getElementById("bg-template");
  var elTplSave = document.getElementById("bg-tpl-save");
  var elTplSaveAs = document.getElementById("bg-tpl-saveas");
  var elTplDelete = document.getElementById("bg-tpl-delete");
  var elFormat = document.getElementById("bg-format");
  var elPreset = document.getElementById("bg-preset");
  var elModules = document.getElementById("bg-modules");
  var elTitle = document.getElementById("bg-title");
  var elSubtitle = document.getElementById("bg-subtitle");
  var elRole = document.getElementById("bg-role");
  var elHandle = document.getElementById("bg-handle");
  var elSkills = document.getElementById("bg-skills");
  var elSkillsCount = document.getElementById("bg-skills-count");
  var elStats = document.getElementById("bg-stats");
  var elProject = document.getElementById("bg-project");
  var elProjectMode = document.getElementById("bg-project-mode");
  var elPhoto = document.getElementById("bg-photo");
  var elBlueprint = document.getElementById("bg-blueprint");
  var elIntensity = document.getElementById("bg-intensity");
  var elRetina = document.getElementById("bg-retina");
  var elDims = document.getElementById("bg-dims");
  var elStatus = document.getElementById("bg-status");

  function currentFormat() {
    for (var i = 0; i < FORMATS.length; i++) if (FORMATS[i].id === state.formatId) return FORMATS[i];
    return FORMATS[0];
  }

  function draw() {
    var fmt = currentFormat();
    render(ctx, fmt, 1);
    elDims.textContent = fmt.w + " × " + fmt.h + " px";
  }

  /* ── Peuplement des selects ───────────────────────────────── */
  function buildFormatOptions() {
    var groups = {};
    FORMATS.forEach(function (f) { (groups[f.group] = groups[f.group] || []).push(f); });
    Object.keys(groups).forEach(function (g) {
      var og = document.createElement("optgroup");
      og.label = g;
      groups[g].forEach(function (f) {
        var o = document.createElement("option");
        o.value = f.id; o.textContent = f.label + "  (" + f.w + "×" + f.h + ")";
        og.appendChild(o);
      });
      elFormat.appendChild(og);
    });
  }

  function buildPresetOptions() {
    var fmt = currentFormat();
    var list = PRESETS_BY_CAT[fmt.cat] || ["centered"];
    elPreset.innerHTML = "";
    list.forEach(function (p) {
      var o = document.createElement("option");
      o.value = p; o.textContent = (PRESET_LABELS[p] || {})[LANG] || p;
      elPreset.appendChild(o);
    });
    if (list.indexOf(state.preset) === -1) state.preset = list[0];
    elPreset.value = state.preset;
  }

  function buildProjectOptions() {
    elProject.innerHTML = "";
    DATA.projects.forEach(function (p, i) {
      var o = document.createElement("option");
      o.value = i;
      o.textContent = (p.featured ? "★ " : "") + p.title;
      elProject.appendChild(o);
    });
    if (state.projectId >= 0) elProject.value = state.projectId;
  }

  /* ── Composition (liste de modules réordonnable) ──────────── */
  function buildModules() {
    elModules.innerHTML = "";
    state.modules.forEach(function (m, i) {
      var li = document.createElement("li");
      li.className = "bc-module";
      var lab = document.createElement("label");
      lab.className = "bc-module-toggle";
      var cb = document.createElement("input");
      cb.type = "checkbox"; cb.checked = m.on;
      cb.addEventListener("change", function () { m.on = cb.checked; draw(); });
      var span = document.createElement("span");
      span.textContent = L.modules[m.id] || m.id;
      lab.appendChild(cb); lab.appendChild(span);
      var nav = document.createElement("span");
      nav.className = "bc-module-nav";
      var up = mkArrow("↑", i === 0, function () { moveModule(i, -1); });
      var down = mkArrow("↓", i === state.modules.length - 1, function () { moveModule(i, 1); });
      nav.appendChild(up); nav.appendChild(down);
      li.appendChild(lab); li.appendChild(nav);
      elModules.appendChild(li);
    });
  }
  function mkArrow(txt, disabled, fn) {
    var b = document.createElement("button");
    b.type = "button"; b.className = "bc-arrow"; b.textContent = txt; b.disabled = disabled;
    if (!disabled) b.addEventListener("click", fn);
    return b;
  }
  function moveModule(i, dir) {
    var j = i + dir;
    if (j < 0 || j >= state.modules.length) return;
    var tmp = state.modules[i]; state.modules[i] = state.modules[j]; state.modules[j] = tmp;
    buildModules(); draw();
  }

  /* ── Compétences (cases groupées) ─────────────────────────── */
  function buildSkills() {
    elSkills.innerHTML = "";
    var order = ["languages", "frameworks", "specialties", "softskills", "tools"];
    order.forEach(function (grp) {
      var items = DATA.skills.filter(function (s) { return s.group === grp; });
      if (!items.length) return;
      var head = document.createElement("div");
      head.className = "bc-skills-head";
      head.textContent = L.groups[grp] || grp;
      elSkills.appendChild(head);
      items.forEach(function (sk) {
        var lab = document.createElement("label");
        lab.className = "bc-skill";
        var cb = document.createElement("input");
        cb.type = "checkbox";
        cb.checked = state.selectedSkills.indexOf(sk.key) !== -1;
        cb.addEventListener("change", function () {
          var idx = state.selectedSkills.indexOf(sk.key);
          if (cb.checked && idx === -1) { state.selectedSkills.push(sk.key); if (sk.iconPath) getImage(sk.iconPath); }
          else if (!cb.checked && idx !== -1) state.selectedSkills.splice(idx, 1);
          updateSkillsCount(); draw();
        });
        var span = document.createElement("span");
        span.textContent = sk.label;
        lab.appendChild(cb); lab.appendChild(span);
        elSkills.appendChild(lab);
      });
    });
    updateSkillsCount();
  }
  function updateSkillsCount() {
    elSkillsCount.textContent = state.selectedSkills.length ? "(" + state.selectedSkills.length + ")" : "";
  }

  /* ── Stats (case + valeur + label éditables) ──────────────── */
  function buildStats() {
    elStats.innerHTML = "";
    state.stats.forEach(function (st) {
      var row = document.createElement("div");
      row.className = "bc-stat";
      var lab = document.createElement("label");
      lab.className = "bc-stat-toggle";
      var cb = document.createElement("input");
      cb.type = "checkbox"; cb.checked = st.on;
      cb.addEventListener("change", function () { st.on = cb.checked; draw(); });
      lab.appendChild(cb);
      var val = document.createElement("input");
      val.type = "text"; val.className = "bc-input bc-stat-val"; val.value = st.value;
      val.addEventListener("input", function () { st.value = val.value; draw(); });
      var name = document.createElement("input");
      name.type = "text"; name.className = "bc-input bc-stat-label"; name.value = st.label;
      name.addEventListener("input", function () { st.label = name.value; draw(); });
      row.appendChild(lab); row.appendChild(val); row.appendChild(name);
      elStats.appendChild(row);
    });
  }

  /* ── Export ───────────────────────────────────────────────── */
  function renderOffscreen(fmt, s) {
    var off = document.createElement("canvas");
    var octx = off.getContext("2d");
    render(octx, fmt, s);
    return off;
  }

  function downloadCanvas(cv, filename) {
    return new Promise(function (resolve) {
      cv.toBlob(function (blob) {
        var url = URL.createObjectURL(blob);
        var a = document.createElement("a");
        a.href = url; a.download = filename;
        document.body.appendChild(a); a.click(); a.remove();
        setTimeout(function () { URL.revokeObjectURL(url); resolve(); }, 200);
      }, "image/png");
    });
  }

  function exportCurrent() {
    var fmt = currentFormat();
    var s = elRetina.checked ? 2 : 1;
    var off = renderOffscreen(fmt, s);
    var suffix = elRetina.checked ? "@2x" : "";
    downloadCanvas(off, "clixmods-" + fmt.id + suffix + ".png");
  }

  function exportAll() {
    var s = elRetina.checked ? 2 : 1;
    var i = 0;
    setStatus(EN ? "Exporting…" : "Export en cours…");
    function next() {
      if (i >= FORMATS.length) { setStatus(EN ? "Done ✓" : "Terminé ✓"); return; }
      var fmt = FORMATS[i++];
      var off = renderOffscreen(fmt, s);
      var suffix = elRetina.checked ? "@2x" : "";
      downloadCanvas(off, "clixmods-" + fmt.id + suffix + ".png").then(function () {
        setStatus((EN ? "Exported " : "Exporté ") + i + "/" + FORMATS.length);
        setTimeout(next, 280);
      });
    }
    next();
  }

  function setStatus(msg) { elStatus.textContent = msg; }

  /* ── Templates (built-ins + localStorage) ─────────────────── */
  var STORAGE_KEY = "clixmods-branding-templates";

  function modulesPreset(onList) {
    return DEFAULT_MODULES.map(function (m) { return { id: m.id, on: onList.indexOf(m.id) !== -1 }; });
  }
  function topSkills(n) { return DATA.skills.slice(0, n).map(function (s) { return s.key; }); }

  var BUILTINS = [
    {
      id: "identity", name: EN ? "Identity" : "Identité",
      patch: function () { return {}; } // état par défaut
    },
    {
      id: "recruiter", name: EN ? "Recruiter KPI" : "KPI recruteur",
      patch: function () {
        return {
          modules: modulesPreset(["title", "role", "stats", "skills", "handle"]),
          selectedSkills: topSkills(6)
        };
      }
    },
    {
      id: "freelance", name: EN ? "Freelance / Malt" : "Freelance / Malt",
      patch: function () {
        return {
          modules: modulesPreset(["avatar", "title", "role", "availability", "skills", "contacts"]),
          selectedSkills: topSkills(5)
        };
      }
    },
    {
      id: "showcase", name: EN ? "Project showcase" : "Vitrine projet",
      patch: function () {
        return {
          modules: modulesPreset(["title", "role", "project", "handle"]),
          projectMode: "background"
        };
      }
    },
    {
      id: "social", name: EN ? "Social banner" : "Bannière sociale",
      patch: function () {
        return {
          modules: modulesPreset(["avatar", "title", "role", "handle", "skills"]),
          selectedSkills: topSkills(4),
          preset: "left"
        };
      }
    }
  ];

  function loadSaved() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; } catch (e) { return []; }
  }
  function storeSaved(list) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(list)); } catch (e) { /* quota / privé */ }
  }

  var PERSIST_KEYS = ["preset", "title", "subtitle", "role", "handle", "accent", "blueprint", "intensity", "modules", "selectedSkills", "stats", "projectId", "projectMode"];
  function snapshot() {
    var o = {};
    PERSIST_KEYS.forEach(function (k) { o[k] = JSON.parse(JSON.stringify(state[k])); });
    return o;
  }
  function applySnapshot(snap) {
    PERSIST_KEYS.forEach(function (k) {
      if (snap[k] === undefined) return;
      state[k] = JSON.parse(JSON.stringify(snap[k]));
    });
  }

  function buildTemplateOptions() {
    elTemplate.innerHTML = "";
    var custom = document.createElement("option");
    custom.value = ""; custom.textContent = L.tpl.none;
    elTemplate.appendChild(custom);

    var ogb = document.createElement("optgroup"); ogb.label = L.tpl.builtin;
    BUILTINS.forEach(function (t) {
      var o = document.createElement("option");
      o.value = "builtin:" + t.id; o.textContent = t.name;
      ogb.appendChild(o);
    });
    elTemplate.appendChild(ogb);

    var saved = loadSaved();
    if (saved.length) {
      var ogs = document.createElement("optgroup"); ogs.label = L.tpl.saved;
      saved.forEach(function (t, i) {
        var o = document.createElement("option");
        o.value = "saved:" + i; o.textContent = t.name;
        ogs.appendChild(o);
      });
      elTemplate.appendChild(ogs);
    }
  }

  function applyBuiltin(id) {
    var t = BUILTINS.filter(function (b) { return b.id === id; })[0];
    if (!t) return;
    // repartir d'un état neuf (hors format/photo) puis appliquer le patch
    var keepFormat = state.formatId, keepPhoto = state.photo;
    var fresh = freshState();
    PERSIST_KEYS.forEach(function (k) { state[k] = fresh[k]; });
    var patch = t.patch();
    Object.keys(patch).forEach(function (k) { state[k] = JSON.parse(JSON.stringify(patch[k])); });
    // précharger les icônes des compétences sélectionnées
    state.selectedSkills.forEach(function (key) { var sk = skillByKey(key); if (sk && sk.iconPath) getImage(sk.iconPath); });
    state.formatId = keepFormat; state.photo = keepPhoto;
    refreshAll();
  }

  function applySavedIndex(i) {
    var saved = loadSaved();
    if (!saved[i]) return;
    applySnapshot(saved[i].state);
    state.selectedSkills.forEach(function (key) { var sk = skillByKey(key); if (sk && sk.iconPath) getImage(sk.iconPath); });
    refreshAll();
  }

  function saveCurrent(asNew) {
    var saved = loadSaved();
    var sel = elTemplate.value;
    if (!asNew && sel.indexOf("saved:") === 0) {
      var idx = parseInt(sel.split(":")[1], 10);
      if (saved[idx]) { saved[idx].state = snapshot(); storeSaved(saved); setStatus(EN ? "Template updated ✓" : "Modèle mis à jour ✓"); return; }
    }
    var name = window.prompt(L.tpl.newName, EN ? "My template" : "Mon modèle");
    if (!name) return;
    saved.push({ name: name, state: snapshot() });
    storeSaved(saved);
    buildTemplateOptions();
    elTemplate.value = "saved:" + (saved.length - 1);
    setStatus(EN ? "Template saved ✓" : "Modèle enregistré ✓");
  }

  function deleteTemplate() {
    var sel = elTemplate.value;
    if (sel.indexOf("saved:") !== 0) return;
    var idx = parseInt(sel.split(":")[1], 10);
    var saved = loadSaved();
    if (!saved[idx]) return;
    saved.splice(idx, 1);
    storeSaved(saved);
    buildTemplateOptions();
    elTemplate.value = "";
    setStatus(EN ? "Template deleted" : "Modèle supprimé");
  }

  /* ── Liaisons ─────────────────────────────────────────────── */
  function bind() {
    elFormat.addEventListener("change", function () {
      state.formatId = elFormat.value;
      buildPresetOptions();
      draw();
    });
    elPreset.addEventListener("change", function () { state.preset = elPreset.value; draw(); });
    elTitle.addEventListener("input", function () { state.title = elTitle.value; draw(); });
    elSubtitle.addEventListener("input", function () { state.subtitle = elSubtitle.value; draw(); });
    elRole.addEventListener("input", function () { state.role = elRole.value; draw(); });
    elHandle.addEventListener("input", function () { state.handle = elHandle.value; draw(); });
    elBlueprint.addEventListener("change", function () { state.blueprint = elBlueprint.checked; draw(); });
    elIntensity.addEventListener("input", function () { state.intensity = elIntensity.value / 100; draw(); });
    document.querySelectorAll('input[name="accent"]').forEach(function (r) {
      r.addEventListener("change", function () { if (r.checked) { state.accent = r.value; draw(); } });
    });
    elProject.addEventListener("change", function () {
      state.projectId = parseInt(elProject.value, 10);
      var p = currentProject();
      if (p) { if (p.image) getImage(p.image); if (p.logo) getImage(p.logo); }
      draw();
    });
    elProjectMode.addEventListener("change", function () { state.projectMode = elProjectMode.value; draw(); });
    elPhoto.addEventListener("change", function () {
      var file = elPhoto.files && elPhoto.files[0];
      if (!file) return;
      var img = new Image();
      img.onload = function () {
        state.photo = img;
        // s'assurer que le bloc avatar est actif
        for (var i = 0; i < state.modules.length; i++) if (state.modules[i].id === "avatar") state.modules[i].on = true;
        buildModules();
        draw();
      };
      img.src = URL.createObjectURL(file);
    });
    elTemplate.addEventListener("change", function () {
      var v = elTemplate.value;
      if (v.indexOf("builtin:") === 0) applyBuiltin(v.split(":")[1]);
      else if (v.indexOf("saved:") === 0) applySavedIndex(parseInt(v.split(":")[1], 10));
    });
    elTplSave.addEventListener("click", function () { saveCurrent(false); });
    elTplSaveAs.addEventListener("click", function () { saveCurrent(true); });
    elTplDelete.addEventListener("click", deleteTemplate);
    document.getElementById("bg-download").addEventListener("click", exportCurrent);
    document.getElementById("bg-download-all").addEventListener("click", exportAll);
    document.getElementById("bg-reset").addEventListener("click", resetState);
  }

  function resetState() {
    var keepFormat = state.formatId, keepPhoto = state.photo;
    var fresh = freshState();
    Object.keys(fresh).forEach(function (k) { state[k] = fresh[k]; });
    state.formatId = keepFormat; state.photo = keepPhoto;
    elTemplate.value = "";
    refreshAll();
  }

  // Repousse tout l'état dans les contrôles + redessine.
  function refreshAll() {
    buildPresetOptions();
    buildModules();
    buildStats();
    buildSkills();
    if (state.projectId >= 0) elProject.value = state.projectId;
    elProjectMode.value = state.projectMode;
    syncControls();
    draw();
  }

  function syncControls() {
    elTitle.value = state.title;
    elSubtitle.value = state.subtitle;
    elRole.value = state.role;
    elHandle.value = state.handle;
    elBlueprint.checked = state.blueprint;
    elIntensity.value = Math.round(state.intensity * 100);
    var acc = document.querySelector('input[name="accent"][value="' + state.accent + '"]');
    if (acc) acc.checked = true;
  }

  /* ── Init ─────────────────────────────────────────────────── */
  function loadDefaultPhoto() {
    return new Promise(function (resolve) {
      if (!D.photo) { resolve(); return; }
      var img = new Image();
      img.onload = function () { state.photo = img; resolve(); };
      img.onerror = function () { state.photo = null; resolve(); };
      img.src = D.photo;
    });
  }

  function loadFonts() {
    if (!document.fonts || !document.fonts.load) return Promise.resolve();
    return Promise.all([
      document.fonts.load('700 48px "Space Grotesk"'),
      document.fonts.load('600 24px "Space Grotesk"'),
      document.fonts.load('500 24px "Inter"'),
      document.fonts.load('400 24px "Inter"')
    ]).catch(function () { });
  }

  function init() {
    buildFormatOptions();
    buildPresetOptions();
    buildModules();
    buildSkills();
    buildStats();
    buildProjectOptions();
    buildTemplateOptions();
    elProjectMode.value = state.projectMode;
    syncControls();
    bind();
    draw();
    Promise.all([loadFonts(), loadDefaultPhoto()]).then(draw);
  }

  init();
})();
