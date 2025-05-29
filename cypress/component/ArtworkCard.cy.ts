import React from 'react';
import { mount } from 'cypress/react';
import ArtworkCard from '../../src/components/ArtworkCard';

describe('ArtworkCard Component', () => {
  it('renders the artwork card with title, image, and price', () => {
    const props = {
      title: 'Sample Artwork',
      imageUrl: '/sample.jpg',
      price: '$100',
    };
    mount(<ArtworkCard {...props} />);
    cy.get('[data-cy=artwork-title]').should('contain', 'Sample Artwork');
    cy.get('[data-cy=artwork-image]').should('have.attr', 'src', '/sample.jpg');
    cy.get('[data-cy=artwork-price]').should('contain', '$100');
  });
}); 