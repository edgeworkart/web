describe('Admin Dashboard', () => {
  beforeEach(() => {
    // Use existing seed data for admin credentials
    const adminCredentials = {
      email: 'admin@example.com',
      password: 'password123'
    };

    // Visit login page and perform login
    cy.visit('/login');
    cy.get('input[name="email"]').type(adminCredentials.email);
    cy.get('input[name="password"]').type(adminCredentials.password);
    cy.get('button[type="submit"]').click();

    // Ensure login was successful
    cy.url().should('include', '/admin/dashboard');
  });

  it('should load the admin dashboard with a welcome message', () => {
    // Visit the admin dashboard
    cy.visit('/admin/dashboard');

    // Check for a welcome message or known text
    cy.contains('Welcome to the Admin Dashboard').should('be.visible');
  });

  it('should navigate to the Artworks tab and display a list of artworks', () => {
    // Visit the admin dashboard
    cy.visit('/admin/dashboard');

    // Navigate to the Artworks tab
    cy.get('a[href="/admin/artworks"]').click();

    // Verify a list of artworks is shown
    cy.get('.artwork-list').should('be.visible');
    cy.get('.artwork-item').should('have.length.greaterThan', 0);
  });

  it('should allow creating a new artwork', () => {
    // Visit the admin dashboard
    cy.visit('/admin/dashboard');

    // Navigate to the Artworks tab
    cy.get('a[href="/admin/artworks"]').click();

    // Open the modal or form to create a new artwork
    cy.get('button#create-artwork').click();

    // Fill out the form
    cy.get('input[name="title"]').type('New Artwork');
    cy.get('textarea[name="description"]').type('Description of the new artwork');
    cy.get('input[name="artist"]').type('Artist Name');

    // Submit the form
    cy.get('button[type="submit"]').click();

    // Verify the new artwork is in the list
    cy.contains('New Artwork').should('be.visible');
  });
}); 