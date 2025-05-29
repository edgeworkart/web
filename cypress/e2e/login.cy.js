describe('Admin Login Flow', () => {
  it('logs in and redirects to admin dashboard', () => {
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
    });

    // Confirm redirection to the admin dashboard
    cy.url().should('include', '/admin/dashboard');
    cy.contains('Admin Dashboard').should('be.visible');

    // Confirm admin-specific content is visible
    cy.contains('Admin Tools').should('be.visible');
  });
}); 