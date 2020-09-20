/// <reference types="cypress" />

context('Actions', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  // https://on.cypress.io/interacting-with-elements
  it('check search suggestions (invalid ingredient)', () => {
    cy.get('#search').type('dictionary')
    cy.get('.search-suggestions').should('not.exist')
  })

  it('check search suggestions (valid ingredient)', () => {
    cy.get('#search').type('seed')
    cy.get('.search-suggestions').should('be.visible')
  })

  it('check search suggestions (trigger at 3 chars)', () => {
    cy.get('#search').type('se')
    cy.get('.search-suggestions').should('not.exist')
    cy.get('#search').type('e')
    cy.get('.search-suggestions').should('be.visible')
    cy.get('#search').type('{backspace}')
    cy.get('.search-suggestions').should('not.exist')
  })

  // this currently fails because it should be wired as a mock fixture
  it('check search results (valid ingredient)', () => {
    cy.get('#search').type('organic kale')
    cy.get('.search-form').submit()
    cy.get('.search-results').should('be.visible')
  })

  it('check search results (invalid ingredient)', () => {
    cy.get('#search').type('textbook')
    cy.get('.search-form').submit()
    cy.get('.search-results').should('not.exist')
    cy.get('.error').should('be.visible')
  })

})
