describe('Artwork Browsing and Cart', () => {
  it('displays artwork list on homepage', () => {
    cy.visit('/');

    // Verify a list of artworks is shown
    cy.get('[data-cy=artwork-list]').should('be.visible');
    cy.get('[data-cy=artwork-item]').should('have.length.greaterThan', 0);
  });

  it('adds artwork to cart', () => {
    cy.visit('/');

    // Add the first artwork to the cart
    cy.get('[data-cy=artwork-item]').first().within(() => {
      cy.get('[data-cy=add-to-cart]').click();
    });

    // Verify the artwork is added to the cart
    cy.get('[data-cy=cart]').click();
    cy.get('[data-cy=cart-item]').should('have.length.greaterThan', 0);
  });
}); 