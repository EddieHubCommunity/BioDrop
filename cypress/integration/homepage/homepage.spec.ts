/// <reference types="cypress" />

const baseUrl = 'http://linkfree.eddiehub.org/';

context('Homepage', () => {
    beforeEach(() => {
      cy.visit(baseUrl);
    })
    
    it('lists multiple users', () => {
        cy.get('main a').should('have.length.at.least',2);
    })
  })
