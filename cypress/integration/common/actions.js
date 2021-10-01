import { Given } from 'cypress-cucumber-preprocessor/steps'

Given('I open {string} page', (uri) => {
  const baseUrl = 'http://localhost:3000'
  let path = ''
  switch (uri) {
    case 'home':
      path = '/'
      break
    default:
      path = uri
  }
  cy.visit(baseUrl + path)
})

When(`I click on {string}`, (text) => {
  cy.get(`a[href*="${text}"]`).click()
})

Then(`I should see {string} in the url`, (text) => {
  cy.url().should('include', text)
})

Then(`I see {string} as a link`, (text) => {
  cy.get(`a[href*="${text}"]`).should('have.length', 1)
})

Then(`I see {string} in {string}`, (text, location) => {
  cy.get(location).should('contain', text)
})
