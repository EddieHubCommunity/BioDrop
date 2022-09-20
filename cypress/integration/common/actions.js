import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'

Given('I open {string} page', (uri) => {
  const baseUrl = 'http://localhost:3000'
  let path = ''
  switch (uri) {
    case 'home':
      path = '/'
      break
    case 'search':
      path = '/search'
      break
    case 'eddiejaoude':
      path = '/eddiejaoude'
      break
    case '404':
      path = '/abcdef'
      break
    default:
      path = uri
  }
  cy.visit(baseUrl + path)
})

Given('I use single user mode with {string}', (username) => {
  cy.writeFile('src/config/user.json', `{ "username": "${username}" }`)
})

When('I click on {string}', (text) => {
  cy.get(`a[href*="${text}"]`).click()
})

When('I type {string} in {string}', (type, location) => {
  cy.get(location).type(type)
})

Then('I should see {string} in the url', (text) => {
  cy.url().should('include', text)
})

Then('I see {string} as a link', (text) => {
  cy.get(`a[href*="${text}"]`).should('have.length', 1)
})

Then('I see {string} text in section {string}', (text, location) => {
  cy.get(location).should('contain', text)
})

Then('I do not see {string} text in section {string}', (text, location) => {
  cy.get(location).should('not.contain', text)
})

Then('I see {string} item on the page', (location) => {
  cy.get(location).should('be.visible')
})

Then('I change back to regular mode', () => {
  // adding exact same contents back to file so it wont show up as changes on git
  cy.writeFile(
    'src/config/user.json',
    `${JSON.stringify({ username: '' }, null, 2)}\n`,
  )
})
