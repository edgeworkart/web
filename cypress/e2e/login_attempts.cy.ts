describe('Login Attempt Limit', () => {
  it('shows error after too many failed login attempts and resets after successful login', () => {
    cy.visit('/login');

    // Attempt to login with invalid credentials 9 times
    for (let i = 0; i < 9; i++) {
      cy.get('[data-cy=email]').clear().type('invalid@example.com');
      cy.get('[data-cy=password]').clear().type('wrongpassword');
      cy.get('[data-cy=submit]').click();

      // Verify error message is shown
      cy.contains('Invalid credentials').should('be.visible');
    }

    // Verify 'Too many attempts' error is shown on the 8th or 9th attempt
    cy.contains('Too many failed attempts. Please try again later.').should('be.visible');

    // Attempt a successful login
    const adminCredentials = {
      email: 'admin@example.com',
      password: 'password123'
    };
    cy.get('[data-cy=email]').clear().type(adminCredentials.email);
    cy.get('[data-cy=password]').clear().type(adminCredentials.password);
    cy.get('[data-cy=submit]').click();

    // Confirm redirection to the admin dashboard
    cy.url().should('include', '/admin/dashboard');

    // Attempt to login with invalid credentials again
    cy.visit('/login');
    cy.get('[data-cy=email]').clear().type('invalid@example.com');
    cy.get('[data-cy=password]').clear().type('wrongpassword');
    cy.get('[data-cy=submit]').click();

    // Verify error message is shown but not 'Too many attempts'
    cy.contains('Invalid credentials').should('be.visible');
    cy.contains('Too many failed attempts. Please try again later.').should('not.exist');
  });
}); 