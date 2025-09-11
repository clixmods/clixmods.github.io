// Test script to verify person modal data
console.log('=== TEST PERSON MODAL DATA ===');

// Verify that data is loaded
console.log('People loaded:', window.portfolioPeople ? window.portfolioPeople.length : 'NOT LOADED');
console.log('Testimonials loaded:', window.portfolioTestimonials ? window.portfolioTestimonials.length : 'NOT LOADED');
console.log('Projects loaded:', window.portfolioProjects ? window.portfolioProjects.length : 'NOT LOADED');

// Test a specific person
const testPersonId = 'clement-garcia';
const testPerson = window.portfolioPeople ? window.portfolioPeople.find(p => p.id === testPersonId) : null;
console.log(`Person ${testPersonId}:`, testPerson);

// Find projects for this person
if (window.portfolioProjects) {
    const personProjects = window.portfolioProjects.filter(project => 
        project.contributors && project.contributors.some(contributor => contributor.person === testPersonId)
    );
    console.log(`Projects for ${testPersonId}:`, personProjects);
}

// Test modal opening (optional)
// window.openPersonModal && window.openPersonModal(testPersonId);
