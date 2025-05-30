import React from 'react';
import { mount } from 'cypress/react18';
import CartSummary from '../../src/components/CartSummary';

describe('CartSummary', () => {
  it('renders with items', () => {
    const cartItems = [
      { id: 1, name: 'Item 1', price: 10 },
      { id: 2, name: 'Item 2', price: 20 }
    ];
    mount(React.createElement(CartSummary, { items: cartItems }));
    cy.get('[data-cy=cart-item]').should('have.length', cartItems.length);
  });
}); 