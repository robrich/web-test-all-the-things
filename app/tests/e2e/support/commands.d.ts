/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    getNewGame(): Chainable<Element>;
    winForX(): Promise<void>;
  }
}
