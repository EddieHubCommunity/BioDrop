/// <reference types="cypress" />

context('Homepage', () => {
    beforeEach(() => {
      cy.visit('http://linkfree.eddiehub.org/')
    })
    
    it('lists multiple users', () => {
        cy.get('main a').should('have.length.at.least',2)
    })
  
  })
  