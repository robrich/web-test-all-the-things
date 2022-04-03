
describe('fixture-match-api', () => {

  it('should have a fixture with same structure as real api', (done) => {

    // arrange

    // act
    cy.fixture('score-get').then((fixtureData) => {
      cy.request('/api/score').then((apiData) => {

        const fixtureProps = Object.keys(fixtureData);
        const apiProps = Object.keys(apiData.body); // ASSUME: body isn't blank

        // assert
        expect(fixtureProps).to.have.members(apiProps);

        done();
      });
    });

  });

});
