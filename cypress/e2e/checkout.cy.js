describe('Shopify Checkout Flow', () => {
  it('triggers Shopify checkout and redirects', () => {
    cy.visit('/cart');

    // Assume the cart is pre-filled with items
    cy.get('[data-cy=checkout-button]').click();

    // Verify redirection to Shopify checkout
    cy.url().should('include', 'shopify.com');
  });
}); 