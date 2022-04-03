import { Score } from '../../../src/types/Score';

// mock network behaviors
describe('App.vue-network', () => {
  const SITE_URL = '/';

  let baseUrl = Cypress.config().baseUrl || '';
  if (baseUrl[baseUrl.length - 1] === '/') {
    baseUrl = baseUrl.substring(0, baseUrl.length - 1);
  }
  const FULL_URL = baseUrl + SITE_URL;

  // don't load page in beforeEach so we can intercept api requests

  it('should visit the correct page', () => {

    // act
    cy.visit(SITE_URL);

    // assert
    cy.url().should('equal', FULL_URL);

  });

  it('should show correct saved leaderboard score', () => {

    // arrange
    const xScore = '6';
    const oScore = '0';
    const tieScore = '2';
    cy.intercept('/api/score', {
      fixture: 'score-get'
    });

    // act
    cy.visit(SITE_URL);

    // assert
    cy.get('[data-cy="x-score"]').should('contain', xScore);
    cy.get('[data-cy="o-score"]').should('contain', oScore);
    cy.get('[data-cy="tie-score"]').should('contain', tieScore);

  });

  it('should increment score on win', (done) => {

    // arrange
    const expectedSaved = true;
    let actualSaved = false;

    cy.intercept('POST', '/api/score', (req) => {
      actualSaved = true;
      const score: Score = {
        x: 2,
        y: 3,
        tie: 4
      };
      req.reply(score);
    });

    // act
    cy.visit(SITE_URL);
    cy.winForX().then(() => {

      // assert
      expect(actualSaved).to.equal(expectedSaved);

      done();
    });
  });

  it('should not change score on new game click', () => {

    // arrange
    const expectedSaved = false;
    let actualSaved = false;

    cy.intercept('POST', '/api/score', (req) => {
      actualSaved = true;
      const score: Score = {
        x: 2,
        y: 3,
        tie: 4
      };
      req.reply(score);
    });

    // act
    cy.visit(SITE_URL);
    // start a game but don't finish it
    cy.get('#0').click();
    cy.get('#1').click();
    cy.get('#2').click();
    cy.get('#5').click();
    cy.getNewGame().click();

    // assert
    expect(actualSaved).to.equal(expectedSaved);

  });

});
