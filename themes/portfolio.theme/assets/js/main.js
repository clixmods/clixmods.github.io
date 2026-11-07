// Thème portfolio « Cadre » — interactions (vanilla JS)
// 1. Coque façon Arc / Zen : barre latérale, dossiers, espaces, onglets
//    réorganisables, clic droit (thème d'espace), recherche ⌘K, langue.
// 2. Fonctions des pages : filtres, cartes, témoignages, galerie, compétences.
(function () {
  "use strict";

  var d = document;
  var html = d.documentElement;
  var app = d.querySelector("[data-app]");
  var side = d.querySelector("[data-side]");
  var overlays = d.querySelector("[data-overlays]");
  if (!app || !side || !overlays) return;

  var lang = html.getAttribute("data-lang") || "fr";
  var space = html.getAttribute("data-space") || "home";
  var L = function (k) { return overlays.getAttribute("data-l-" + k) || ""; };
  var mqMobile = window.matchMedia("(max-width: 860px)");

  // ── Stockage (tolère un navigateur qui le refuse) ─────
  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} },
    del: function (k) { try { localStorage.removeItem(k); } catch (e) {} },
    json: function (k, fb) { try { return JSON.parse(localStorage.getItem(k) || "null") || fb; } catch (e) { return fb; } }
  };

  // ── Toast ─────────────────────────────────────────────
  var toastEl = overlays.querySelector("[data-toast]");
  var toastTimer;
  var toast = function (msg) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.hidden = true; }, 2200);
  };
  var copy = function (text, msg) {
    var done = function () { toast(msg); };
    try {
      navigator.clipboard.writeText(text).then(done, function () { toast(text); });
    } catch (e) { toast(text); }
  };

  // ── Barre latérale repliée (desktop) / tiroir (mobile) ─
  var scrim = d.querySelector("[data-scrim]");
  var setDrawer = function (open) {
    app.classList.toggle("is-drawer", open);
    if (scrim) scrim.hidden = !open;
    d.body.style.overflow = open ? "hidden" : "";
  };
  d.querySelectorAll("[data-sidebar-toggle]").forEach(function (b) {
    b.addEventListener("click", function () {
      var compact = html.classList.toggle("is-compact");
      store.set("cadre:compact", compact ? "1" : "0");
    });
  });
  d.querySelectorAll("[data-drawer-open]").forEach(function (b) {
    b.addEventListener("click", function () { setDrawer(true); });
  });
  if (scrim) scrim.addEventListener("click", function () { setDrawer(false); });

  // ── Dossiers ──────────────────────────────────────────
  var saveFolder = function (id, open) {
    var all = store.json("cadre:folders", {});
    all[id] = open;
    store.set("cadre:folders", JSON.stringify(all));
  };
  var setFolder = function (f, open, keep) {
    f.setAttribute("data-open", open ? "true" : "false");
    var btn = f.querySelector("[data-folder-toggle]");
    if (btn) btn.setAttribute("aria-expanded", open ? "true" : "false");
    if (!keep) saveFolder(f.getAttribute("data-folder"), open);
  };
  side.addEventListener("click", function (e) {
    var btn = e.target.closest("[data-folder-toggle]");
    if (!btn) return;
    var f = btn.closest("[data-folder]");
    setFolder(f, f.getAttribute("data-open") !== "true");
  });
  // Les filtres d'une page d'espace ouvrent le dossier correspondant.
  d.addEventListener("click", function (e) {
    var chip = e.target.closest("[data-folder-link]");
    if (!chip) return;
    var f = side.querySelector('[data-folder="' + chip.getAttribute("data-folder-link") + '"]');
    if (f && f.getAttribute("data-open") !== "true") setFolder(f, true);
  });

  // ── Onglet courant, espace affiché, défilement mémorisé ─
  var scroller = side.querySelector("[data-side-scroll]");
  var markCurrent = function () {
    side.querySelectorAll('a.tab[aria-current]').forEach(function (a) { a.removeAttribute("aria-current"); });
    var cur = null;
    side.querySelectorAll('[data-space-panel="' + space + '"] a.tab').forEach(function (a) {
      if (!cur && a.origin === location.origin && a.pathname === location.pathname) cur = a;
    });
    if (cur) {
      cur.setAttribute("aria-current", "page");
      // Le dossier (et ses parents) qui contient la page s'ouvre.
      for (var f = cur.parentElement.closest("[data-folder]"); f; f = f.parentElement.closest("[data-folder]")) {
        if (f.getAttribute("data-open") !== "true") setFolder(f, true, true);
      }
    }
    d.querySelectorAll("[data-space-link]").forEach(function (x) {
      if (x.getAttribute("data-space-link") === space) x.setAttribute("aria-current", "true");
      else x.removeAttribute("aria-current");
    });
    return cur;
  };
  var revealCurrent = function () {
    var cur = side.querySelector('a.tab[aria-current="page"]');
    if (!cur || !scroller) return;
    var r = cur.getBoundingClientRect();
    var s = scroller.getBoundingClientRect();
    if (r.top < s.top || r.bottom > s.bottom) cur.scrollIntoView({ block: "nearest" });
  };
  revealCurrent();
  window.addEventListener("pagehide", function () {
    try { if (scroller) sessionStorage.setItem("cadre:scroll:" + space, String(scroller.scrollTop)); } catch (e) {}
  });
  // Dernière page vue dans cet espace : on y revient en rechangeant d'espace.
  var rememberPage = function () { store.set("cadre:last:" + lang + ":" + space, location.pathname + location.search); };
  rememberPage();

  // ── Changer d'espace ──────────────────────────────────
  d.addEventListener("click", function (e) {
    var a = e.target.closest("[data-space-link]");
    if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    var id = a.getAttribute("data-space-link");
    if (id === space) return;
    // La barre latérale bascule tout de suite, la page suit.
    space = id;
    html.setAttribute("data-space", id);
    markCurrent();
    if (!side.contains(a)) setDrawer(false);
    navigate(store.get("cadre:last:" + lang + ":" + id) || a.getAttribute("href"), true);
  });

  // ── Onglets réorganisables (glisser-déposer) ──────────
  // Souris : on glisse dès 6 px de mouvement. Tactile : appui long (400 ms),
  // puis glisser ; un appui long relâché sans bouger ouvre le menu.
  var orderKey = function (box) { return "cadre:order:" + lang + ":" + box.getAttribute("data-sortable"); };
  // Les espaces existent en double (barre latérale + barre mobile) : même ordre.
  var mirrorSpaces = function (keys) {
    var m = d.querySelector("[data-space-order]");
    if (m) keys.forEach(function (k) { var el = m.querySelector('[data-sort-key="' + k + '"]'); if (el) m.appendChild(el); });
  };
  var saveOrder = function (box) {
    var keys = Array.prototype.map.call(box.children, function (k) { return k.getAttribute("data-sort-key"); }).filter(Boolean);
    store.set(orderKey(box), JSON.stringify(keys));
    if (box.getAttribute("data-sortable") === "spaces") mirrorSpaces(keys);
  };
  var drag = null;
  var suppressClick = false;

  var itemOf = function (el) {
    var it = el.closest("[data-sort-key]");
    return it && it.parentElement && it.parentElement.hasAttribute("data-sortable") ? it : null;
  };
  var startDrag = function () {
    drag.active = true;
    drag.item.classList.add("is-dragging");
    html.classList.add("is-sorting");
    if (drag.item.matches(".folder")) drag.item.querySelector(".folder-head").classList.add("is-dragging");
  };
  // Les onglets se rangent à la verticale, les espaces (data-sort-axis="x") à l'horizontale.
  var moveDrag = function (x, y) {
    var box = drag.item.parentElement;
    var kids = Array.prototype.filter.call(box.children, function (k) { return k !== drag.item && k.hasAttribute("data-sort-key"); });
    var before = null;
    for (var i = 0; i < kids.length; i++) {
      var r = (kids[i].matches(".folder") ? kids[i].querySelector(".folder-head") : kids[i]).getBoundingClientRect();
      if (drag.axisX ? x < r.left + r.width / 2 : y < r.top + r.height / 2) { before = kids[i]; break; }
    }
    if (before !== drag.item.nextElementSibling) box.insertBefore(drag.item, before);
  };
  var endDrag = function (cancelled) {
    if (!drag) return;
    clearTimeout(drag.timer);
    if (drag.active) {
      drag.item.classList.remove("is-dragging");
      var fh = drag.item.querySelector(".folder-head");
      if (fh) fh.classList.remove("is-dragging");
      html.classList.remove("is-sorting");
      suppressClick = true;
      setTimeout(function () { suppressClick = false; }, 0);
      if (!cancelled && drag.moved) saveOrder(drag.item.parentElement);
      else if (!cancelled && drag.touch) openMenu(drag.x, drag.y, drag.target);
    }
    drag = null;
  };

  side.addEventListener("pointerdown", function (e) {
    if (e.button !== 0) return;
    var item = itemOf(e.target);
    if (!item) return;
    // Appui dans le contenu d'un dossier, hors d'un onglet : on ne déplace pas le dossier.
    var inner = e.target.closest(".folder-inner");
    if (inner && item.matches(".folder") && item.contains(inner)) return;
    var touch = e.pointerType !== "mouse";
    var axisX = item.parentElement.getAttribute("data-sort-axis") === "x";
    drag = { item: item, target: e.target, x: e.clientX, y: e.clientY, y0: e.clientY, active: false, moved: false, touch: touch, id: e.pointerId, axisX: axisX };
    if (touch) {
      drag.timer = setTimeout(function () {
        if (!drag) return;
        startDrag();
        if (navigator.vibrate) { try { navigator.vibrate(8); } catch (err) {} }
      }, 400);
    }
  });
  window.addEventListener("pointermove", function (e) {
    if (!drag || e.pointerId !== drag.id) return;
    var dy = Math.abs(e.clientY - drag.y0);
    var dx = Math.abs(e.clientX - drag.x);
    if (!drag.active) {
      // Tactile : bouger avant l'appui long = défiler, pas glisser.
      if (drag.touch) { if (dy > 8 || dx > 8) { clearTimeout(drag.timer); drag = null; } return; }
      if ((drag.axisX ? dx : dy) < 6) return;
      startDrag();
    }
    drag.moved = true;
    moveDrag(e.clientX, e.clientY);
  });
  window.addEventListener("pointerup", function (e) { if (drag && e.pointerId === drag.id) endDrag(false); });
  window.addEventListener("pointercancel", function () { endDrag(true); });
  // Pendant un glisser tactile, la page ne doit pas défiler.
  side.addEventListener("touchmove", function (e) { if (drag && drag.active) e.preventDefault(); }, { passive: false });
  side.addEventListener("click", function (e) {
    if (suppressClick) { e.preventDefault(); e.stopPropagation(); }
  }, true);
  side.addEventListener("dragstart", function (e) { if (e.target.closest(".tab, .sp")) e.preventDefault(); });

  var resetBox = function (box) {
    store.del(orderKey(box));
    var orig = [];
    try { orig = JSON.parse(box.getAttribute("data-orig") || "[]"); } catch (e) {}
    var kids = {};
    Array.prototype.forEach.call(box.children, function (k) { if (k.dataset.sortKey) kids[k.dataset.sortKey] = k; });
    orig.forEach(function (key) { if (kids[key]) box.appendChild(kids[key]); });
    if (box.getAttribute("data-sortable") === "spaces") mirrorSpaces(orig);
  };
  // spaceId = "spaces" : rétablit l'ordre des espaces eux-mêmes.
  var resetOrder = function (spaceId) {
    if (spaceId === "spaces") {
      var sw = side.querySelector('[data-sortable="spaces"]');
      if (sw) resetBox(sw);
      return;
    }
    var panel = side.querySelector('[data-space-panel="' + spaceId + '"]');
    if (panel) panel.querySelectorAll("[data-sortable]").forEach(resetBox);
  };

  // ── Menu contextuel (clic droit / appui long) ─────────
  var menu = overlays.querySelector("[data-ctx-menu]");
  // Icônes Ionicons rendues par Hugo (gabarit dans overlays.html)
  var ICON = {};
  var icoTpl = overlays.querySelector("[data-icons]");
  if (icoTpl) {
    Array.prototype.forEach.call(icoTpl.content.querySelectorAll("[data-i]"), function (n) { ICON[n.getAttribute("data-i")] = n.innerHTML; });
  }
  var closeMenu = function () { if (menu) menu.hidden = true; };
  var place = function (el, x, y) {
    el.hidden = false;
    var w = el.offsetWidth, h = el.offsetHeight;
    var vw = window.innerWidth, vh = window.innerHeight;
    el.style.left = Math.max(8, Math.min(x, vw - w - 8)) + "px";
    el.style.top = Math.max(8, Math.min(y, vh - h - 8)) + "px";
  };
  var openMenu = function (x, y, target) {
    if (!menu) return;
    var items = [];
    var tab = target && target.closest ? target.closest("a.tab") : null;
    var mail = target && target.closest ? target.closest("[data-email]") : null;
    var spBtn = target && target.closest ? target.closest("[data-space-link]") : null;
    var themeSpace = spBtn ? spBtn.getAttribute("data-space-link") : html.getAttribute("data-space");
    if (tab) {
      items.push({ icon: ICON.open, label: L("new-tab"), run: function () { window.open(tab.href, "_blank", "noopener"); } });
      items.push({ icon: ICON.link, label: L("copy-link"), run: function () { copy(tab.href, L("link-copied")); } });
      items.push("sep");
    }
    if (mail) {
      items.push({ icon: ICON.mail, label: L("copy-email"), run: function () { copy(mail.getAttribute("data-email"), L("email-copied")); } });
      items.push("sep");
    }
    items.push({ icon: ICON.palette, label: L("theme"), run: function () { openTheme(themeSpace, x, y); } });
    items.push({ icon: ICON.reset, label: L("reset-order"), run: function () { resetOrder(spBtn ? "spaces" : themeSpace); } });
    menu.innerHTML = "";
    items.forEach(function (it) {
      if (it === "sep") { var s = d.createElement("div"); s.className = "pop-sep"; menu.appendChild(s); return; }
      var b = d.createElement("button");
      b.type = "button";
      b.className = "pop-item";
      b.setAttribute("role", "menuitem");
      b.innerHTML = it.icon + "<span></span>";
      b.querySelector("span").textContent = it.label;
      b.addEventListener("click", function () { closeMenu(); it.run(); });
      menu.appendChild(b);
    });
    var note = d.createElement("p");
    note.className = "pop-note";
    note.textContent = L("hint");
    menu.appendChild(note);
    place(menu, x, y);
    var first = menu.querySelector("button");
    if (first) first.focus({ preventScroll: true });
  };
  [side, d.querySelector(".m-switch")].forEach(function (zone) {
    if (!zone) return;
    zone.addEventListener("contextmenu", function (e) {
      // Les champs et la recherche gardent le menu natif.
      if (e.target.closest("input, textarea")) return;
      e.preventDefault();
      if (drag && drag.touch) return; // l'appui long tactile gère son propre menu
      openMenu(e.clientX, e.clientY, e.target);
    });
  });

  // ── Éditeur de thème d'espace ─────────────────────────
  var themePop = overlays.querySelector("[data-theme-pop]");
  var DEFAULTS = {
    home: { a: "#cfd8f6", b: "#f3d3da", accent: "#3f5bd8" },
    jeux: { a: "#e2d4f4", b: "#f6d6e2", accent: "#7a3fc4" },
    web: { a: "#d3e6dc", b: "#ece8d2", accent: "#2f7d5b" },
    mods: { a: "#f2e0c8", b: "#efd5cf", accent: "#b0552c" }
  };
  var PRESETS = [
    { a: "#cfd8f6", b: "#f3d3da", accent: "#3f5bd8" },
    { a: "#e2d4f4", b: "#f6d6e2", accent: "#7a3fc4" },
    { a: "#d3e6dc", b: "#ece8d2", accent: "#2f7d5b" },
    { a: "#f2e0c8", b: "#efd5cf", accent: "#b0552c" },
    { a: "#cde7ef", b: "#d8e0f6", accent: "#1f6f8b" },
    { a: "#f6d3cf", b: "#f3e3c4", accent: "#c0392b" },
    { a: "#dff0c8", b: "#cfe9e1", accent: "#4b7d1f" },
    { a: "#f4d6ea", b: "#dcd3f4", accent: "#b03a87" },
    { a: "#e4e5ea", b: "#d7d9e0", accent: "#2b2f3a" },
    { a: "#f7ebc3", b: "#f2d6c9", accent: "#a06a00" },
    { a: "#d4dcf0", b: "#c9e6e6", accent: "#355c9e" },
    { a: "#ece1d6", b: "#e2d9e9", accent: "#7a5537" }
  ];
  var applyTheme = function (id, v) {
    var st = html.style;
    ["a", "b", "accent"].forEach(function (k) {
      var light = "--th-" + id + "-" + k, dark = "--thd-" + id + "-" + k;
      if (v && v[k]) {
        st.setProperty(light, v[k]);
        st.setProperty(dark, k === "accent"
          ? "color-mix(in oklab, " + v[k] + " 62%, #ffffff)"
          : "color-mix(in oklab, " + v[k] + " 24%, #121318)");
      } else { st.removeProperty(light); st.removeProperty(dark); }
    });
  };
  var themeSpaceId = null;
  var themeInputs = themePop ? {
    a: themePop.querySelector("[data-theme-a]"),
    b: themePop.querySelector("[data-theme-b]"),
    accent: themePop.querySelector("[data-theme-accent]")
  } : null;
  var currentTheme = function (id) {
    var all = store.json("cadre:themes", {});
    var base = DEFAULTS[id] || DEFAULTS.home;
    var v = all[id] || {};
    return { a: v.a || base.a, b: v.b || base.b, accent: v.accent || base.accent };
  };
  var saveTheme = function (id, v) {
    var all = store.json("cadre:themes", {});
    if (v) all[id] = v; else delete all[id];
    store.set("cadre:themes", JSON.stringify(all));
    applyTheme(id, v);
  };
  var syncThemeUI = function () {
    if (!themePop || !themeSpaceId) return;
    var v = currentTheme(themeSpaceId);
    Object.keys(themeInputs).forEach(function (k) { if (themeInputs[k]) themeInputs[k].value = v[k]; });
    var prev = themePop.querySelector("[data-theme-preview]");
    if (prev) {
      prev.style.setProperty("--frame-a", "var(--sp-" + themeSpaceId + "-a)");
      prev.style.setProperty("--frame-b", "var(--sp-" + themeSpaceId + "-b)");
      prev.style.setProperty("--accent", "var(--sp-" + themeSpaceId + "-accent)");
    }
    themePop.querySelectorAll(".theme-preset").forEach(function (b, i) {
      var p = PRESETS[i];
      b.setAttribute("aria-pressed", p.a === v.a && p.b === v.b && p.accent === v.accent ? "true" : "false");
    });
  };
  var openTheme = function (id, x, y) {
    if (!themePop) return;
    themeSpaceId = id;
    var sp = d.querySelector('.side [data-space-link="' + id + '"]');
    var ico = themePop.querySelector("[data-theme-ico]");
    if (ico) ico.innerHTML = sp ? sp.innerHTML : "";
    var name = themePop.querySelector("[data-theme-name]");
    if (name) name.textContent = sp ? sp.getAttribute("title") : "";
    themePop.style.setProperty("--accent", "var(--sp-" + id + "-accent)");
    syncThemeUI();
    place(themePop, x, y);
  };
  if (themePop) {
    var presetBox = themePop.querySelector("[data-theme-presets]");
    PRESETS.forEach(function (p, i) {
      var b = d.createElement("button");
      b.type = "button";
      b.className = "theme-preset";
      b.style.background = "linear-gradient(135deg, " + p.a + " 0 50%, " + p.b + " 50% 100%)";
      b.style.boxShadow = "inset 0 0 0 5px transparent, inset 0 -6px 0 -1px " + p.accent;
      b.setAttribute("aria-label", "Teinte " + (i + 1));
      b.addEventListener("click", function () { saveTheme(themeSpaceId, { a: p.a, b: p.b, accent: p.accent }); syncThemeUI(); });
      presetBox.appendChild(b);
    });
    Object.keys(themeInputs).forEach(function (k) {
      var input = themeInputs[k];
      if (!input) return;
      input.addEventListener("input", function () {
        var v = currentTheme(themeSpaceId);
        v[k] = input.value;
        saveTheme(themeSpaceId, v);
        syncThemeUI();
      });
    });
    themePop.querySelector("[data-theme-reset]").addEventListener("click", function () { saveTheme(themeSpaceId, null); syncThemeUI(); });
    themePop.querySelector("[data-theme-close]").addEventListener("click", function () { themePop.hidden = true; });
  }

  // ── Langue (bouton dans la barre d'adresse, remplacée à chaque page) ─
  d.addEventListener("click", function (e) {
    var btn = e.target.closest("[data-lang-toggle]");
    if (!btn) return;
    var pop = btn.parentElement.querySelector("[data-lang-pop]");
    if (!pop) return;
    var open = pop.hidden;
    d.querySelectorAll("[data-lang-pop]").forEach(function (p) { p.hidden = true; });
    d.querySelectorAll("[data-lang-toggle]").forEach(function (b) { b.setAttribute("aria-expanded", "false"); });
    pop.hidden = !open;
    btn.setAttribute("aria-expanded", open ? "true" : "false");
    if (open) { var a = pop.querySelector("a"); if (a) a.focus({ preventScroll: true }); }
  });

  // Fermeture des menus au clic extérieur / Échap
  d.addEventListener("pointerdown", function (e) {
    if (menu && !menu.hidden && !menu.contains(e.target)) closeMenu();
    if (themePop && !themePop.hidden && !themePop.contains(e.target) && !(menu && menu.contains(e.target))) themePop.hidden = true;
    if (!e.target.closest("[data-lang-box]")) {
      d.querySelectorAll("[data-lang-pop]").forEach(function (p) { p.hidden = true; });
      d.querySelectorAll("[data-lang-toggle]").forEach(function (b) { b.setAttribute("aria-expanded", "false"); });
    }
  });

  // ── Recherche ⌘K ──────────────────────────────────────
  var pal = overlays.querySelector("[data-palette]");
  var palInput = pal && pal.querySelector("input");
  var palList = pal && pal.querySelector(".palette-list");
  var palEmpty = pal && pal.querySelector("[data-palette-empty]");
  var index = null, shown = [], sel = 0;
  var norm = function (s) { return (s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, ""); };
  var buildIndex = function () {
    var seen = {};
    index = [];
    side.querySelectorAll("[data-space-panel]").forEach(function (panel) {
      var spName = panel.getAttribute("aria-label");
      panel.querySelectorAll("a.tab").forEach(function (a) {
        if (seen[a.href]) return;
        seen[a.href] = true;
        var folder = a.closest("[data-folder]");
        var kind = spName + (folder ? " · " + folder.querySelector(".folder-head .tab-title").textContent : "");
        var title = a.querySelector(".tab-title").textContent;
        index.push({ title: title, kind: kind, href: a.href, ext: a.target === "_blank", ico: a.querySelector(".tab-ico").innerHTML, key: norm(title + " " + kind) });
      });
    });
  };
  var renderPal = function () {
    var words = norm(palInput.value.trim()).split(/\s+/).filter(Boolean);
    shown = index.filter(function (it) { return words.every(function (w) { return it.key.indexOf(w) > -1; }); }).slice(0, 60);
    if (sel >= shown.length) sel = Math.max(shown.length - 1, 0);
    palList.innerHTML = "";
    shown.forEach(function (it, i) {
      var li = d.createElement("li");
      li.className = "palette-item";
      li.id = "pal-" + i;
      li.setAttribute("role", "option");
      li.setAttribute("aria-selected", i === sel ? "true" : "false");
      li.innerHTML = '<span class="tab-ico">' + it.ico + '</span><span class="tab-title"></span><span class="palette-kind"></span>';
      li.querySelector(".tab-title").textContent = it.title;
      li.querySelector(".palette-kind").textContent = it.kind;
      li.addEventListener("click", function () { closePal(); openItem(it); });
      li.addEventListener("mousemove", function () { if (sel !== i) { sel = i; markPal(); } });
      palList.appendChild(li);
    });
    palEmpty.hidden = shown.length > 0;
    palInput.setAttribute("aria-activedescendant", shown.length ? "pal-" + sel : "");
  };
  var markPal = function () {
    palList.querySelectorAll(".palette-item").forEach(function (li, i) { li.setAttribute("aria-selected", i === sel ? "true" : "false"); });
    var cur = palList.children[sel];
    if (cur) cur.scrollIntoView({ block: "nearest" });
    palInput.setAttribute("aria-activedescendant", shown.length ? "pal-" + sel : "");
  };
  // Un résultat externe (site qui refuse l'intégration) s'ouvre à part.
  var openItem = function (it) {
    if (it.ext) window.open(it.href, "_blank", "noopener");
    else navigate(it.href, true);
  };
  var lastFocus = null;
  var openPal = function () {
    if (!pal) return;
    if (!index) buildIndex();
    lastFocus = d.activeElement;
    setDrawer(false);
    pal.hidden = false;
    palInput.value = "";
    sel = 0;
    renderPal();
    palInput.focus();
  };
  var closePal = function () {
    if (!pal || pal.hidden) return;
    pal.hidden = true;
    if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
  };
  if (pal) {
    d.addEventListener("click", function (e) { if (e.target.closest("[data-palette-open]")) openPal(); });
    palInput.addEventListener("input", function () { sel = 0; renderPal(); });
    palInput.addEventListener("keydown", function (e) {
      if (e.key === "ArrowDown") { e.preventDefault(); sel = Math.min(sel + 1, shown.length - 1); markPal(); }
      else if (e.key === "ArrowUp") { e.preventDefault(); sel = Math.max(sel - 1, 0); markPal(); }
      else if (e.key === "Enter" && shown[sel]) { e.preventDefault(); var go = shown[sel]; closePal(); openItem(go); }
    });
    pal.addEventListener("click", function (e) { if (e.target === pal) closePal(); });
  }

  d.addEventListener("keydown", function (e) {
    if ((e.metaKey || e.ctrlKey) && !e.altKey && e.key.toLowerCase() === "k") {
      e.preventDefault();
      if (pal && pal.hidden) openPal(); else closePal();
      return;
    }
    if (e.key === "Escape") {
      closePal();
      closeMenu();
      if (themePop) themePop.hidden = true;
      setDrawer(false);
      d.querySelectorAll("[data-lang-pop]").forEach(function (p) { p.hidden = true; });
    }
  });

  // ── Largeur de la barre latérale (poignée sur son bord droit) ─
  // Glisser pour ajuster, double-clic pour revenir à la largeur d'origine.
  var grip = side.querySelector("[data-side-resize]");
  if (grip) {
    var MIN_W = 200, MAX_W = 480;
    var rs = null;
    grip.addEventListener("pointerdown", function (e) {
      if (e.button !== 0 || mqMobile.matches) return;
      e.preventDefault();
      rs = { x: e.clientX, w: side.getBoundingClientRect().width, id: e.pointerId };
      try { grip.setPointerCapture(e.pointerId); } catch (err) {}
      html.classList.add("is-resizing");
    });
    grip.addEventListener("pointermove", function (e) {
      if (!rs || e.pointerId !== rs.id) return;
      var w = Math.round(Math.max(MIN_W, Math.min(MAX_W, rs.w + e.clientX - rs.x)));
      html.style.setProperty("--side-w", w + "px");
      rs.last = w;
    });
    var endResize = function () {
      if (!rs) return;
      if (rs.last) store.set("cadre:width", String(rs.last));
      rs = null;
      html.classList.remove("is-resizing");
    };
    grip.addEventListener("pointerup", endResize);
    grip.addEventListener("pointercancel", endResize);
    grip.addEventListener("dblclick", function () {
      html.style.removeProperty("--side-w");
      store.del("cadre:width");
    });
  }

  // ── Navigation sans rechargement ──────────────────────
  // Comme dans un vrai navigateur, seule la page (la feuille) change : la
  // barre latérale garde son état (défilement, dossiers, survol). La page
  // suivante est récupérée en fetch, son <main>, son fil d'Ariane et sa barre
  // d'adresse remplacent ceux en place, puis les fonctions de page repartent.
  // Tout ce qui n'est pas une page HTML du site, dans la même langue, part en
  // navigation classique.
  var pages = {}, pageKeys = [];
  var keyOf = function (url) { return url.split("#")[0]; };
  var fetchPage = function (url) {
    var k = keyOf(url);
    if (!pages[k]) {
      pages[k] = fetch(k, { credentials: "same-origin" }).then(function (r) {
        if (!r.ok || (r.headers.get("content-type") || "").indexOf("text/html") < 0) throw new Error("not-a-page");
        return r.text();
      });
      pages[k].catch(function () { delete pages[k]; });
      pageKeys.push(k);
      if (pageKeys.length > 24) delete pages[pageKeys.shift()];
    }
    return pages[k];
  };
  var softLink = function (a) {
    if (!a || !a.href || a.hasAttribute("download") || a.hasAttribute("data-lightbox")) return false;
    if (a.target && a.target !== "_self") return false;
    if (a.origin !== location.origin || !/^https?:$/.test(a.protocol)) return false;
    if (a.hasAttribute("hreflang") && a.getAttribute("hreflang") !== lang) return false;
    if (/\.[a-z0-9]{2,5}$/i.test(a.pathname) && !/\.html?$/i.test(a.pathname)) return false;
    if (a.closest("[data-no-soft]")) return false;
    return true;
  };
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  var navSeq = 0;
  var loadTimer;
  var saveScroll = function () {
    try { history.replaceState({ cadre: 1, y: window.scrollY }, ""); } catch (e) {}
  };
  var swapNode = function (sel, doc, all) {
    var olds = d.querySelectorAll(sel), news = doc.querySelectorAll(sel);
    for (var i = 0; i < olds.length && i < news.length; i++) {
      olds[i].replaceWith(d.adoptNode(news[i]));
      if (!all) break;
    }
  };
  var syncHead = function (doc) {
    d.title = doc.title;
    ['meta[name="description"]', 'link[rel="canonical"]', 'meta[property="og:title"]', 'meta[property="og:description"]', 'meta[property="og:url"]'].forEach(function (sel) {
      var o = d.head.querySelector(sel), n = doc.head.querySelector(sel);
      if (o && n) o.replaceWith(d.adoptNode(n));
      else if (o) o.remove();
      else if (n) d.head.appendChild(d.adoptNode(n));
    });
    d.head.querySelectorAll('link[rel="alternate"][hreflang]').forEach(function (l) { l.remove(); });
    doc.head.querySelectorAll('link[rel="alternate"][hreflang]').forEach(function (l) { d.head.appendChild(d.adoptNode(l)); });
  };
  var currentPath = location.pathname + location.search;

  var navigate = function (url, push, restoreY) {
    var seq = ++navSeq;
    if (push) saveScroll();
    clearTimeout(loadTimer);
    loadTimer = setTimeout(function () { html.classList.add("is-loading"); }, 120);
    var done = function () { clearTimeout(loadTimer); html.classList.remove("is-loading"); };
    fetchPage(url).then(function (text) {
      if (seq !== navSeq) return;
      var doc = new DOMParser().parseFromString(text, "text/html");
      var nh = doc.documentElement;
      var main = doc.getElementById("main");
      if (!main || !doc.querySelector("[data-app]") || nh.getAttribute("data-lang") !== lang) { location.href = url; return; }
      var swap = function () {
        if (push) { try { history.pushState({ cadre: 1, y: 0 }, "", url); } catch (e) { location.href = url; return; } }
        currentPath = location.pathname + location.search;
        if (window.CadrePage) window.CadrePage.destroy();
        syncHead(doc);
        space = nh.getAttribute("data-space") || "home";
        html.setAttribute("data-space", space);
        html.setAttribute("data-kind", nh.getAttribute("data-kind") || "page");
        if (nh.lang) html.lang = nh.lang;
        swapNode("#main", doc);
        swapNode(".crumb", doc);
        swapNode("[data-urlrow]", doc, true);
        markCurrent();
        revealCurrent();
        rememberPage();
        closeMenu();
        setDrawer(false);
        var target = location.hash ? d.getElementById(decodeURIComponent(location.hash.slice(1))) : null;
        if (restoreY != null) window.scrollTo(0, restoreY);
        else if (target) target.scrollIntoView();
        else window.scrollTo(0, 0);
        if (window.CadrePage) window.CadrePage.init();
        var m = d.getElementById("main");
        if (m) { m.setAttribute("tabindex", "-1"); m.focus({ preventScroll: true }); }
      };
      if (d.startViewTransition && !reduceMotion.matches) {
        var vt = d.startViewTransition(swap);
        vt.finished.then(done, done);
      } else { swap(); done(); }
    }).catch(function () { if (seq === navSeq) location.href = url; });
  };

  // Une fois qu'on navigue nous-mêmes, le navigateur ne doit plus restaurer
  // le défilement de son côté (on le fait à partir de history.state).
  try {
    if (!history.state) history.replaceState({ cadre: 1, y: window.scrollY }, "");
    history.scrollRestoration = "manual";
  } catch (e) {}
  window.addEventListener("popstate", function (e) {
    // Simple changement d'ancre (#…) sur la même page : rien à recharger.
    if (location.pathname + location.search === currentPath) return;
    navigate(location.href, false, e.state && typeof e.state.y === "number" ? e.state.y : 0);
  });
  d.addEventListener("click", function (e) {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    var a = e.target.closest("a");
    if (!softLink(a)) return;
    // Ancre dans la page courante : le navigateur s'en charge.
    if (a.pathname + a.search === location.pathname + location.search && a.hash) return;
    e.preventDefault();
    if (a.href === location.href) { window.scrollTo({ top: 0, behavior: "smooth" }); return; }
    navigate(a.href, true);
  });
  // Préchargement au survol (et au toucher) : la page suivante est souvent
  // déjà là au moment du clic.
  var hoverTimer, hoverLink;
  d.addEventListener("mouseover", function (e) {
    var a = e.target.closest && e.target.closest("a");
    if (a === hoverLink) return;
    hoverLink = a;
    clearTimeout(hoverTimer);
    if (!softLink(a) || keyOf(a.href) === keyOf(location.href)) return;
    hoverTimer = setTimeout(function () { fetchPage(a.href).catch(function () {}); }, 70);
  });
  d.addEventListener("touchstart", function (e) {
    var a = e.target.closest && e.target.closest("a");
    if (softLink(a) && keyOf(a.href) !== keyOf(location.href)) fetchPage(a.href).catch(function () {});
  }, { passive: true });
})();

// Les fonctions des pages sont relancées à chaque changement de page (la
// coque ne se recharge pas) : window.CadrePage.init() / destroy(). Les
// écouteurs posés sur document/window passent par sig() pour être retirés,
// les minuteurs et observateurs s'enregistrent dans cleanups.
(function () {
  "use strict";
  var ctl = null;
  var cleanups = [];
  var sig = function (o) { var r = o || {}; if (ctl) r.signal = ctl.signal; return r; };
  var destroy = function () {
    if (ctl) ctl.abort();
    ctl = null;
    cleanups.splice(0).forEach(function (f) { try { f(); } catch (e) {} });
    document.body.style.overflow = "";
  };
  var init = function () {
  destroy();
  ctl = typeof AbortController === "function" ? new AbortController() : null;

  // ── Barres de filtres génériques (facettes) ───────────────
  // Contrat de markup :
  //   <div class="filter-bar" data-filter-bar="ID"
  //        data-filter-items="[data-project]" [data-filter-hash="main"]>
  //     <div data-facet-row="main" data-facet-default="all" [data-facet-mode="multi"]>
  //       <button data-facet="main" data-value="app">…<span data-facet-count></span></button>
  //   <div data-filter-group="ID"> … éléments filtrables … </div>
  //   <p data-filter-empty="ID" hidden>…</p>
  // Chaque élément filtrable porte data-facet-<nom>="v1 v2" ; la valeur
  // réservée « all » signifie « pas de contrainte ». Les facettes simples sont
  // indépendantes : changer d'onglet ne réinitialise pas le périmètre.
  document.querySelectorAll("[data-filter-bar]").forEach(function (bar) {
    var id = bar.getAttribute("data-filter-bar");
    var itemSel = bar.getAttribute("data-filter-items") || "[data-project]";
    var items = [];
    document.querySelectorAll('[data-filter-group="' + id + '"]').forEach(function (g) {
      items = items.concat(Array.prototype.slice.call(g.querySelectorAll(itemSel)));
    });
    var chips = Array.prototype.slice.call(bar.querySelectorAll("[data-facet][data-value]"));
    if (!items.length || !chips.length) return;

    var modes = {};    // facette -> "single" | "multi"
    var defaults = {}; // facette -> valeur par défaut (string) ou [] (multi)
    var state = {};
    var initialized = false;

    bar.querySelectorAll("[data-facet-row]").forEach(function (row) {
      var f = row.getAttribute("data-facet-row");
      var multi = row.getAttribute("data-facet-mode") === "multi";
      modes[f] = multi ? "multi" : "single";
      defaults[f] = multi ? [] : (row.getAttribute("data-facet-default") || "all");
    });
    // Filet de sécurité : facette déclarée seulement sur les puces
    chips.forEach(function (c) {
      var f = c.getAttribute("data-facet");
      if (!(f in modes)) { modes[f] = "single"; defaults[f] = "all"; }
    });
    Object.keys(defaults).forEach(function (f) {
      state[f] = modes[f] === "multi" ? defaults[f].slice() : defaults[f];
    });

    var emptyEl = document.querySelector('[data-filter-empty="' + id + '"]');
    // Regroupements affichés en dur (ex. Pro / Perso) : leur en-tête doit
    // disparaître quand aucun de leurs éléments ne passe les filtres.
    var sections = Array.prototype.slice.call(
      document.querySelectorAll('[data-filter-section="' + id + '"]')
    );
    var advToggleEl = bar.querySelector("[data-adv-toggle]");
    var advPanel = bar.querySelector("[data-adv-panel]");
    var advCountEl = bar.querySelector("[data-adv-count]");
    var resetBtn = bar.querySelector("[data-filter-reset]");
    var hashFacet = bar.getAttribute("data-filter-hash");

    var tokens = function (el, f) {
      return (el.getAttribute("data-facet-" + f) || "").split(/\s+/).filter(Boolean);
    };
    var hasValue = function (el, f, v) {
      return v === "all" || tokens(el, f).indexOf(v) > -1;
    };
    var isSelected = function (f, v) {
      return modes[f] === "multi" ? state[f].indexOf(v) > -1 : state[f] === v;
    };

    // L'élément passe-t-il tous les filtres ? `skip` permet d'ignorer une
    // facette — c'est la base des compteurs « facettés ».
    var matches = function (el, skip) {
      for (var f in state) {
        if (f === skip) continue;
        var sel = state[f];
        if (modes[f] === "multi") {
          var tk = tokens(el, f);
          for (var i = 0; i < sel.length; i++) {
            if (tk.indexOf(sel[i]) < 0) return false;
          }
        } else if (sel && sel !== "all" && !hasValue(el, f, sel)) {
          return false;
        }
      }
      return true;
    };

    // Compteurs dynamiques : chaque puce affiche le nombre de résultats qu'elle
    // donnerait compte tenu des AUTRES facettes. Une puce à 0 est grisée et
    // désactivée — sauf si elle est active, sinon on ne pourrait plus revenir.
    var updateCounts = function () {
      chips.forEach(function (chip) {
        var f = chip.getAttribute("data-facet");
        var v = chip.getAttribute("data-value");
        // Facette multi (ET logique) : on conserve ses propres sélections.
        var skip = modes[f] === "multi" ? null : f;
        var n = 0;
        items.forEach(function (el) {
          if (matches(el, skip) && hasValue(el, f, v)) n++;
        });
        var out = chip.querySelector("[data-facet-count]");
        if (out) out.textContent = n;
        var dead = n === 0 && !isSelected(f, v);
        chip.classList.toggle("is-empty", dead);
        chip.disabled = dead;
      });
    };

    var updateIndicators = function () {
      var nMulti = 0;
      Object.keys(modes).forEach(function (f) {
        if (modes[f] === "multi") nMulti += state[f].length;
      });
      if (advCountEl) {
        advCountEl.textContent = nMulti;
        advCountEl.hidden = nMulti === 0;
      }
      if (advToggleEl) advToggleEl.classList.toggle("active", nMulti > 0);
      var dirty = Object.keys(state).some(function (f) {
        return modes[f] === "multi" ? state[f].length > 0 : state[f] !== defaults[f];
      });
      if (resetBtn) resetBtn.hidden = !dirty;
    };

    // Le rail de la timeline doit s'arrêter sur le dernier élément VISIBLE.
    var markLastVisible = function () {
      var last = null;
      items.forEach(function (el) {
        el.classList.remove("is-last-visible");
        if (!el.classList.contains("is-hidden")) last = el;
      });
      if (last) last.classList.add("is-last-visible");
    };

    var apply = function () {
      var visible = 0;
      items.forEach(function (el) {
        var ok = matches(el, null);
        el.classList.toggle("is-hidden", !ok);
        if (!ok) return;
        visible++;
        // Un élément ré-affiché après coup n'a jamais croisé l'observer
        // « reveal » : on le rend visible immédiatement. (Pas au 1er passage,
        // pour préserver l'animation d'entrée.)
        if (initialized && el.classList.contains("reveal")) el.classList.add("is-visible");
      });
      sections.forEach(function (sec) {
        var n = 0;
        sec.querySelectorAll(itemSel).forEach(function (el) {
          if (!el.classList.contains("is-hidden")) n++;
        });
        sec.classList.toggle("is-hidden", n === 0);
        var out = sec.querySelector("[data-section-count]");
        if (out) out.textContent = n;
      });
      if (emptyEl) emptyEl.hidden = visible > 0;
      markLastVisible();
      chips.forEach(function (c) {
        c.classList.toggle("active", isSelected(c.getAttribute("data-facet"), c.getAttribute("data-value")));
      });
      updateCounts();
      updateIndicators();
    };

    var writeHash = function () {
      if (!hashFacet || !history.replaceState) return;
      var v = state[hashFacet];
      history.replaceState(null, "",
        (!v || v === defaults[hashFacet]) ? location.pathname + location.search : "#" + v);
    };

    var setFacet = function (f, v) {
      if (modes[f] === "multi") {
        var i = state[f].indexOf(v);
        if (i > -1) { state[f].splice(i, 1); } else { state[f].push(v); }
      } else {
        state[f] = v; // les autres facettes ne sont pas réinitialisées
      }
      apply();
      if (f === hashFacet) writeHash();
    };

    chips.forEach(function (c) {
      c.addEventListener("click", function () {
        setFacet(c.getAttribute("data-facet"), c.getAttribute("data-value"));
      });
    });

    if (resetBtn) {
      resetBtn.addEventListener("click", function () {
        Object.keys(defaults).forEach(function (f) {
          state[f] = modes[f] === "multi" ? defaults[f].slice() : defaults[f];
        });
        apply();
        writeHash();
      });
    }

    // Filtres avancés (techno) — panneau repliable
    if (advToggleEl && advPanel) {
      advToggleEl.addEventListener("click", function () {
        var open = advPanel.hasAttribute("hidden");
        if (open) { advPanel.removeAttribute("hidden"); } else { advPanel.setAttribute("hidden", ""); }
        advToggleEl.setAttribute("aria-expanded", open ? "true" : "false");
        advToggleEl.classList.toggle("open", open);
      });
    }

    // Pré-sélection par hash — uniquement pour la barre qui la demande.
    if (hashFacet) {
      var want = (location.hash || "").replace("#", "");
      var known = chips.some(function (c) {
        return c.getAttribute("data-facet") === hashFacet && c.getAttribute("data-value") === want;
      });
      if (known) {
        state[hashFacet] = want;
        // Les liens profonds historiques (#mods, #tools) ne donnent aucun
        // résultat sous le périmètre « Pro » par défaut : on relâche alors les
        // autres facettes simples qui possèdent une option « all ».
        var n = 0;
        items.forEach(function (el) { if (matches(el, null)) n++; });
        if (!n) {
          Object.keys(state).forEach(function (f) {
            if (f === hashFacet || modes[f] !== "single") return;
            var hasAll = chips.some(function (c) {
              return c.getAttribute("data-facet") === f && c.getAttribute("data-value") === "all";
            });
            if (hasAll) state[f] = "all";
          });
        }
      }
    }

    apply();
    initialized = true;
  });

  // ── Cartes projet : langages ⇄ frameworks ─────────────
  // Un seul minuteur pour toutes les cartes ; une carte survolée garde sa rangée,
  // rien ne tourne quand l'onglet est en arrière-plan.
  var techRotators = document.querySelectorAll("[data-tech-rotate]");
  if (techRotators.length) {
    var rotTimer = setInterval(function () {
      if (document.hidden) return;
      techRotators.forEach(function (wrap) {
        if (wrap.closest(".project-card").matches(":hover")) return;
        var sets = wrap.querySelectorAll(".project-tags");
        var cur = 0;
        sets.forEach(function (s, i) { if (s.classList.contains("is-active")) cur = i; });
        var next = (cur + 1) % sets.length;
        sets[cur].classList.remove("is-active");
        sets[cur].setAttribute("aria-hidden", "true");
        sets[next].classList.add("is-active");
        sets[next].removeAttribute("aria-hidden");
      });
    }, 3500);
    cleanups.push(function () { clearInterval(rotTimer); });
  }

  // ── Carrousel témoignages (un à la fois, auto-défilement) ──
  // Supporte plusieurs carrousels sur une même page (accueil + formations).
  document.querySelectorAll("[data-testi]").forEach(function (testi) {
    var slides = Array.prototype.slice.call(testi.querySelectorAll(".testi-slide"));
    var dots = Array.prototype.slice.call(testi.querySelectorAll(".testi-dot"));
    var bar = testi.querySelector(".testi-progress span");
    var count = testi.querySelector("[data-count]");
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var idx = 0;
    var timer = null;
    var paused = false;    // survol
    var offscreen = false; // carrousel sorti du viewport
    var buried = false;    // onglet en arrière-plan
    var expanded = false;
    // Suivi du temps pour reprendre là où on s'était arrêté après une pause
    var curDur = 0;       // durée pleine de la slide courante
    var remaining = null; // temps restant avant la prochaine slide
    var startTime = 0;    // horodatage du (re)démarrage du minuteur courant

    // Le minuteur ne doit tourner que quand le carrousel est réellement
    // regardé : sinon on anime et repeint une barre que personne ne voit.
    var halted = function () { return paused || offscreen || buried; };

    var durationOf = function (n) {
      return parseInt(slides[n].getAttribute("data-duration"), 10) || 6000;
    };

    // Anime la barre de progression sur `dur` ms.
    // On anime `transform: scaleX()` et non `width` : animer la largeur
    // relayoute la page à CHAQUE frame, pendant toute la durée de la slide,
    // en boucle tant que la page est ouverte.
    // resume=true : repart de la position figée courante (ne remet pas à 0).
    var startBar = function (dur, resume) {
      if (!bar) return;
      if (!resume) {
        bar.style.transition = "none";
        bar.style.transform = "scaleX(0)";
        void bar.offsetWidth; // reflow
      }
      if (!halted() && !reduce) {
        bar.style.transition = "transform " + dur + "ms linear";
        bar.style.transform = "scaleX(1)";
      }
    };

    // Fige la barre sur sa progression courante. Celle-ci est déduite du temps
    // écoulé plutôt que lue via getComputedStyle : pas de layout synchrone.
    var freezeBar = function () {
      if (!bar) return;
      var f = curDur > 0 ? 1 - remaining / curDur : 0;
      bar.style.transition = "none";
      bar.style.transform = "scaleX(" + (f < 0 ? 0 : f > 1 ? 1 : f) + ")";
    };

    var moreLabel = testi.getAttribute("data-more-label") || "Voir plus";
    var lessLabel = testi.getAttribute("data-less-label") || "Voir moins";

    // resume=true : reprend le décompte restant sans le réinitialiser.
    var schedule = function (resume) {
      clearTimeout(timer);
      if (halted() || expanded || reduce || slides.length < 2) return;
      if (!resume || remaining == null) {
        curDur = durationOf(idx);
        remaining = curDur;
      }
      startTime = Date.now();
      startBar(remaining, resume);
      timer = setTimeout(function () { go(idx + 1); }, remaining);
    };

    // Gèle le décompte en mémorisant le temps restant.
    var freeze = function () {
      clearTimeout(timer);
      if (remaining != null) {
        remaining = remaining - (Date.now() - startTime);
        if (remaining < 0) remaining = 0;
      }
      freezeBar();
    };

    // Bascule une cause de pause. On ne gèle/relance qu'au changement d'état
    // global, sinon deux causes simultanées décompteraient deux fois.
    var setHalt = function (which, on) {
      var was = halted();
      if (which === "hover") paused = on;
      else if (which === "view") offscreen = on;
      else buried = on;
      if (halted() === was) return;
      if (halted()) freeze(); else schedule(true);
    };

    // Affiche « Voir plus » seulement si la citation déborde (état clampé)
    var updateMore = function () {
      var slide = slides[idx];
      var quote = slide.querySelector(".testi-quote");
      var btn = slide.querySelector("[data-more]");
      if (!quote || !btn) return;
      if (slide.classList.contains("expanded")) { btn.hidden = false; return; }
      btn.hidden = quote.scrollHeight - quote.clientHeight <= 4;
    };

    var collapseAll = function () {
      expanded = false;
      slides.forEach(function (s) {
        s.classList.remove("expanded");
        var b = s.querySelector("[data-more]");
        if (b) b.textContent = moreLabel;
      });
    };

    var go = function (n) {
      slides[idx].classList.remove("is-active");
      if (dots[idx]) dots[idx].classList.remove("is-active");
      idx = (n + slides.length) % slides.length;
      collapseAll();
      slides[idx].classList.add("is-active");
      if (dots[idx]) dots[idx].classList.add("is-active");
      if (count) count.textContent = idx + 1;
      remaining = null; // nouvelle slide → durée pleine
      updateMore();
      schedule();
    };

    slides.forEach(function (s) {
      var btn = s.querySelector("[data-more]");
      if (!btn) return;
      btn.addEventListener("click", function () {
        expanded = s.classList.toggle("expanded");
        btn.textContent = expanded ? lessLabel : moreLabel;
        if (expanded) {
          clearTimeout(timer);
          if (bar) { bar.style.transition = "none"; bar.style.transform = "scaleX(0)"; }
        } else {
          remaining = null;
          schedule();
        }
      });
    });

    dots.forEach(function (d) {
      d.addEventListener("click", function () {
        go(parseInt(d.getAttribute("data-i"), 10));
      });
    });

    var prevBtn = testi.querySelector("[data-prev]");
    var nextBtn = testi.querySelector("[data-next]");
    if (prevBtn) prevBtn.addEventListener("click", function () { go(idx - 1); });
    if (nextBtn) nextBtn.addEventListener("click", function () { go(idx + 1); });
    // Un seul témoignage : navigation inutile
    if (slides.length < 2) {
      if (prevBtn) prevBtn.hidden = true;
      if (nextBtn) nextBtn.hidden = true;
    }

    // Balayage horizontal (mobile) : gauche → suivant, droite → précédent.
    // On ignore les gestes surtout verticaux pour ne pas gêner le scroll.
    var touchX = null, touchY = null;
    testi.addEventListener("touchstart", function (e) {
      if (e.touches.length !== 1) { touchX = null; return; }
      touchX = e.touches[0].clientX;
      touchY = e.touches[0].clientY;
    }, { passive: true });
    testi.addEventListener("touchend", function (e) {
      if (touchX == null || slides.length < 2) return;
      var t = e.changedTouches[0];
      var dx = t.clientX - touchX;
      var dy = t.clientY - touchY;
      touchX = null;
      if (Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(dy) * 1.5) return;
      go(dx < 0 ? idx + 1 : idx - 1);
    }, { passive: true });

    // `updateMore` lit scrollHeight/clientHeight, donc force un layout
    // synchrone. Sur mobile, le repli de la barre d'URL émet des `resize` en
    // rafale pendant le scroll : on les regroupe sur une seule frame.
    var resizeQueued = false;
    window.addEventListener("resize", function () {
      if (resizeQueued) return;
      resizeQueued = true;
      requestAnimationFrame(function () {
        resizeQueued = false;
        updateMore();
      });
    }, sig({ passive: true }));

    testi.addEventListener("mouseenter", function () { setHalt("hover", true); });
    testi.addEventListener("mouseleave", function () { setHalt("hover", false); });

    // Hors viewport ou onglet en arrière-plan : on arrête tout. Sans ça le
    // carrousel anime et repeint en continu, même quand le visiteur est trois
    // écrans plus bas ou a changé d'onglet.
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        setHalt("view", !entries[0].isIntersecting);
      }, { threshold: 0 });
      io.observe(testi);
      cleanups.push(function () { io.disconnect(); });
    }
    document.addEventListener("visibilitychange", function () {
      setHalt("tab", document.hidden);
    }, sig());
    cleanups.push(function () { clearTimeout(timer); });

    updateMore();
    schedule();
  });

  // ── Lightbox galerie projet (avec navigation) ─────────
  var lb = document.querySelector("[data-lightbox-overlay]");
  if (lb) {
    var lbImg = lb.querySelector("img");
    var lbPrev = lb.querySelector("[data-lightbox-prev]");
    var lbNext = lb.querySelector("[data-lightbox-next]");
    var group = []; // [{ src, alt }]
    var current = 0;

    var render = function () {
      var item = group[current];
      if (!item) return;
      lbImg.src = item.src;
      lbImg.alt = item.alt;
    };
    var openLb = function () {
      var multi = group.length > 1;
      if (lbPrev) lbPrev.hidden = !multi;
      if (lbNext) lbNext.hidden = !multi;
      lb.classList.add("open");
      document.body.style.overflow = "hidden";
    };
    var closeLb = function () {
      lb.classList.remove("open");
      lbImg.src = "";
      document.body.style.overflow = "";
    };
    var go = function (dir) {
      if (group.length < 2) return;
      current = (current + dir + group.length) % group.length;
      render();
    };

    document.querySelectorAll("[data-lightbox]").forEach(function (a) {
      a.addEventListener("click", function (e) {
        e.preventDefault();
        // On limite la navigation à la galerie contenant l'image cliquée
        var scope = a.closest("[data-gallery]") || document;
        var links = Array.prototype.slice.call(scope.querySelectorAll("[data-lightbox]"));
        group = links.map(function (l) {
          var img = l.querySelector("img");
          return { src: l.getAttribute("href"), alt: img ? img.alt : "" };
        });
        current = links.indexOf(a);
        if (current < 0) current = 0;
        render();
        openLb();
      });
    });

    if (lbPrev) lbPrev.addEventListener("click", function (e) { e.stopPropagation(); go(-1); });
    if (lbNext) lbNext.addEventListener("click", function (e) { e.stopPropagation(); go(1); });

    lb.addEventListener("click", function (e) {
      // Ne pas fermer quand on clique une flèche de navigation
      if (e.target.closest("[data-lightbox-prev], [data-lightbox-next]")) return;
      closeLb();
    });

    document.addEventListener("keydown", function (e) {
      if (!lb.classList.contains("open")) return;
      if (e.key === "Escape") closeLb();
      else if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "ArrowRight") go(1);
    }, sig());
  }

  // ── Galeries : bouton « voir plus » ───────────────────
  document.querySelectorAll("[data-gallery-more]").forEach(function (btn) {
    var gallery = btn.parentElement.querySelector("[data-gallery]");
    if (!gallery) return;
    btn.addEventListener("click", function () {
      var expanded = gallery.classList.toggle("expanded");
      var lbl = expanded ? gallery.getAttribute("data-less-label") : gallery.getAttribute("data-more-label");
      if (lbl) btn.textContent = lbl;
    });
  });

  // ── Page Compétences : modale de détail ───────────────
  var skillModal = document.querySelector("[data-skill-modal]");
  if (skillModal) {
    var skillContent = skillModal.querySelector("[data-skill-modal-content]");
    var skillPanel = skillModal.querySelector(".skill-modal-panel");
    var lastFocused = null;

    var closeSkill = function () {
      skillModal.hidden = true;
      skillModal.classList.remove("open");
      skillContent.textContent = "";
      document.body.style.overflow = "";
      if (lastFocused) lastFocused.focus();
    };

    var openSkill = function (btn) {
      var key = btn.getAttribute("data-skill");
      var tpl = document.querySelector('[data-skill-detail="' + key + '"]');
      if (!tpl) return;
      lastFocused = btn;
      skillContent.textContent = "";
      skillContent.appendChild(tpl.content.cloneNode(true));
      skillModal.hidden = false;
      // Laisse le navigateur appliquer `hidden = false` avant la transition
      requestAnimationFrame(function () { skillModal.classList.add("open"); });
      document.body.style.overflow = "hidden";
      if (skillPanel) skillPanel.focus();
    };

    document.querySelectorAll("[data-skill]").forEach(function (btn) {
      btn.addEventListener("click", function () { openSkill(btn); });
    });

    skillModal.addEventListener("click", function (e) {
      if (e.target.closest(".skill-modal-panel") && !e.target.closest("[data-skill-close]")) return;
      closeSkill();
    });

    document.addEventListener("keydown", function (e) {
      if (skillModal.hidden) return;
      if (e.key === "Escape") closeSkill();
    }, sig());
  }
  };

  window.CadrePage = { init: init, destroy: destroy };
  init();
})();
