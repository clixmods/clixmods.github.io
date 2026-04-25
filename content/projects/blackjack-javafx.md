+++
date = "2024-03-15T00:00:00+02:00"
draft = false
title = "BlackJack JavaFX"
subtitle = "Jeu de cartes développé en Java avec interface JavaFX"
description = "Projet académique de développement d'un jeu de Blackjack complet en Java avec interface graphique JavaFX. Intégration des règles complètes du jeu, gestion des scores, interface utilisateur interactive et système de sauvegarde sécurisé."
tags = [
  "Académique",
  "SAE",
  "Jeu de cartes",
  "POO",
  "Interface utilisateur",
  "Algorithmique",
  "Travail en équipe",
  "Intégration continue"
]
category = "projects"
sector = "appsweb-etude"
featured = false
fmContentType = "project-content-type"
status = "Terminé"
image = "/images/projects/blackjack-javafx/blackjack-bg.jpg"
logo = "/images/projects/blackjack-javafx/blackjack-logo.png"
galleries = [ ]
frameworks_engines = [ "fw_javafx" ]
programming_languages = [ "lang_java", "lang_sql" ]
specialties = [ "spec_algorithmique", "spec_interface_utilisateur" ]
tools = [
  "tool_gitlab",
  "tool_fork",
  "tool_photoshop",
  "tool_jetbrains"
]
soft_skills = [ "skill_communication", "skill_resolution_problemes" ]

[[actions]]
type = "github"
label = "Voir le code source"
url = "#"
primary = true

[development_time]
total = "3 semaines"

[[notable_facts]]
value = "Implémentation complète des règles du Blackjack"
label = "Règles de jeu complètes avec gestion des As (1 ou 11)"
fieldGroup = "notable_facts_group"

[[notable_facts]]
value = "Système de chiffrement des données"
label = "Protection des scores avec chiffrement HMAC + SHA-256"
fieldGroup = "notable_facts_group"

[[notable_facts]]
value = "Intégration continue"
label = "Pipeline GitHub Actions pour tests automatisés"
fieldGroup = "notable_facts_group"

[[contributors]]
name = "Équipe de développement"
role = "Développeur en binôme"
fieldGroup = "contributors_group"

[widget_order]
contributors = 10
development_time = 20
gallery = 30
technical_specs = 40
specialties = 50
soft_skills = 55
tools = 60
awards = 70
testimonials = 80
youtube_videos = 90
clients = 100
grade = 110
downloads = 120
ranking = 130

[ranking]
event_type = "Classement"
suffix = "è"
+++

## Contexte du projet

**BlackJack JavaFX** est un projet académique réalisé en deuxième année dans le cadre de la SAE (Situation d'Apprentissage et d'Évaluation). L'objectif était de développer un jeu de Blackjack complet en Java avec une interface graphique JavaFX, en mettant l'accent sur :

- La **programmation orientée objet (POO)** en Java
- La **conception d'interface utilisateur (IHM)**
- L'**algorithmique appliquée** à la logique de jeu
- La **gestion de projet** en équipe

## Fonctionnalités principales

### 🎮 Logique de jeu complète
- **Distribution aléatoire** de cartes avec gestion de pioche sans remise
- **Calcul automatique** des scores avec règles spécifiques des As
- **Gestion des actions** : tirer une carte, rester, doubler la mise
- **Décisions automatiques** de la banque selon les règles officielles

### 🖥️ Interface utilisateur interactive
- **Écrans multiples** : accueil, mise, jeu principal
- **Affichage dynamique** des cartes et scores en temps réel
- **Animations fluides** pour la distribution des cartes
- **Messages contextuels** de victoire/défaite
- **Expérience utilisateur optimisée**

### 🔒 Sécurité et persistance
- **Base de données SQLite** pour stocker les meilleurs scores
- **Chiffrement HMAC + SHA-256** des données sensibles
- **Protection contre la triche** avec hashage sécurisé

## Activités techniques réalisées

### 🧮 Développement algorithmique
**Compétences mobilisées :**
- **CE 2.02** – Recenser les algorithmes et structures de données usuels
- **CE 2.04** – Justifier les choix et valider les résultats

**Réalisations :**
- Algorithme de mélange de Fisher-Yates pour la distribution aléatoire
- Système de calcul dynamique des scores avec gestion des As
- Logique de décision automatique pour la banque
- Optimisation des structures de données pour la performance

```java
public void melanger() {
    for (int i = 0; i < 52; i++) {
        int randIndex = i + new Random().nextInt(52 - i);
        Carte temp = paquet.get(i);
        paquet.set(i, paquet.get(randIndex));
        paquet.set(randIndex, temp);
    }
}
```

### 🎨 Conception d'interface
**Compétences mobilisées :**
- **CE 1.04** – Veiller à la qualité du code et à sa documentation
- **CE 6.04** – Développer une communication efficace et collaborative

**Réalisations :**
- Architecture MVC pour séparer logique métier et présentation
- Interface responsive avec gestion d'événements
- Synchronisation temps réel entre modèle et vue
- Amélioration continue de l'expérience utilisateur

### 🔧 DevOps et sécurité
**Compétences mobilisées :**
- **AC 13.03** – Installer et configurer un système et des outils
- **AC 33.01** – Créer des processus de traitement automatisé
- **AC 21.02** – Mettre en œuvre des principes de sécurité informatique

**Réalisations :**
- Configuration Maven pour la gestion des dépendances
- Pipeline GitHub Actions pour l'intégration continue
- Implémentation de chiffrement sécurisé pour les données
- Versionning collaboratif avec Git

```java
public static String hash(String clearPassword) {
    try {
        // Génération de HMAC avec SHA-256
        Mac sha256Hmac = Mac.getInstance(ALGORITHM);
        SecretKeySpec secretKey = new SecretKeySpec(PEPPER.getBytes(), ALGORITHM);
        sha256Hmac.init(secretKey);
        // ... Processus de hachage complet
    } catch (NoSuchAlgorithmException | InvalidKeyException e) {
        e.printStackTrace();
        return null;
    }
}
```

## Architecture technique

### 🏗️ Structure du projet
- **Modèle MVC** pour une architecture claire et maintenable
- **Séparation des responsabilités** entre logique métier et interface
- **Programmation orientée objet** avec encapsulation et héritage
- **Design patterns** appliqués pour la robustesse du code

### 🛠️ Technologies utilisées
- **Java** pour la logique métier et les algorithmes
- **JavaFX** pour l'interface graphique moderne
- **SQLite** pour la persistance des données
- **Maven** pour la gestion des dépendances
- **GitHub Actions** pour l'intégration continue

## Compétences développées

| Domaine | Apprentissage Critique | Composante Essentielle | Niveau |
|---------|----------------------|----------------------|--------|
| **Algorithmique** | AC 12.02 – Comparer des algorithmes | CE 2.02 – Structures de données usuelles | Application |
| **Interface utilisateur** | AC 11.01 – Implémenter des conceptions | CE 1.04 – Qualité du code | Maîtrise |
| **Outils de développement** | AC 13.03 – Installer et configurer | CE 5.04 – Démarche proactive | Application |
| **Gestion de projet** | AC 15.03 – Identifier les phases | CE 6.04 – Communication efficace | Application |
| **Sécurité** | AC 21.02 – Principes de sécurité | CE 4.02 – Bonnes pratiques | Application |
| **Automatisation** | AC 33.01 – Processus automatisés | CE 5.04 – Démarche proactive | Application |

## Résultats et apprentissages

Ce projet m'a permis de :
- **Maîtriser la POO en Java** avec une architecture solide
- **Développer des interfaces utilisateur** modernes avec JavaFX
- **Implémenter des algorithmes complexes** pour la logique de jeu
- **Collaborer efficacement** en équipe avec les outils Git
- **Appliquer la sécurité informatique** dans un contexte réel
- **Mettre en place l'intégration continue** pour la qualité du code

Le projet a abouti à un **prototype jouable et complet**, respectant toutes les règles du Blackjack, avec une interface intuitive et des fonctionnalités avancées de sécurité et de persistance des données.
