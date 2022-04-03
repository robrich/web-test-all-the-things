// smoke tests
describe('App.vue', () => {
  const SITE_URL = '/';

  let baseUrl = Cypress.config().baseUrl || '';
  if (baseUrl[baseUrl.length - 1] === '/') {
    baseUrl = baseUrl.substring(0, baseUrl.length - 1);
  }
  const FULL_URL = baseUrl + SITE_URL;

  beforeEach(() => {
    cy.visit(SITE_URL);
  });

  it('should visit the correct page', () => {

    // assert
    cy.url().should('equal', FULL_URL);

  });

  it('should load the game', () => {

    // assert
    cy.contains('h1', 'Tic Tac Toe');

  });

  it('should win for x', () => {

    // act
    cy.get('#0').click();
    cy.get('#1').click();
    cy.get('#2').click();
    cy.get('#5').click();
    cy.get('#4').click();
    cy.get('#3').click();
    cy.get('#6').click();

    // assert
    cy.get('#4 .win').should('exist');

  });

  it('should win for o', () => {

    // act
    cy.get('#0').click();
    cy.get('#1').click();
    cy.get('#2').click();
    cy.get('#4').click();
    cy.get('#5').click();
    cy.get('#7').click();

    // assert
    cy.get('#4 .win').should('exist');

  });

  it('should tie', () => {

    // act
    cy.get('#0').click();
    cy.get('#1').click();
    cy.get('#2').click();
    cy.get('#3').click();
    cy.get('#6').click();
    cy.get('#4').click();
    cy.get('#7').click();
    cy.get('#8').click();
    cy.get('#5').click();

    // assert
    cy.get('#4 .win').should('not.exist');

  });

});
