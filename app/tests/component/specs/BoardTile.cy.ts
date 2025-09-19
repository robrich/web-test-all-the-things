import type { Player } from '@/types/player';
import BoardTile from '../../../src/components/BoardTile.vue';

describe('<BoardTile />', () => {

  it('should emit click when not done', () => {

    // arrange
    const expected = 1;
    const value: Player = undefined;
    const gameOver = false;
    const win = false;
    let actualClicked = 0;

    const id = 5;

    // act
    // <BoardTile :value="value" :id="id" :gameOver="gameOver" :win="win" @click="onClick" />
    cy.mount(BoardTile, {
      props: { value, id, gameOver, win, onClick: () => {actualClicked++;} }
    });
    cy.get('.square').click();

    cy.then(() => {

      // assert
      expect(actualClicked).to.equal(expected);
    });
  });

  it('should not emit click when game over', async () => {

    // arrange
    const gameOver = true;
    const expected = 0;

    // values unimportant, satisfying interface
    const value: Player = undefined;
    const id = 5;
    const win = false;
    let actualClicked = 0;

    // act
    cy.mount(BoardTile, {
      props: { value, id, gameOver, win, onClick: () => {actualClicked++;} }
    });
    cy.get('.square').click();

    cy.then(() => {

      // assert
      expect(actualClicked).to.equal(expected);
    });
  });

   it('should not emit click when already set', async () => {

    // arrange
    const value: Player = 'x';
    const expected = 0;

    const id = 5;
    const gameOver = false;
    const win = false;
    let actualClicked = 0;

    // act
    cy.mount(BoardTile, {
      props: { value, id, gameOver, win, onClick: () => {actualClicked++;} }
    });
    cy.get('.square').click();

    cy.then(() => {

      // assert
      expect(actualClicked).to.equal(expected);
    });
  });

});
