/**
 * Content Migration Script: Replace name references with key references
 * 
 * This script updates all content files (projects, experiences, educations)
 * to use the new key-based system instead of name-based references
 */

const fs = require('fs');
const path = require('path');

// Configuration
const CONTENT_DIR = path.join(__dirname, '..', 'content');
const MAPPING_FILE = path.join(__dirname, 'migration-output', 'name-to-key-mapping.json');

// Load name-to-key mapping
let nameToKeyMapping;
try {
    const mappingContent = fs.readFileSync(MAPPING_FILE, 'utf8');
    nameToKeyMapping = JSON.parse(mappingContent);
} catch (error) {
    console.error('❌ Error loading mapping file:', error.message);
    process.exit(1);
}

/**
 * Build reverse mapping: name -> key for all languages
 */
function buildCompleteMappings() {
    const mappings = {};
    
    Object.keys(nameToKeyMapping).forEach(category => {
        mappings[category] = {};
        
        // Merge FR and EN mappings
        Object.assign(mappings[category], nameToKeyMapping[category].fr);
        Object.assign(mappings[category], nameToKeyMapping[category].en);
    });
    
    return mappings;
}

const completeMappings = buildCompleteMappings();

/**
 * Process a single markdown file
 */
function processMarkdownFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    let changes = [];
    
    // Extract frontmatter
    const frontmatterMatch = content.match(/^\+\+\+\n([\s\S]*?)\n\+\+\+/);
    if (!frontmatterMatch) {
        return { modified: false, changes: [] };
    }
    
    let frontmatter = frontmatterMatch[1];
    const originalFrontmatter = frontmatter;
    
    // Categories to process
    const categories = [
        { field: 'programming_languages', mapping: 'programming_languages' },
        { field: 'frameworks_engines', mapping: 'frameworks_engines' },
        { field: 'specialties', mapping: 'specialties' },
        { field: 'soft_skills', mapping: 'soft_skills' },
        { field: 'tools', mapping: 'tools' }
    ];
    
    categories.forEach(({ field, mapping }) => {
        // Match all occurrences of the field with arrays (single or multi-line)
        const fieldRegex = new RegExp(`${field}\\s*=\\s*\\[([\\s\\S]*?)\\]`, 'gm');
        
        frontmatter = frontmatter.replace(fieldRegex, (match, items) => {
            // Extract all quoted strings from the array
            const itemList = items.match(/"([^"]+)"/g);
            if (!itemList || itemList.length === 0) return match;
            
            // Check if original format was multi-line
            const isMultiline = items.includes('\n');
            
            const newItems = itemList.map(item => {
                const name = item.replace(/"/g, '');
                const key = completeMappings[mapping][name];
                
                if (key) {
                    changes.push(`${field}: "${name}" → "${key}"`);
                    modified = true;
                    return `"${key}"`;
                }
                
                console.warn(`   ⚠️  No key found for ${field}: "${name}" in ${path.basename(filePath)}`);
                return item;
            });
            
            // Preserve original formatting style
            if (isMultiline) {
                return `${field} = [\n  ${newItems.join(',\n  ')}\n]`;
            } else {
                return `${field} = [ ${newItems.join(', ')} ]`;
            }
        });
    });
    
    if (modified) {
        const newContent = content.replace(originalFrontmatter, frontmatter);
        fs.writeFileSync(filePath, newContent, 'utf8');
    }
    
    return { modified, changes };
}

/**
 * Process all markdown files in a directory
 */
function processDirectory(dirPath, relativePath = '') {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });
    let totalFiles = 0;
    let modifiedFiles = 0;
    let totalChanges = 0;
    
    entries.forEach(entry => {
        const fullPath = path.join(dirPath, entry.name);
        const relPath = path.join(relativePath, entry.name);
        
        if (entry.isDirectory()) {
            const subResults = processDirectory(fullPath, relPath);
            totalFiles += subResults.totalFiles;
            modifiedFiles += subResults.modifiedFiles;
            totalChanges += subResults.totalChanges;
        } else if (entry.name.endsWith('.md')) {
            totalFiles++;
            const result = processMarkdownFile(fullPath);
            
            if (result.modified) {
                modifiedFiles++;
                totalChanges += result.changes.length;
                console.log(`   ✅ ${relPath}`);
                result.changes.forEach(change => {
                    console.log(`      - ${change}`);
                });
            }
        }
    });
    
    return { totalFiles, modifiedFiles, totalChanges };
}

/**
 * Main migration function
 */
function migrateContent() {
    console.log('🚀 Starting content migration to key-based references...\n');
    
    const contentTypes = ['projects', 'experiences', 'educations'];
    let grandTotal = { files: 0, modified: 0, changes: 0 };
    
    contentTypes.forEach(type => {
        const dirPath = path.join(CONTENT_DIR, type);
        
        if (!fs.existsSync(dirPath)) {
            console.log(`⚠️  Directory not found: ${type}\n`);
            return;
        }
        
        console.log(`📂 Processing ${type}...`);
        const results = processDirectory(dirPath, type);
        
        console.log(`   📊 Files: ${results.modifiedFiles}/${results.totalFiles} modified`);
        console.log(`   🔄 Total changes: ${results.totalChanges}\n`);
        
        grandTotal.files += results.totalFiles;
        grandTotal.modified += results.modifiedFiles;
        grandTotal.changes += results.totalChanges;
    });
    
    console.log('📈 Migration Summary:');
    console.log(`   Total files processed: ${grandTotal.files}`);
    console.log(`   Files modified: ${grandTotal.modified}`);
    console.log(`   Total changes: ${grandTotal.changes}`);
    
    console.log('\n✨ Content migration complete!');
}

// Run migration
try {
    migrateContent();
} catch (error) {
    console.error('❌ Content migration failed:', error);
    process.exit(1);
}
