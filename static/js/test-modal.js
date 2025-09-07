// Test script pour vérifier les données du modal person
console.log('=== TEST PERSON MODAL DATA ===');

// Vérifier que les données sont chargées
console.log('People loaded:', window.portfolioPeople ? window.portfolioPeople.length : 'NOT LOADED');
console.log('Testimonials loaded:', window.portfolioTestimonials ? window.portfolioTestimonials.length : 'NOT LOADED');
console.log('Projects loaded:', window.portfolioProjects ? window.portfolioProjects.length : 'NOT LOADED');

// Tester une personne spécifique
const testPersonId = 'clement-garcia';
const testPerson = window.portfolioPeople ? window.portfolioPeople.find(p => p.id === testPersonId) : null;
console.log(`Person ${testPersonId}:`, testPerson);

// Trouver les projets pour cette personne
if (window.portfolioProjects) {
    const personProjects = window.portfolioProjects.filter(project => 
        project.contributors && project.contributors.some(contributor => contributor.person === testPersonId)
    );
    console.log(`Projects for ${testPersonId}:`, personProjects);
}

// Tester l'ouverture du modal (optionnel)
// window.openPersonModal && window.openPersonModal(testPersonId);
