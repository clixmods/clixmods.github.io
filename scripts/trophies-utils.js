/**
 * Script utilitaire pour la gestion des trophées
 * Usage: node scripts/trophies-utils.js [command]
 * 
 * Commandes disponibles:
 * - validate : Valide la structure du fichier trophies.json
 * - migrate : Migre les anciens trophées vers le nouveau format
 * - generate-test : Génère des données de test pour les trophées
 */

const fs = require('fs');
const path = require('path');

// Chemins des fichiers
const TROPHIES_FILE = path.join(__dirname, '../data/trophies.json');
const BACKUP_FILE = path.join(__dirname, '../data/trophies.backup.json');

// Schéma de validation pour un trophée
const TROPHY_SCHEMA = {
  required: ['id', 'name', 'description', 'icon', 'rarity', 'requirement', 'category', 'points', 'enabled', 'order', 'condition_type', 'condition_data'],
  optional: [],
  rarities: ['common', 'rare', 'epic', 'legendary'],
  categories: ['exploration', 'engagement', 'content', 'interaction', 'action', 'social', 'achievement', 'speed'],
  condition_types: ['page_visit', 'visited_count', 'theme_change', 'time_spent', 'action_performed', 'section_viewed', 'all_sections_visited', 'all_trophies_unlocked', 'speed_navigation']
};

/**
 * Valide la structure du fichier trophies.json
 */
function validateTrophies() {
  console.log('🔍 Validation du fichier trophies.json...');
  
  if (!fs.existsSync(TROPHIES_FILE)) {
    console.error('❌ Fichier trophies.json introuvable');
    return false;
  }

  try {
    const data = JSON.parse(fs.readFileSync(TROPHIES_FILE, 'utf8'));
    
    if (!Array.isArray(data)) {
      console.error('❌ Le fichier doit contenir un tableau de trophées');
      return false;
    }

    let isValid = true;
    const ids = new Set();

    data.forEach((trophy, index) => {
      const errors = validateSingleTrophy(trophy, index);
      if (errors.length > 0) {
        isValid = false;
        console.error(`❌ Trophée ${index + 1} (${trophy.id || 'ID manquant'}):`);
        errors.forEach(error => console.error(`   - ${error}`));
      }

      // Vérifier les IDs uniques
      if (trophy.id) {
        if (ids.has(trophy.id)) {
          console.error(`❌ ID dupliqué: ${trophy.id}`);
          isValid = false;
        }
        ids.add(trophy.id);
      }
    });

    if (isValid) {
      console.log(`✅ Validation réussie! ${data.length} trophées validés.`);
      
      // Statistiques
      const stats = generateStats(data);
      console.log('\n📊 Statistiques:');
      console.log(`   - Total: ${stats.total}`);
      console.log(`   - Activés: ${stats.enabled}`);
      console.log(`   - Par rareté: ${JSON.stringify(stats.byRarity)}`);
      console.log(`   - Par catégorie: ${JSON.stringify(stats.byCategory)}`);
    }

    return isValid;
  } catch (error) {
    console.error('❌ Erreur lors de la lecture du fichier:', error.message);
    return false;
  }
}

/**
 * Valide un seul trophée
 */
function validateSingleTrophy(trophy, index) {
  const errors = [];

  // Vérifier les champs requis
  TROPHY_SCHEMA.required.forEach(field => {
    if (!(field in trophy)) {
      errors.push(`Champ requis manquant: ${field}`);
    }
  });

  // Vérifier les types
  if (trophy.id && typeof trophy.id !== 'string') {
    errors.push('id doit être une chaîne');
  }
  if (trophy.name && typeof trophy.name !== 'string') {
    errors.push('name doit être une chaîne');
  }
  if (trophy.points && typeof trophy.points !== 'number') {
    errors.push('points doit être un nombre');
  }
  if (trophy.enabled && typeof trophy.enabled !== 'boolean') {
    errors.push('enabled doit être un booléen');
  }
  if (trophy.order && typeof trophy.order !== 'number') {
    errors.push('order doit être un nombre');
  }

  // Vérifier les énumérations
  if (trophy.rarity && !TROPHY_SCHEMA.rarities.includes(trophy.rarity)) {
    errors.push(`rarity invalide: ${trophy.rarity}`);
  }
  if (trophy.category && !TROPHY_SCHEMA.categories.includes(trophy.category)) {
    errors.push(`category invalide: ${trophy.category}`);
  }
  if (trophy.condition_type && !TROPHY_SCHEMA.condition_types.includes(trophy.condition_type)) {
    errors.push(`condition_type invalide: ${trophy.condition_type}`);
  }

  // Vérifier condition_data
  if (trophy.condition_data && typeof trophy.condition_data !== 'object') {
    errors.push('condition_data doit être un objet');
  }

  return errors;
}

/**
 * Génère des statistiques sur les trophées
 */
function generateStats(trophies) {
  const stats = {
    total: trophies.length,
    enabled: trophies.filter(t => t.enabled).length,
    byRarity: {},
    byCategory: {}
  };

  TROPHY_SCHEMA.rarities.forEach(rarity => {
    stats.byRarity[rarity] = trophies.filter(t => t.rarity === rarity).length;
  });

  TROPHY_SCHEMA.categories.forEach(category => {
    stats.byCategory[category] = trophies.filter(t => t.category === category).length;
  });

  return stats;
}

/**
 * Crée une sauvegarde du fichier actuel
 */
function createBackup() {
  if (fs.existsSync(TROPHIES_FILE)) {
    fs.copyFileSync(TROPHIES_FILE, BACKUP_FILE);
    console.log(`💾 Sauvegarde créée: ${BACKUP_FILE}`);
  }
}

/**
 * Génère des données de test pour développement
 */
function generateTestData() {
  console.log('🧪 Génération de données de test...');
  
  // Simuler quelques trophées débloqués
  const testData = {
    unlockedTrophies: ['welcome', 'night_owl'],
    visitedProjects: ['project1', 'project2', 'project3'],
    visitedSocialLinks: ['linkedin', 'github'],
    viewedSections: ['home', 'portfolio'],
    cv_downloaded: 'true',
    theme: 'dark',
    visitStartTime: Date.now() - (6 * 60 * 1000) // 6 minutes ago
  };

  console.log('🔧 Données de test à injecter dans localStorage:');
  console.log(JSON.stringify(testData, null, 2));
  
  // Créer un script pour injecter les données
  const script = `
// Script d'injection de données de test
// Coller ce code dans la console du navigateur

const testData = ${JSON.stringify(testData)};

Object.entries(testData).forEach(([key, value]) => {
  localStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value));
});

console.log('✅ Données de test injectées!');
console.log('🔄 Rechargez la page pour voir les trophées débloqués.');
`;

  fs.writeFileSync(path.join(__dirname, 'inject-test-data.js'), script);
  console.log('📝 Script d\'injection créé: scripts/inject-test-data.js');
}

// CLI
const command = process.argv[2];

switch (command) {
  case 'validate':
    validateTrophies();
    break;
  
  case 'backup':
    createBackup();
    break;
  
  case 'generate-test':
    generateTestData();
    break;
  
  default:
    console.log(`
🏆 Utilitaires de gestion des trophées

Usage: node scripts/trophies-utils.js [command]

Commandes disponibles:
  validate       Valide la structure du fichier trophies.json
  backup         Crée une sauvegarde du fichier actuel
  generate-test  Génère des données de test

Exemples:
  node scripts/trophies-utils.js validate
  node scripts/trophies-utils.js generate-test
`);
}
