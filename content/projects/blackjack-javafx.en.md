+++
date = "2024-03-15T00:00:00+02:00"
draft = true
title = "BlackJack JavaFX"
subtitle = "Card game developed in Java with JavaFX interface"
description = "Academic project developing a complete Blackjack game in Java with JavaFX graphical interface. Integration of complete game rules, score management, interactive user interface and secure save system."
tags = [
  "Academic",
  "SAE",
  "Card Game",
  "OOP",
  "User Interface",
  "Algorithms",
  "Teamwork",
  "Continuous Integration"
]
category = "projects"
sector = "appsweb-etude"
featured = false
fmContentType = "project-content-type"
status = "Completed"
image = "/images/projects/blackjack-javafx/blackjack-bg.jpg"
logo = "/images/projects/blackjack-javafx/blackjack-logo.png"
galleries = [ ]
frameworks_engines = [ "fw_javafx" ]
programming_languages = [ "lang_java", "lang_sql" ]
specialties = [ "spec_algorithmique", "spec_interface_utilisateur" ]
tools = [ "tool_gitlab", "tool_fork", "tool_photoshop", "tool_jetbrains" ]
soft_skills = [ "skill_communication", "skill_resolution_problemes" ]

[[actions]]
type = "github"
label = "View Source Code"
url = "#"
primary = true

[development_time]
total = "3 weeks"

[[notable_facts]]
value = "Complete Blackjack rules implementation"
label = "Full game rules with Ace management (1 or 11)"
fieldGroup = "notable_facts_group"

[[notable_facts]]
value = "Data encryption system"
label = "Score protection with HMAC + SHA-256 encryption"
fieldGroup = "notable_facts_group"

[[notable_facts]]
value = "Continuous integration"
label = "GitHub Actions pipeline for automated testing"
fieldGroup = "notable_facts_group"

[[contributors]]
name = "Development Team"
role = "Pair Developer"
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
event_type = "Ranking"
suffix = "th"
+++

## Project Context

**BlackJack JavaFX** is an academic project completed in the second year as part of the SAE (Learning and Assessment Situation). The objective was to develop a complete Blackjack game in Java with a JavaFX graphical interface, focusing on:

- **Object-oriented programming (OOP)** in Java
- **User interface design (HCI)**
- **Applied algorithms** for game logic
- **Team project management**

## Main Features

### 🎮 Complete Game Logic
- **Random card distribution** with deck management without replacement
- **Automatic score calculation** with specific Ace rules
- **Action management**: hit, stand, double down
- **Automatic dealer decisions** according to official rules

### 🖥️ Interactive User Interface
- **Multiple screens**: home, betting, main game
- **Dynamic display** of cards and scores in real-time
- **Smooth animations** for card dealing
- **Contextual messages** for win/loss
- **Optimized user experience**

### 🔒 Security and Persistence
- **SQLite database** to store high scores
- **HMAC + SHA-256 encryption** of sensitive data
- **Anti-cheat protection** with secure hashing

## Technical Activities Performed

### 🧮 Algorithm Development
**Skills Mobilized:**
- **CE 2.02** – List common algorithms and data structures
- **CE 2.04** – Justify choices and validate results

**Achievements:**
- Fisher-Yates shuffle algorithm for random distribution
- Dynamic score calculation system with Ace management
- Automatic decision logic for the dealer
- Data structure optimization for performance

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

### 🎨 Interface Design
**Skills Mobilized:**
- **CE 1.04** – Ensure code quality and documentation
- **CE 6.04** – Develop effective and collaborative communication

**Achievements:**
- MVC architecture to separate business logic and presentation
- Responsive interface with event handling
- Real-time synchronization between model and view
- Continuous improvement of user experience

### 🔧 DevOps and Security
**Skills Mobilized:**
- **AC 13.03** – Install and configure system and tools
- **AC 33.01** – Create automated processing processes
- **AC 21.02** – Implement computer security principles

**Achievements:**
- Maven configuration for dependency management
- GitHub Actions pipeline for continuous integration
- Secure encryption implementation for data
- Collaborative versioning with Git

```java
public static String hash(String clearPassword) {
    try {
        // HMAC generation with SHA-256
        Mac sha256Hmac = Mac.getInstance(ALGORITHM);
        SecretKeySpec secretKey = new SecretKeySpec(PEPPER.getBytes(), ALGORITHM);
        sha256Hmac.init(secretKey);
        // ... Complete hashing process
    } catch (NoSuchAlgorithmException | InvalidKeyException e) {
        e.printStackTrace();
        return null;
    }
}
```

## Technical Architecture

### 🏗️ Project Structure
- **MVC Model** for clear and maintainable architecture
- **Separation of concerns** between business logic and interface
- **Object-oriented programming** with encapsulation and inheritance
- **Design patterns** applied for code robustness

### 🛠️ Technologies Used
- **Java** for business logic and algorithms
- **JavaFX** for modern graphical interface
- **SQLite** for data persistence
- **Maven** for dependency management
- **GitHub Actions** for continuous integration

## Skills Developed

| Domain | Critical Learning | Essential Component | Level |
|--------|------------------|-------------------|-------|
| **Algorithms** | AC 12.02 – Compare algorithms | CE 2.02 – Common data structures | Application |
| **User Interface** | AC 11.01 – Implement designs | CE 1.04 – Code quality | Mastery |
| **Development Tools** | AC 13.03 – Install and configure | CE 5.04 – Proactive approach | Application |
| **Project Management** | AC 15.03 – Identify phases | CE 6.04 – Effective communication | Application |
| **Security** | AC 21.02 – Security principles | CE 4.02 – Best practices | Application |
| **Automation** | AC 33.01 – Automated processes | CE 5.04 – Proactive approach | Application |

## Results and Learning

This project allowed me to:
- **Master OOP in Java** with solid architecture
- **Develop modern user interfaces** with JavaFX
- **Implement complex algorithms** for game logic
- **Collaborate effectively** as a team with Git tools
- **Apply computer security** in a real context
- **Set up continuous integration** for code quality

The project resulted in a **playable and complete prototype**, respecting all Blackjack rules, with an intuitive interface and advanced security and data persistence features.

