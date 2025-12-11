#!/usr/bin/env node

/**
 * Migration Script: Convert content files to use i18n keys instead of French names
 * 
 * This script migrates all content files (projects, educations, experiences) to use
 * i18n keys (e.g., "lang_csharp", "fw_unity") instead of French names (e.g., "C#", "Unity").
 * 
 * Usage: node scripts/migrate-content-to-keys.js
 */

const fs = require('fs');
const path = require('path');

// Load the name-to-key mapping
const mappingPath = path.join(__dirname, '..', 'data', 'name-to-key-mapping.json');
const mapping = JSON.parse(fs.readFileSync(mappingPath, 'utf8'));

// Content directories to process
const contentDirs = [
  path.join(__dirname, '..', 'content', 'projects'),
  path.join(__dirname, '..', 'content', 'educations'),
  path.join(__dirname, '..', 'content', 'experiences')
];

// Categories to migrate
const categories = {
  'programming_languages': mapping.programming_languages.fr,
  'frameworks_engines': mapping.frameworks_engines.fr,
  'specialties': mapping.specialties.fr,
  'soft_skills': mapping.soft_skills.fr,
  'tools': mapping.tools.fr
};

/**
 * Process a single content file
 */
function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  
  // Skip English files
  if (filePath.endsWith('.en.md')) {
    console.log(`⏭️  Skipping English file: ${path.basename(filePath)}`);
    return;
  }
  
  console.log(`\n📄 Processing: ${path.basename(filePath)}`);
  
  // Process each category
  for (const [category, nameToKeyMap] of Object.entries(categories)) {
    // Find array declarations in frontmatter (TOML or YAML)
    const tomlArrayRegex = new RegExp(`${category}\\s*=\\s*\\[([^\\]]*)\\]`, 'g');
    const yamlArrayRegex = new RegExp(`${category}:\\s*\\n((?:\\s*-\\s*.+\\n)+)`, 'g');
    
    // Process TOML arrays
    content = content.replace(tomlArrayRegex, (match, arrayContent) => {
      let newArrayContent = arrayContent;
      let categoryModified = false;
      
      // Replace each French name with its key
      for (const [frenchName, key] of Object.entries(nameToKeyMap)) {
        // Match quoted strings
        const quotedRegex = new RegExp(`["']${frenchName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["']`, 'g');
        if (quotedRegex.test(newArrayContent)) {
          newArrayContent = newArrayContent.replace(quotedRegex, `"${key}"`);
          console.log(`  ✓ ${category}: "${frenchName}" → "${key}"`);
          categoryModified = true;
          modified = true;
        }
      }
      
      return `${category} = [${newArrayContent}]`;
    });
    
    // Process YAML arrays
    content = content.replace(yamlArrayRegex, (match, arrayContent) => {
      let newArrayContent = arrayContent;
      let categoryModified = false;
      
      // Replace each French name with its key
      for (const [frenchName, key] of Object.entries(nameToKeyMap)) {
        // Match YAML list items
        const yamlItemRegex = new RegExp(`-\\s+["']?${frenchName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["']?`, 'g');
        if (yamlItemRegex.test(newArrayContent)) {
          newArrayContent = newArrayContent.replace(yamlItemRegex, `- ${key}`);
          console.log(`  ✓ ${category}: "${frenchName}" → "${key}"`);
          categoryModified = true;
          modified = true;
        }
      }
      
      return `${category}:\n${newArrayContent}`;
    });
  }
  
  // Write back if modified
  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`  ✅ File updated`);
  } else {
    console.log(`  ⏭️  No changes needed`);
  }
}

/**
 * Process all files in a directory recursively
 */
function processDirectory(dirPath) {
  if (!fs.existsSync(dirPath)) {
    console.log(`⚠️  Directory not found: ${dirPath}`);
    return;
  }
  
  const files = fs.readdirSync(dirPath);
  
  for (const file of files) {
    const filePath = path.join(dirPath, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      processDirectory(filePath);
    } else if (file.endsWith('.md')) {
      processFile(filePath);
    }
  }
}

// Main execution
console.log('🚀 Starting content migration to i18n keys...\n');
console.log('📋 Categories to migrate:');
for (const category of Object.keys(categories)) {
  console.log(`   - ${category}`);
}
console.log('');

// Process each content directory
for (const dir of contentDirs) {
  console.log(`\n📁 Processing directory: ${path.relative(path.join(__dirname, '..'), dir)}`);
  processDirectory(dir);
}

console.log('\n\n✨ Migration complete!');
console.log('⚠️  Important: Review the changes and test your site before committing.');
