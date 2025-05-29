describe('Invalid Login Attempts', () => {
  it('shows error and counts against max attempt limit', () => {
    cy.visit('/login');

    // Attempt to login with invalid credentials
    cy.get('[data-cy=email]').type('invalid@example.com');
    cy.get('[data-cy=password]').type('wrongpassword');
    cy.get('[data-cy=submit]').click();

    // Verify error message is shown
    cy.contains('Invalid credentials').should('be.visible');

    // Attempt multiple times to trigger max attempt limit
    for (let i = 0; i < 8; i++) {
      cy.get('[data-cy=submit]').click();
    }

    // Verify max attempt limit message is shown
    cy.contains('Too many failed attempts. Please try again later.').should('be.visible');
  });
}); 