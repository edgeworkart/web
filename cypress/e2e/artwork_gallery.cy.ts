describe('Artwork Gallery', () => {
  it('renders a list of artworks with image, title, and price', () => {
    cy.visit('/');

    // Verify a list of artworks is shown
    cy.get('[data-cy=artwork-list]').should('be.visible');
    cy.get('[data-cy=artwork-item]').should('have.length.greaterThan', 0);

    // Check for image, title, and price per artwork
    cy.get('[data-cy=artwork-item]').each(($el) => {
      cy.wrap($el).find('[data-cy=artwork-image]').should('be.visible');
      cy.wrap($el).find('[data-cy=artwork-title]').should('be.visible');
      cy.wrap($el).find('[data-cy=artwork-price]').should('be.visible');
    });
  });

  it('adds an artwork to the cart', () => {
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