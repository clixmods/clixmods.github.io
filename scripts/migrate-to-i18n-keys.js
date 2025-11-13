/**
 * Migration Script: Convert data files from name-based to key-based with i18n support
 * 
 * This script:
 * 1. Reads all data files (programming_languages, frameworks_engines, specialties, soft_skills, tools)
 * 2. Generates unique keys for each item
 * 3. Creates i18n translation files (fr.yaml and en.yaml)
 * 4. Updates data files to use keys instead of names
 * 5. Generates a mapping file for content migration
 */

const fs = require('fs');
const path = require('path');

// Configuration
const DATA_DIR = path.join(__dirname, '..', 'data');
const I18N_DIR = path.join(__dirname, '..', 'themes', 'portfolio.theme', 'i18n');
const OUTPUT_DIR = path.join(__dirname, 'migration-output');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Data file configurations
const DATA_FILES = [
    {
        name: 'programming_languages',
        prefix: 'lang_',
        hasEnVersion: false
    },
    {
        name: 'frameworks_engines',
        prefix: 'fw_',
        hasEnVersion: false
    },
    {
        name: 'specialties',
        prefix: 'spec_',
        hasEnVersion: true
    },
    {
        name: 'soft_skills',
        prefix: 'skill_',
        hasEnVersion: true
    },
    {
        name: 'tools',
        prefix: 'tool_',
        hasEnVersion: true
    }
];

/**
 * Convert string to snake_case key
 */
function toSnakeCase(str) {
    return str
        .normalize('NFD')               // Normalize unicode
        .replace(/[\u0300-\u036f]/g, '') // Remove diacritics (accents)
        .replace(/\s+/g, '_')           // Replace spaces with underscores
        .replace(/[()]/g, '')           // Remove parentheses
        .replace(/[&]/g, 'and')         // Replace & with 'and'
        .replace(/[#]/g, 'sharp')       // Replace # with 'sharp'
        .replace(/\+\+/g, 'pp')         // Replace ++ with 'pp'
        .replace(/\./g, '_')            // Replace dots with underscores
        .replace(/-/g, '_')             // Replace hyphens with underscores
        .replace(/[^\w_]/g, '')         // Remove non-word characters except underscore
        .replace(/_+/g, '_')            // Replace multiple underscores with single
        .replace(/^_|_$/g, '')          // Remove leading/trailing underscores
        .toLowerCase();
}

/**
 * Generate unique key with prefix
 */
function generateKey(name, prefix, existingKeys) {
    let baseKey = prefix + toSnakeCase(name);
    let key = baseKey;
    let counter = 2;
    
    // Handle duplicates
    while (existingKeys.has(key)) {
        key = `${baseKey}_${counter}`;
        counter++;
    }
    
    existingKeys.add(key);
    return key;
}

/**
 * Read JSON file
 */
function readJsonFile(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(content);
    } catch (error) {
        console.error(`Error reading ${filePath}:`, error.message);
        return null;
    }
}

/**
 * Write JSON file with formatting
 */
function writeJsonFile(filePath, data) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
}

/**
 * Main migration function
 */
function migrate() {
    console.log('🚀 Starting migration to i18n keys...\n');
    
    const allKeys = new Set();
    const translations = { fr: {}, en: {} };
    const nameToKeyMapping = {};
    
    // Process each data file
    DATA_FILES.forEach(config => {
        console.log(`📂 Processing ${config.name}...`);
        
        const frPath = path.join(DATA_DIR, `${config.name}.json`);
        const enPath = path.join(DATA_DIR, `${config.name}.en.json`);
        
        const frData = readJsonFile(frPath);
        if (!frData) {
            console.log(`   ⚠️  Skipping ${config.name} (file not found)\n`);
            return;
        }
        
        const enData = config.hasEnVersion ? readJsonFile(enPath) : null;
        
        // Initialize mapping for this category
        nameToKeyMapping[config.name] = { fr: {}, en: {} };
        
        // Process each item
        const transformedData = frData.map((item, index) => {
            // Generate key
            const key = generateKey(item.name, config.prefix, allKeys);
            
            // Store name-to-key mapping (French)
            nameToKeyMapping[config.name].fr[item.name] = key;
            
            // Add translations for name
            translations.fr[key] = item.name;
            
            // Add translations for subtitle if exists
            if (item.subtitle) {
                const subtitleKey = `${key}_subtitle`;
                translations.fr[subtitleKey] = item.subtitle;
            }
            
            // Handle English version
            if (enData && enData[index]) {
                const enItem = enData[index];
                nameToKeyMapping[config.name].en[enItem.name] = key;
                translations.en[key] = enItem.name;
                
                if (enItem.subtitle) {
                    const subtitleKey = `${key}_subtitle`;
                    translations.en[subtitleKey] = enItem.subtitle;
                }
            } else {
                // If no English version, use French as fallback
                translations.en[key] = item.name;
                if (item.subtitle) {
                    translations.en[`${key}_subtitle`] = item.subtitle;
                }
            }
            
            // Transform item structure
            const transformed = {
                key: key,
                ...item
            };
            
            // Remove old name and subtitle fields
            delete transformed.name;
            if (item.subtitle) {
                delete transformed.subtitle;
            }
            
            return transformed;
        });
        
        // Write transformed data
        const outputPath = path.join(OUTPUT_DIR, `${config.name}.json`);
        writeJsonFile(outputPath, transformedData);
        console.log(`   ✅ Transformed data written to ${outputPath}`);
        console.log(`   📊 Processed ${transformedData.length} items\n`);
    });
    
    // Write i18n files
    console.log('📝 Generating i18n translation files...');
    
    // Convert to YAML format
    const frYaml = Object.entries(translations.fr)
        .sort((a, b) => a[0].localeCompare(b[0]))
        .map(([key, value]) => `${key}: "${value.replace(/"/g, '\\"')}"`)
        .join('\n');
    
    const enYaml = Object.entries(translations.en)
        .sort((a, b) => a[0].localeCompare(b[0]))
        .map(([key, value]) => `${key}: "${value.replace(/"/g, '\\"')}"`)
        .join('\n');
    
    const frYamlPath = path.join(OUTPUT_DIR, 'fr-additions.yaml');
    const enYamlPath = path.join(OUTPUT_DIR, 'en-additions.yaml');
    
    fs.writeFileSync(frYamlPath, frYaml, 'utf8');
    fs.writeFileSync(enYamlPath, enYaml, 'utf8');
    
    console.log(`   ✅ French translations: ${frYamlPath}`);
    console.log(`   ✅ English translations: ${enYamlPath}`);
    console.log(`   📊 Total keys: ${allKeys.size}\n`);
    
    // Write mapping file for content migration
    const mappingPath = path.join(OUTPUT_DIR, 'name-to-key-mapping.json');
    writeJsonFile(mappingPath, nameToKeyMapping);
    console.log(`📋 Name-to-key mapping: ${mappingPath}\n`);
    
    // Generate statistics
    console.log('📈 Migration Statistics:');
    console.log(`   Total unique keys: ${allKeys.size}`);
    DATA_FILES.forEach(config => {
        const count = Object.keys(nameToKeyMapping[config.name].fr).length;
        console.log(`   ${config.name}: ${count} items`);
    });
    
    console.log('\n✨ Migration preparation complete!');
    console.log('\n📝 Next steps:');
    console.log('   1. Review generated files in scripts/migration-output/');
    console.log('   2. Merge fr-additions.yaml and en-additions.yaml into i18n files');
    console.log('   3. Replace data/*.json files with transformed versions');
    console.log('   4. Run content migration script');
}

// Run migration
try {
    migrate();
} catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
}
