// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('getNewGame', () => {
  return cy.get('[data-cy="newGame"]');
});

Cypress.Commands.add('winForX', () => {
  // ASSUME: page is loaded and nothing is played yet
  cy.get('#0').click();
  cy.get('#1').click();
  cy.get('#2').click();
  cy.get('#5').click();
  cy.get('#4').click();
  cy.get('#3').click();
  cy.get('#6').click();
});
