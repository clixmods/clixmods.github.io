+++
date = "2023-11-15T10:00:00+02:00"
draft = false
title = "Aspiro Shop"
subtitle = "PHP/MVC E-commerce Website - IUT Montpellier"
description = "Complete online sales platform with MVC architecture and advanced security"
tags = [ "lang_php", "MVC", "E-commerce", "Security", "PDO" ]
category = "projects"
sector = "appsweb-etude"
featured = true
fmContentType = "project-content-type"
programming_languages = [ "lang_php", "lang_mysql", "lang_javascript", "lang_html", "lang_css" ]
soft_skills = [
  "skill_gestion_de_projet",
  "skill_communication",
  "skill_resolution_problemes",
  "skill_leadership"
]
specialties = [
  "spec_programmation_orientee_objet",
  "spec_architecture_logicielle",
  "spec_securite_et_optimisation",
  "spec_gestion_de_versions_avec_git",
  "spec_design_pattern_et_refactoring",
  "spec_developpement_dapi"
]
tools = [ "tool_gitlab", "tool_jetbrains", "tool_fork" ]
image = "/images/projects/aspiro-shop/preview.jpeg"

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

[[actions]]
type = "github"
label = "View GitHub"
url = "https://github.com/clixmods/archive-aspiro-shop"
fieldGroup = "actions_group"

[[galleries]]
title = "Preview"
size = "size-medium"
fieldGroup = "galleries_group"

  [[galleries.images]]
  url = "/images/projects/aspiro-shop/preview.jpeg"

[[contributors]]
person = "clement-garcia"
roles = [ "Developer" ]
fieldGroup = "contributors_group"

[[contributors]]
person = "baptiste-lespinasse"
roles = [ "Developer" ]
fieldGroup = "contributors_group"

[[contributors]]
person = "quentin-grelier"
roles = [ "Developer" ]
fieldGroup = "contributors_group"
+++

## Presentation

Development of an online sales website as part of a study project at IUT Montpellier-Sète, serving as a synthesis of our PHP-oriented web development learning. The objective: to propose a complete, secure and functional platform, according to a rigorous MVC architecture.

## My Contributions

### User Interface
- Creation of a fluid and secure user interface with validated forms
- HTML/CSS compliance and respect for web standards
- Registration and authentication system by email

### Session Management
- Implementation of a complete user session system
- Clear separation between front-end interface and back-end
- User permissions and roles management

### CRUD Operations
- Implementation of CRUD operations with PDO
- Strict compliance with MVC architecture best practices
- Separation of responsibilities between models, views and controllers

## Architecture & Security

### Modular Architecture
- Automatic class loading (autoloading)
- Dynamic route management with relative URLs
- Clear and maintainable folder structure

### Data Security
- View security (data escaping, input validation)
- Strict access control to different parts of the application
- Use of prepared statements for all database interactions
- Foreign key constraints to ensure referential integrity

### Attack Protection
- Password encryption with modern algorithms
- SQL injection protection
- Anti-brute force measures
- Validation and sanitization of all user inputs

## Advanced Features

### Shopping Cart Management
- Persistent cart even for unconnected visitors
- Cart saving upon login
- Real-time quantity and price updates

### Order History
- Complete order management system
- Detailed history for each user
- Order status tracking

### User Experience
- User feedback system with flash messages
- Clear display of input errors
- Smart redirections after actions
- Intuitive and responsive interface

### Evaluation Preparation
- Clean and structured demonstration database
- Online deployment to facilitate evaluation
- Complete project documentation
