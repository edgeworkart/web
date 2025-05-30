import React from 'react';
import { mount } from 'cypress/react18';
import ArtworkCard from '../../components/ArtworkCard';

describe('ArtworkCard', () => {
  it('renders with title, image, and price', () => {
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