#!/usr/bin/env node

/**
 * Générateur de configuration pour les badges de technologie
 * Usage: node generate-tech-config.js
 */

const fs = require('fs');
const path = require('path');

// Couleurs populaires pour les technologies
const techColors = {
    'React': '#61DAFB',
    'Vue.js': '#4FC08D',
    'Angular': '#DD0031',
    'JavaScript': '#F7DF1E',
    'TypeScript': '#3178C6',
    'Node.js': '#339933',
    'Python': '#3776AB',
    'Java': '#ED8B00',
    'C#': '#239120',
    'C++': '#00599C',
    'PHP': '#777BB4',
    'Ruby': '#CC342D',
    'Go': '#00ADD8',
    'Rust': '#000000',
    'Swift': '#FA7343',
    'Kotlin': '#0095D5',
    'HTML': '#E34F26',
    'CSS': '#1572B6',
    'SASS': '#CC6699',
    'Bootstrap': '#7952B3',
    'Tailwind': '#06B6D4',
    'Material-UI': '#0081CB',
    'Redux': '#764ABC',
    'MobX': '#FF9955',
    'RxJS': '#B7178C',
    'Express': '#000000',
    'NestJS': '#E0234E',
    'Django': '#092E20',
    'Flask': '#000000',
    'Laravel': '#FF2D20',
    'Spring': '#6DB33F',
    'MongoDB': '#47A248',
    'PostgreSQL': '#336791',
    'MySQL': '#4479A1',
    'Redis': '#DC382D',
    'SQLite': '#003B57',
    'AWS': '#FF9900',
    'Azure': '#0078D4',
    'GCP': '#4285F4',
    'Firebase': '#FFCA28',
    'Heroku': '#430098',
    'Netlify': '#00C7B7',
    'Vercel': '#000000',
    'Docker': '#2496ED',
    'Kubernetes': '#326CE5',
    'Git': '#F05032',
    'GitHub': '#181717',
    'GitLab': '#FC6D26',
    'Jenkins': '#D24939',
    'CircleCI': '#343434',
    'Jest': '#C21325',
    'Cypress': '#17202C',
    'Playwright': '#2EAD33',
    'Webpack': '#8DD6F9',
    'Vite': '#646CFF',
    'Rollup': '#EC4A3F',
    'ESLint': '#4B32C3',
    'Prettier': '#F7B93E',
    'Babel': '#F9DC3E',
    'PostMan': '#FF6C37',
    'Insomnia': '#4000BF',
    'GraphQL': '#E10098',
    'Apollo': '#311C87',
    'Prisma': '#2D3748',
    'Unity': '#000000',
    'Unreal': '#0E1128',
    'Three.js': '#000000',
    'D3.js': '#F9A03C',
    'Chart.js': '#FF6384',
    'Figma': '#F24E1E',
    'Adobe XD': '#FF61F6',
    'Sketch': '#F7B500'
};

// Emojis pour les technologies
const techEmojis = {
    'React': '⚛️',
    'Vue.js': '💚',
    'Angular': '🅰️',
    'JavaScript': '🟨',
    'TypeScript': '🔷',
    'Node.js': '🟢',
    'Python': '🐍',
    'Java': '☕',
    'C#': '🟦',
    'C++': '🔵',
    'PHP': '🐘',
    'Ruby': '💎',
    'Go': '🐹',
    'Rust': '🦀',
    'Swift': '🍎',
    'Kotlin': '🎯',
    'HTML': '🌐',
    'CSS': '🎨',
    'SASS': '💅',
    'Bootstrap': '🅱️',
    'Tailwind': '💨',
    'Material-UI': '🔧',
    'Redux': '🔄',
    'MobX': '📦',
    'RxJS': '📡',
    'Express': '🚀',
    'NestJS': '🏰',
    'Django': '🎸',
    'Flask': '🌶️',
    'Laravel': '🎼',
    'Spring': '🌱',
    'MongoDB': '🍃',
    'PostgreSQL': '🐘',
    'MySQL': '🗄️',
    'Redis': '⚡',
    'SQLite': '📊',
    'AWS': '☁️',
    'Azure': '⭐',
    'GCP': '🌩️',
    'Firebase': '🔥',
    'Heroku': '💜',
    'Netlify': '🌊',
    'Vercel': '▲',
    'Docker': '🐋',
    'Kubernetes': '☸️',
    'Git': '📚',
    'GitHub': '🐱',
    'GitLab': '🦊',
    'Jenkins': '👨‍🔧',
    'CircleCI': '⭕',
    'Jest': '🃏',
    'Cypress': '🌲',
    'Playwright': '🎭',
    'Webpack': '📦',
    'Vite': '⚡',
    'Rollup': '📦',
    'ESLint': '📏',
    'Prettier': '💅',
    'Babel': '🏗️',
    'PostMan': '📮',
    'Insomnia': '😴',
    'GraphQL': '📊',
    'Apollo': '🚀',
    'Prisma': '🔺',
    'Unity': '🎮',
    'Unreal': '🏗️',
    'Three.js': '🎯',
    'D3.js': '📊',
    'Chart.js': '📈',
    'Figma': '🎨',
    'Adobe XD': '✨',
    'Sketch': '✏️'
};

function generateTechConfig(technologies) {
    const config = technologies.map((tech, index) => ({
        name: tech,
        icon: techEmojis[tech] || '🔧',
        color: techColors[tech] || '#666666',
        enabled: false, // Par défaut désactivé
        order: index + 1
    }));

    return {
        technologies: config
    };
}

// Technologies à ajouter au système
const availableTechnologies = Object.keys(techColors).sort();

// Générer la configuration
const config = generateTechConfig(availableTechnologies);

// Sauvegarder dans un fichier
const outputPath = path.join(__dirname, 'technologies-generated.yml');
const yamlContent = `# Configuration générée automatiquement pour les badges de technologie
# Copiez les technologies souhaitées dans data/technologies.yml

technologies:
${config.technologies.map(tech => `  - name: "${tech}"
    icon: "${tech.icon}"
    color: "${tech.color}"
    enabled: ${tech.enabled}
    order: ${tech.order}`).join('\n\n')}
`;

fs.writeFileSync(outputPath, yamlContent, 'utf8');

console.log(`✅ Configuration générée dans ${outputPath}`);
console.log(`📝 ${config.technologies.length} technologies disponibles`);
console.log(`🔧 Modifiez 'enabled: true' pour activer les technologies souhaitées`);
