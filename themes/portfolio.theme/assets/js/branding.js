/* ============================================================
   Générateur de branding — moteur Canvas 2D natif (zéro dépendance)
   Reproduit la DA du site : glass/blur, halos, grille blueprint,
   dégradés cold→warm, typo Space Grotesk / Inter.
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

  /* ── État ─────────────────────────────────────────────────── */
  var D = window.BRANDING_DEFAULTS || {};
  var LANG = window.BRANDING_LANG === "en" ? "en" : "fr";
  var state = {
    formatId: FORMATS[0].id,
    preset: "centered",
    title: D.fullName || "Clément 'Clix' GARCIA",
    subtitle: D.speciality || "",
    role: (LANG === "en" ? "Software & Game Developer" : "Développeur logiciel & jeu vidéo"),
    handle: "@" + (D.discord || "clixmods"),
    accent: "cold",
    showPhoto: true,
    photo: null,
    blueprint: true,
    intensity: 1
  };

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
    // Dégradé bleu-nuit
    var base = ctx.createLinearGradient(0, 0, 0, h);
    base.addColorStop(0, THEME.bg2);
    base.addColorStop(0.4, THEME.bg);
    base.addColorStop(1, THEME.bg);
    ctx.fillStyle = base;
    ctx.fillRect(0, 0, w, h);

    // Halos radiaux (froid haut-gauche, chaud haut-droite, violet centre)
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

  function paintGrid(ctx, w, h, s) {
    // Grille rendue sur une couche offscreen puis fondue vers le bas,
    // afin de NE PAS éroder le fond déjà peint.
    var layer = document.createElement("canvas");
    layer.width = Math.round(w * s);
    layer.height = Math.round(h * s);
    var lc = layer.getContext("2d");
    lc.setTransform(s, 0, 0, s, 0, 0);
    var major = Math.max(60, Math.round(Math.min(w, h) / 8));
    var minor = major / 5;
    gridLines(lc, w, h, minor, THEME.gridMinor);
    gridLines(lc, w, h, major, THEME.grid);
    // fondu vers le bas (efface seulement les pixels de grille)
    lc.globalCompositeOperation = "destination-out";
    var fade = lc.createLinearGradient(0, 0, 0, h);
    fade.addColorStop(0, "rgba(0,0,0,0)");
    fade.addColorStop(0.6, "rgba(0,0,0,0.55)");
    fade.addColorStop(1, "rgba(0,0,0,1)");
    lc.fillStyle = fade;
    lc.fillRect(0, 0, w, h);
    lc.globalCompositeOperation = "source-over";
    // composite sur le canvas principal (à l'échelle logique)
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
    // Wireframe schématique simplifié (inspiré de blueprint-bg.html)
    ctx.save();
    ctx.strokeStyle = THEME.wire;
    ctx.globalAlpha = 0.5;
    ctx.lineWidth = 1.2 / s;
    var u = Math.min(w, h);
    // carte filaire (coin haut-gauche)
    var cx = w * 0.05, cy = h * 0.12, cw = u * 0.28, ch = u * 0.2;
    roundRect(ctx, cx, cy, cw, ch, 10 / s); ctx.stroke();
    ctx.setLineDash([4 / s, 4 / s]);
    roundRect(ctx, cx + cw * 0.08, cy + ch * 0.12, cw * 0.3, ch * 0.3, 6 / s); ctx.stroke();
    ctx.setLineDash([]);
    line(ctx, cx + cw * 0.45, cy + ch * 0.2, cx + cw * 0.9, cy + ch * 0.2);
    line(ctx, cx + cw * 0.45, cy + ch * 0.35, cx + cw * 0.82, cy + ch * 0.35);
    // cube filaire (coin haut-droite)
    ctx.globalAlpha = 0.4;
    var bx = w * 0.82, by = h * 0.1, bs = u * 0.14;
    poly(ctx, [[bx, by + bs * 0.6], [bx + bs * 0.8, by + bs * 0.2], [bx + bs * 2, by + bs * 0.6], [bx + bs * 1.2, by + bs]], true);
    poly(ctx, [[bx, by + bs * 0.6], [bx, by + bs * 1.6], [bx + bs * 1.2, by + bs * 2], [bx + bs * 1.2, by + bs]]);
    // cotes / dimension line (bas)
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
    // ombre portée
    ctx.shadowColor = "rgba(0,0,0,0.8)";
    ctx.shadowBlur = 60 / 1;
    ctx.shadowOffsetY = 24;
    roundRect(ctx, x, y, w, h, r);
    ctx.fillStyle = "rgba(8,11,22,0.15)";
    ctx.fill();
    ctx.restore();

    // Backdrop flouté réel : on reclippe le rect et on repeint le fond flou
    ctx.save();
    roundRect(ctx, x, y, w, h, r);
    ctx.clip();
    ctx.filter = "blur(" + (18 * s) + "px)";
    paintBackdrop(ctx, ctx.canvas.width / s, ctx.canvas.height / s, intensity);
    ctx.filter = "none";
    // teinte verre
    ctx.fillStyle = THEME.glassFill;
    ctx.fillRect(x, y, w, h);
    ctx.restore();

    // bordure + liseré sheen
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
    // anneau conique cold→warm
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
    // glow
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
      // monogramme
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

  /* ── Texte : titre dégradé, sous-titre, rôle, handle ──────── */
  // Réduit la taille de police jusqu'à ce que le texte tienne dans maxWidth.
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

  /* ── Presets ──────────────────────────────────────────────── */
  function renderPreset(ctx, fmt, s) {
    var w = fmt.w, h = fmt.h;
    var area = fmt.safe ? { w: fmt.safe.w, h: fmt.safe.h, x: (w - fmt.safe.w) / 2, y: (h - fmt.safe.h) / 2 } : { w: w, h: h, x: 0, y: 0 };
    var preset = state.preset;
    if (fmt.cat === "icon") return preset === "centered" ? presetIconCentered(ctx, fmt, s) : presetMonogram(ctx, fmt, s);
    if (preset === "left") return presetLeft(ctx, fmt, area, s);
    if (preset === "minimal") return presetMinimal(ctx, fmt, area, s);
    return presetCentered(ctx, fmt, area, s);
  }

  // Hauteur d'une pastille handle pour une taille de police donnée.
  function pillHeight(size) { return size + size * 0.55 * 2; }

  function presetCentered(ctx, fmt, a, s) {
    var u = Math.min(a.w, a.h);
    var vertical = fmt.cat === "vertical";
    var cx = a.x + a.w / 2;
    // panneau glass
    var pw = a.w * (vertical ? 0.84 : 0.82);
    var ph = a.h * (vertical ? 0.72 : 0.78);
    var px = a.x + (a.w - pw) / 2;
    var py = a.y + (a.h - ph) / 2;
    paintGlass(ctx, px, py, pw, ph, Math.min(u * 0.06, 34), s, state.intensity);

    var maxW = pw * 0.86;
    // Tailles (titre auto-ajusté à la largeur du panneau)
    var avatarR = state.showPhoto ? u * (vertical ? 0.11 : 0.14) : 0;
    var titleSize = fitFontSize(ctx, state.title, maxW, u * (vertical ? 0.072 : 0.1), "700", THEME.fontHead, -0.03);
    var roleSize = state.role ? fitFontSize(ctx, state.role, maxW, u * 0.044, "600", THEME.fontHead, 0) : 0;
    var subSize = state.subtitle ? fitFontSize(ctx, state.subtitle, maxW, u * 0.036, "400", THEME.fontBody, 0) : 0;
    var pillSize = u * 0.038;
    // Écarts
    var gAvatar = u * 0.05, gTitle = u * 0.05, gRole = u * 0.028, gPill = u * 0.055;

    // Hauteur totale du bloc → centrage vertical dans le panneau
    var total = 0;
    if (state.showPhoto) total += avatarR * 2 + gAvatar;
    total += titleSize;
    if (state.role) total += gTitle + roleSize;
    if (state.subtitle) total += gRole + subSize;
    total += gPill + pillHeight(pillSize);

    var y = py + (ph - total) / 2;
    if (state.showPhoto) { paintAvatar(ctx, cx, y + avatarR, avatarR, s); y += avatarR * 2 + gAvatar; }
    drawTitle(ctx, state.title, cx, y + titleSize, titleSize, "center", state.accent); y += titleSize;
    if (state.role) { y += gTitle; drawLine(ctx, state.role, cx, y + roleSize, roleSize, THEME.textSoft, "center", 600, THEME.fontHead, 0.01 * roleSize); y += roleSize; }
    if (state.subtitle) { y += gRole; drawLine(ctx, state.subtitle, cx, y + subSize, subSize, THEME.textDim, "center", 400); y += subSize; }
    y += gPill;
    drawHandlePill(ctx, state.handle, cx, y, pillSize, "center");
  }

  function presetLeft(ctx, fmt, a, s) {
    var u = Math.min(a.w, a.h);
    var pad = a.w * 0.06;
    var px = a.x + pad, py = a.y + a.h * 0.14;
    var pw = a.w - pad * 2, ph = a.h * 0.72;
    paintGlass(ctx, px, py, pw, ph, Math.min(u * 0.05, 30), s, state.intensity);

    var innerX = px + pw * 0.06;
    var avatarR = state.showPhoto ? u * 0.15 : 0;
    var textX = innerX + (state.showPhoto ? avatarR * 2 + u * 0.06 : 0);
    var maxW = px + pw - textX - pw * 0.06;

    var titleSize = fitFontSize(ctx, state.title, maxW, u * 0.1, "700", THEME.fontHead, -0.03);
    var roleSize = state.role ? fitFontSize(ctx, state.role, maxW, u * 0.042, "600", THEME.fontHead, 0) : 0;
    var subSize = state.subtitle ? fitFontSize(ctx, state.subtitle, maxW, u * 0.035, "400", THEME.fontBody, 0) : 0;
    var pillSize = u * 0.036;
    var gTitle = u * 0.045, gRole = u * 0.026, gPill = u * 0.05;

    var total = titleSize;
    if (state.role) total += gTitle + roleSize;
    if (state.subtitle) total += gRole + subSize;
    total += gPill + pillHeight(pillSize);

    // Avatar centré verticalement sur le panneau ; texte centré sur son propre bloc
    if (state.showPhoto) paintAvatar(ctx, innerX + avatarR, py + ph / 2, avatarR, s);
    var y = py + (ph - total) / 2;
    drawTitle(ctx, state.title, textX, y + titleSize, titleSize, "left", state.accent); y += titleSize;
    if (state.role) { y += gTitle; drawLine(ctx, state.role, textX, y + roleSize, roleSize, THEME.textSoft, "left", 600, THEME.fontHead); y += roleSize; }
    if (state.subtitle) { y += gRole; drawLine(ctx, state.subtitle, textX, y + subSize, subSize, THEME.textDim, "left", 400); y += subSize; }
    y += gPill;
    drawHandlePill(ctx, state.handle, textX, y, pillSize, "left");
  }

  function presetMinimal(ctx, fmt, a, s) {
    var u = Math.min(a.w, a.h);
    var cx = a.x + a.w / 2;
    var vertical = fmt.cat === "vertical";
    var maxW = a.w * 0.82;
    var titleSize = fitFontSize(ctx, state.title, maxW, u * (vertical ? 0.088 : 0.12), "700", THEME.fontHead, -0.03);
    var roleSize = state.role ? fitFontSize(ctx, state.role, maxW, u * 0.04, "600", THEME.fontHead, 0.02) : 0;
    var handleSize = u * 0.034;
    var gRole = u * 0.045, gHandle = u * 0.05;

    var total = titleSize;
    if (state.role) total += gRole + roleSize;
    total += gHandle + handleSize;

    var y = a.y + (a.h - total) / 2;
    drawTitle(ctx, state.title, cx, y + titleSize, titleSize, "center", state.accent); y += titleSize;
    if (state.role) { y += gRole; drawLine(ctx, state.role, cx, y + roleSize, roleSize, THEME.textSoft, "center", 600, THEME.fontHead, 0.02 * roleSize); y += roleSize; }
    y += gHandle;
    drawLine(ctx, state.handle, cx, y + handleSize, handleSize, THEME.textDim, "center", 500, THEME.fontMono);
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
    if (state.showPhoto) {
      paintAvatar(ctx, w / 2, h / 2, u * 0.36, s);
    } else {
      presetMonogram(ctx, fmt, s);
    }
  }

  /* ── Rendu global ─────────────────────────────────────────── */
  function render(ctx, fmt, s) {
    var w = fmt.w, h = fmt.h;
    ctx.canvas.width = Math.round(w * s);
    ctx.canvas.height = Math.round(h * s);
    ctx.setTransform(s, 0, 0, s, 0, 0);
    ctx.clearRect(0, 0, w, h);
    paintBackdrop(ctx, w, h, state.intensity);
    paintGrid(ctx, w, h, s);
    if (state.blueprint) paintBlueprint(ctx, w, h, s);
    renderPreset(ctx, fmt, s);
    // vignette
    ctx.save();
    var vg = ctx.createRadialGradient(w / 2, h * 0.1, Math.min(w, h) * 0.2, w / 2, h / 2, Math.max(w, h) * 0.75);
    vg.addColorStop(0.55, "rgba(0,0,0,0)");
    vg.addColorStop(1, "rgba(0,0,0,0.5)");
    ctx.fillStyle = vg;
    ctx.fillRect(0, 0, w, h);
    ctx.restore();
  }

  /* ── DOM refs ─────────────────────────────────────────────── */
  var canvas = document.getElementById("bg-canvas");
  var ctx = canvas.getContext("2d");
  var elFormat = document.getElementById("bg-format");
  var elPreset = document.getElementById("bg-preset");
  var elTitle = document.getElementById("bg-title");
  var elSubtitle = document.getElementById("bg-subtitle");
  var elRole = document.getElementById("bg-role");
  var elHandle = document.getElementById("bg-handle");
  var elShowPhoto = document.getElementById("bg-showphoto");
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
    setStatus(LANG === "en" ? "Exporting…" : "Export en cours…");
    function next() {
      if (i >= FORMATS.length) { setStatus(LANG === "en" ? "Done ✓" : "Terminé ✓"); return; }
      var fmt = FORMATS[i++];
      var off = renderOffscreen(fmt, s);
      var suffix = elRetina.checked ? "@2x" : "";
      downloadCanvas(off, "clixmods-" + fmt.id + suffix + ".png").then(function () {
        setStatus((LANG === "en" ? "Exported " : "Exporté ") + i + "/" + FORMATS.length);
        setTimeout(next, 280);
      });
    }
    next();
  }

  function setStatus(msg) { elStatus.textContent = msg; }

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
    elShowPhoto.addEventListener("change", function () { state.showPhoto = elShowPhoto.checked; draw(); });
    elBlueprint.addEventListener("change", function () { state.blueprint = elBlueprint.checked; draw(); });
    elIntensity.addEventListener("input", function () { state.intensity = elIntensity.value / 100; draw(); });
    document.querySelectorAll('input[name="accent"]').forEach(function (r) {
      r.addEventListener("change", function () { if (r.checked) { state.accent = r.value; draw(); } });
    });
    elPhoto.addEventListener("change", function () {
      var file = elPhoto.files && elPhoto.files[0];
      if (!file) return;
      var img = new Image();
      img.onload = function () { state.photo = img; state.showPhoto = true; elShowPhoto.checked = true; draw(); };
      img.src = URL.createObjectURL(file);
    });
    document.getElementById("bg-download").addEventListener("click", exportCurrent);
    document.getElementById("bg-download-all").addEventListener("click", exportAll);
    document.getElementById("bg-reset").addEventListener("click", resetState);
  }

  function resetState() {
    state.title = D.fullName || state.title;
    state.subtitle = D.speciality || "";
    state.role = LANG === "en" ? "Software & Game Developer" : "Développeur logiciel & jeu vidéo";
    state.handle = "@" + (D.discord || "clixmods");
    state.accent = "cold";
    state.intensity = 1; state.blueprint = true; state.showPhoto = true;
    syncControls();
    draw();
  }

  function syncControls() {
    elTitle.value = state.title;
    elSubtitle.value = state.subtitle;
    elRole.value = state.role;
    elHandle.value = state.handle;
    elShowPhoto.checked = state.showPhoto;
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
    ]).catch(function () {});
  }

  function init() {
    buildFormatOptions();
    buildPresetOptions();
    syncControls();
    bind();
    draw();
    Promise.all([loadFonts(), loadDefaultPhoto()]).then(draw);
  }

  init();
})();
