import React from 'react';
import { mount } from 'cypress/react';
import Login from '../../src/components/Login';

describe('LoginForm Component', () => {
  beforeEach(() => {
    cy.intercept('POST', '/api/login', { statusCode: 200, body: { success: true } }).as('loginRequest');
  });

  it('renders the login form and submits successfully', () => {
    mount(<Login />);
    cy.get('[data-cy=email]').type('test@example.com');
    cy.get('[data-cy=password]').type('password123');
    cy.get('[data-cy=submit]').click();
    cy.wait('@loginRequest').its('response.statusCode').should('eq', 200);
  });
}); 