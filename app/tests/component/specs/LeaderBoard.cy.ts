import { type ScoreListItem } from '@/types/score';
import LeaderBoard from '../../../src/components/LeaderBoard.vue';


describe('<LeaderBoard />', () => {

  it('should not render scores when passed an empty array', () => {

    // arrange
    const scoreList: ScoreListItem[] = [];

    // act
    // <LeaderBoard :scorelist="scorelist" />
    cy.mount(LeaderBoard, {
      props: { scorelist: scoreList }
    });

    // assert
    cy.get('.table').find('div').should('have.length', 0);
  });

  it('should render the scores when passed a score list', () => {

    // arrange
    const scoreList: ScoreListItem[] = [
      { player: 'x', score: 3 },
      { player: 'o', score: 2 },
      { player: 'tie', score: 1 }
    ];

    // act
    cy.mount(LeaderBoard, {
      props: { scorelist: scoreList }
    });

    // assert
    cy.get('[data-cy^="score"]').should('have.length', 3);
    cy.get('[data-cy="scorex"]').contains(': 3').should('exist');
    cy.get('[data-cy="scoreo"]').contains(': 2').should('exist');
    cy.get('[data-cy="scoretie"]').contains('tie: 1').should('exist');

  });

});
