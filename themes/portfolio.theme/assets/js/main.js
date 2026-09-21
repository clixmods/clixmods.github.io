// Thème portfolio — interactions légères (vanilla JS)
(function () {
  "use strict";

  // ── Menu mobile ───────────────────────────────────────
  var burger = document.querySelector("[data-burger]");
  var menu = document.querySelector("[data-mobile-menu]");
  if (burger && menu) {
    burger.addEventListener("click", function () {
      var open = menu.classList.toggle("open");
      burger.classList.toggle("is-open", open);
      burger.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.style.overflow = open ? "hidden" : "";
    });
    menu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        menu.classList.remove("open");
        burger.classList.remove("is-open");
        document.body.style.overflow = "";
      });
    });
  }

  // ── Navbar : état « scrolled » ────────────────────────
  var navbar = document.querySelector("[data-navbar]");
  if (navbar) {
    var onScroll = function () {
      navbar.classList.toggle("scrolled", window.scrollY > 24);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  // ── Reveal au scroll ──────────────────────────────────
  var reveals = document.querySelectorAll(".reveal");
  if (reveals.length && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-visible"); });
  }

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

  // ── Carrousel témoignages (un à la fois, auto-défilement) ──
  // Supporte plusieurs carrousels sur une même page (accueil + formations).
  document.querySelectorAll("[data-testi]").forEach(function (testi) {
    var slides = Array.prototype.slice.call(testi.querySelectorAll(".testi-slide"));
    var dots = Array.prototype.slice.call(testi.querySelectorAll(".testi-dot"));
    var bar = testi.querySelector(".testi-progress span");
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
    }, { passive: true });

    testi.addEventListener("mouseenter", function () { setHalt("hover", true); });
    testi.addEventListener("mouseleave", function () { setHalt("hover", false); });

    // Hors viewport ou onglet en arrière-plan : on arrête tout. Sans ça le
    // carrousel anime et repeint en continu, même quand le visiteur est trois
    // écrans plus bas ou a changé d'onglet.
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) {
        setHalt("view", !entries[0].isIntersecting);
      }, { threshold: 0 }).observe(testi);
    }
    document.addEventListener("visibilitychange", function () {
      setHalt("tab", document.hidden);
    });

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
    });
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
    });
  }
})();
