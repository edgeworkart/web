describe('Checkout Flow', () => {
  beforeEach(() => {
    cy.visit('/');

    // Add the first artwork to the cart
    cy.get('[data-cy=artwork-item]').first().within(() => {
      cy.get('[data-cy=add-to-cart]').click();
    });
  });

  it('completes the checkout process and redirects to Shopify', () => {
    cy.intercept('POST', '/checkout', {
      statusCode: 200,
      body: { redirectUrl: 'https://shopify.com/checkout' },
    }).as('checkoutRequest');

    // Click the checkout button
    cy.get('[data-cy=checkout-button]').click();

    // Confirm the POST request to /checkout
    cy.wait('@checkoutRequest').its('response.statusCode').should('eq', 200);

    // Verify redirection to Shopify checkout
    cy.url().should('include', 'shopify.com/checkout');
  });
}); 