import React from 'react'
import { mount } from 'cypress/react18'
import LoginForm from '../../components/LoginForm'

describe('LoginForm', () => {
  it('renders and accepts input', () => {
    mount(<LoginForm />)
    cy.get('input[name="email"]').type('admin@example.com')
    cy.get('input[name="password"]').type('password123')
  })
})
