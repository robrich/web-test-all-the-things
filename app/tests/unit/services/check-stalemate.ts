import checkStalemate from '../../../src/services/check-stalemate';
import { Player } from '../../../src/types/player';
import { Square } from '../../../src/types/square';

describe('/service/check-win', () => {

  it('should mark stalemate', () => {

    // arrange
    const players: Player[] = [
      'x', 'o', 'x',
      'x', 'o', 'x',
      'o', 'x', 'o'
    ];
    const expected = true;

    // act & assert
    runTest(players, expected);

  });

  it('should mark not a stalemate', () => {

    // arrange
    const players: Player[] = [
      undefined, undefined, undefined,
      undefined, undefined, undefined,
      undefined, undefined, undefined
    ];
    const expected = false;

    // act & assert
    runTest(players, expected);
  });

  function runTest(players: Player[], expected: boolean) {

    // arrange
    const squares = makeSquares(players);

    // act
    const actual = checkStalemate(squares);

    // assert
    expect(actual).toEqual(expected);

  }

  function makeSquares(players: Player[]): Square[] {
    const squares = [];
    for (let id = 0; id < players.length; id++) {
      squares.push({ id, value: players[id], win: false });
    }
    return squares;
  }

});
