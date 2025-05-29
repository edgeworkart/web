describe('Admin Login Flow', () => {
  it('logs in and redirects to admin dashboard', () => {
    cy.visit('/login');

    // Fill in the login form
    cy.get('input[name="email"]').type('admin@example.com');
    cy.get('input[name="password"]').type('password');

    // Submit the form
    cy.get('button[type="submit"]').click();

    // Confirm redirection to the admin dashboard
    cy.url().should('include', '/admin/dashboard');
    cy.contains('Admin Dashboard').should('be.visible');
  });
}); 