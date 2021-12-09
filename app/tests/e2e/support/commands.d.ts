/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    func(text: string): Chainable<Element>;
  }
}
