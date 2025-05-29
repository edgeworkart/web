import React from 'react';
import { mount } from 'cypress/react';
import Cart from '../../src/components/Cart';

describe('CartSummary Component', () => {
  it('renders the cart summary with items', () => {
    const cartItems = [
      { id: 1, name: 'Item 1', price: 10 },
      { id: 2, name: 'Item 2', price: 20 },
    ];
    mount(<Cart items={cartItems} />);
    cy.get('[data-cy=cart-item]').should('have.length', cartItems.length);
  });
}); 