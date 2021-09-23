/// <reference types="cypress" />
import userData from '../../../public/data/eddiejaoude.json'

const baseUrl = 'http://linkfree.eddiehub.org';

context('Users', () => {
    beforeEach(() => {
      cy.visit(`${baseUrl}/eddiejaoude`,)
    })
    
    it('page shows content from user provided file', () => {
        cy.url().should('include', '/eddiejaoude')
        cy.get('h1').should('contain.text',userData.name)
        cy.get('main > section > div').should('contain.text',userData.bio)
      })
  })
  