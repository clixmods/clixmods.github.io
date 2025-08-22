#!/usr/bin/env node

/**
 * Script FrontMatter pour mettre à jour automatiquement les champs calculés d'une expérience
 * Exécuté quand les dates de début ou fin sont modifiées
 */

const fs = require('fs');
const path = require('path');
const { updateExperienceFields } = require('./experience-utils');

// Récupération des arguments FrontMatter
const [,, filePath] = process.argv;

if (!filePath) {
  console.error('Chemin du fichier requis');
  process.exit(1);
}

try {
  // Lecture du fichier markdown
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Extraction du frontmatter (simple regex pour cette demo)
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
  
  if (!frontmatterMatch) {
    console.error('Pas de frontmatter trouvé');
    process.exit(1);
  }
  
  // Parse du YAML (simplifié - dans un vrai projet, utiliser une lib comme js-yaml)
  const frontmatterContent = frontmatterMatch[1];
  const lines = frontmatterContent.split('\n');
  const data = {};
  
  lines.forEach(line => {
    const [key, ...valueParts] = line.split(':');
    if (key && valueParts.length > 0) {
      const value = valueParts.join(':').trim();
      data[key.trim()] = value.replace(/^["']|["']$/g, ''); // Enlever les quotes
    }
  });
  
  // Mise à jour des champs calculés
  if (data.start_date) {
    const updatedData = updateExperienceFields(data);
    
    // Reconstruction du frontmatter
    let newFrontmatter = '---\n';
    Object.entries(updatedData).forEach(([key, value]) => {
      if (value) {
        newFrontmatter += `${key}: "${value}"\n`;
      }
    });
    newFrontmatter += '---';
    
    // Remplacement dans le contenu
    const markdownContent = content.replace(/^---\n[\s\S]*?\n---/, newFrontmatter);
    
    // Écriture du fichier mis à jour
    fs.writeFileSync(filePath, markdownContent, 'utf8');
    
    console.log('✅ Champs d\'expérience mis à jour automatiquement');
    console.log(`   Période: ${updatedData.period}`);
    console.log(`   Durée: ${updatedData.duration}`);
    console.log(`   Statut: ${updatedData.status}`);
  }
  
} catch (error) {
  console.error('Erreur lors de la mise à jour:', error.message);
  process.exit(1);
}
