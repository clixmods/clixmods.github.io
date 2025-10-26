---
title: "Alternance chez La Moutarde : post-release, portage, prototypage & B2B"
subtitle: Retour structuré sur une alternance terrain mêlant support produit, R&D et outillage
date: 2025-08-09T11:00:00+02:00
draft: true
category: parcours
tags:
  - Alternance
  - Production
  - Portage
  - Prototypage
  - B2B
  - Pipeline
technologies:
  - Unity
  - C#
  - .NET
  - Blazor
  - FastEndpoint
image: /images/blog/alternance-la-moutarde.jpg
description: "Expérience d'alternance : support post-release, portage plateforme, prototypage d'un projet interne confidentiel et création d'un outil B2B générateur d'apps media."
fmContentType: default
---

# 🧩 Alternance chez La Moutarde : post-release, portage, prototypage… et un produit B2B

Entre octobre 2023 et 2025, mon alternance au studio indépendant **La Moutarde** a combiné trois axes majeurs :

1. 🔧 Support post-release & portage d'un titre fraîchement lancé
2. 🧪 Prototypage d'un **projet interne confidentiel** - sans entrer dans la nature exacte du produit
3. 🛠️ Co-construction d'un outil **B2B** générateur d'applications média multiplateformes (*My Game Showcase*)

Cette période a également accompagné une évolution du **système d'information** (adoption d'un ERP) pour soutenir la diversification vers un modèle mixte B2C / B2B.

---
## 🎯 Contexte
Après la sortie publique d'un projet narratif (27 mars 2024), l'équipe cœur s'est resserrée (≈ 4–5 personnes) autour de deux enjeux : assurer une **post-release de qualité** et amorcer un **revenu produit récurrent** via un outil valorisable auprès d'autres studios/éditeurs.

---
## 🚀 Projet 1 - Post-release & portage plateforme
Objectifs : stabiliser, améliorer, étendre la présence du produit.

### Debug & stabilité
- Reproduction systématique des bugs (latence simulée, profils matériels variés)
- Analyse cycle de vie Unity (Update vs FixedUpdate) pour corriger des comportements physiques divergents
- Isolation d'une condition de collision prématurée (neutralisation ciblée via `Physics.IgnoreCollision` au tir)
- Correction d'un élément manquant en scène de crédits (logique déplacée en `FixedUpdate` + repositionnement raycast)

### Portage plateforme (Epic)
- Intégration SDK (succès, login, sauvegardes)
- Fiabilisation pipeline de build (séparation Setup → Domain Reload → Build)
- Persistance d'état de requêtes de build pour relance contrôlée
- Scriptabilité totale (intégration CI future facilitée)

> Résultat : un processus reproductible, inspectable et prêt pour l'automatisation.

*(Chiffres internes supprimés - insérer ultérieurement : temps moyen de résolution, volume de corrections, crash rate avant/après.)*

---
## 🧪 Projet 2 - Prototypage interne : prototyper une boucle cohérente
Projet interne confidentiel : on ne détaille pas la nature exacte du produit. Focalisation sur la méthodologie de prototypage.

Axes traités :
- Systèmes modulaires (phases d'interaction successives orchestrées par un contrôleur léger)
- Physique contextuelle (tension / résistances / rétroactions) avec ajustements dynamiques
- IA pilotée par états compacts ("Orders") en préfiguration d'une transition future vers un arbre de comportement
- "Observers" tiers injectant de la variation situationnelle
- Ability System extensible (buffs ciblés, altérations temporelles)
- Itérations caméra : équilibre lisibilité / inertie / coût performance

Approche : prototype jetable → mesure → conservation des briques robustes uniquement.

*(Placeholders à compléter : durée moyenne d'une interaction, taux de réussite initial vs itéré, métriques d'engagement internes.)*

---
## 🛠️ Projet 3 - My Game Showcase (outil B2B)
**But** : permettre à un studio de générer rapidement des applications riches (art, musiques, vidéos, textes) exportables vers plusieurs plateformes desktop/console sans pipeline interne lourd.

### Architecture fonctionnelle
- Front d'administration : **Blazor** + SignalR (gestion médias, thèmes, localisations, prévisualisation live)
- Back-end : **.NET 8** (FastEndpoint) structuré en endpoints fins + validation
- Traitement médias : conversions (FFMpegCore), transformations images (Magick), métadonnées audio (TagLib#)
- Nettoyage asynchrone des fichiers temporaires & audit des résidus
- Exports : artbook PDF multi-profils (qualité / résolution), archives OST (mp3/flac/wav), bundles console (scripts d'emballage dédiés)
- PlayerApp synchrone (prévisualisation temps réel, puis "freeze" d'une release figée)

### Impact
- Passage d'une prestation isolée à un **produit structurant** réutilisable (accélération time-to-demo)
- Standardisation pipeline fichiers + montée en rigueur (tests ciblés sur transformations critiques)

*(Placeholders à compléter : nombre d'instances générées, temps moyen d'administration → build, couverture de tests, coût infra mensuel.)*

---
## 🗂️ Outillage & SI
- Outils internes : UniBuilder (build orchestré), Multipass, User Report (remontées terrain structurées)
- Gestion projet : ClickUp (roadmaps / sprints légers), Discord (revues rapides), GitFlow
- Migration progressive vers un ERP (CRM, facturation, suivi paiements, pages marketing) pour soutenir l'activité B2B

---
## 🧠 Compétences mobilisées
| Domaine | Points clés |
|--------|-------------|
| Debug & Perf Unity | Cycle de vie, collisions, reproduction sous contrainte |
| Build / Portage | Pipelines scriptés, Domain Reload maîtrisé, intégrations plateforme |
| Systèmes Gameplay | Modularité, orchestration par états, injections d'événements |
| Back-end .NET | FastEndpoint, traitement médias, SignalR, organisation endpoints |
| Produit B2B | Passage besoin client → outil générique, packaging multi-plateformes |
| Qualité | Tests unitaires ciblés, instrumentation, journalisation utile |

---
## 🔑 Principes retenus
1. Chercher la cause, pas un contournement
2. Industrialiser tôt (un build fiable > itérations improvisées)
3. Prototyper vite, jeter sans regret
4. L'exigence B2B rejaillit sur la qualité globale (API, tests, docs)

---
## ▶️ Suite
- Vertical Slice interne du prototype (itérations contrôlées, métriques de boucle)
- Consolidation de My Game Showcase (retours utilisateurs, packaging console automatisé, extension formats)
- Finalisation déploiement ERP pour fluidifier reporting & facturation

---
*Certaines données chiffrées et éléments de conception détaillés sont volontairement omis pour respecter la confidentialité interne.*
