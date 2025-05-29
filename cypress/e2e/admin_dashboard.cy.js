describe('Admin Dashboard', () => {
  beforeEach(() => {
    // Use existing seed data for admin credentials
    const adminCredentials = {
      email: 'admin@example.com',
      password: 'password123'
    };

    // Use cy.session to manage authentication state
    cy.session('admin', () => {
      cy.visit('/login');
      cy.get('[data-cy=email]').type(adminCredentials.email);
      cy.get('[data-cy=password]').type(adminCredentials.password);
      cy.get('[data-cy=submit]').click();
      cy.url().should('include', '/admin/dashboard');
    });
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
    cy.get('[data-cy=artworks-tab]').click();

    // Verify a list of artworks is shown
    cy.get('[data-cy=artwork-list]').should('be.visible');
    cy.get('[data-cy=artwork-item]').should('have.length.greaterThan', 0);
  });

  it('should allow creating a new artwork', () => {
    // Visit the admin dashboard
    cy.visit('/admin/dashboard');

    // Navigate to the Artworks tab
    cy.get('[data-cy=artworks-tab]').click();

    // Open the modal or form to create a new artwork
    cy.get('[data-cy=create-artwork]').click();

    // Fill out the form
    cy.get('[data-cy=title]').type('New Artwork');
    cy.get('[data-cy=description]').type('Description of the new artwork');
    cy.get('[data-cy=artist]').type('Artist Name');

    // Submit the form
    cy.get('[data-cy=submit]').click();

    // Verify the new artwork is in the list
    cy.contains('New Artwork').should('be.visible');
  });
}); 