import checkWin from '../../../src/services/check-win';
import { Player } from '../../../src/types/player';
import { Square } from '../../../src/types/square';

describe('/service/check-win', () => {

  it('should mark x as win', () => {

    // arrange
    const players: Player[] = [
      'x', 'o', 'x',
      'o', 'x', 'o',
      'x', undefined, undefined
    ];
    const expected: number[] = [2, 4, 6];

    // act & assert
    runTest(players, expected);

  });

  it('should mark o as win', () => {

    // arrange
    const players: Player[] = [
      'x', 'o', 'x',
      'x', 'o', 'x',
      'o', 'o', undefined
    ];
    const expected: number[] = [1, 4, 7];

    // act & assert
    runTest(players, expected);

  });

  it('should mark no winner', () => {

    // arrange
    const players: Player[] = [
      'x', 'o', 'x',
      'x', 'o', 'x',
      'o', 'x', 'o'
    ];
    const expected: number[] = [];

    // act & assert
    runTest(players, expected);

  });

  it('should mark no winner', () => {

    // arrange
    const players: Player[] = [
      undefined, undefined, undefined,
      undefined, undefined, undefined,
      undefined, undefined, undefined
    ];
    const expected: number[] = [];

    // act & assert
    runTest(players, expected);
  });

  function runTest(players: Player[], expected: number[]) {

    // arrange
    const squares: Square[] = makeSquares(players);

    // act
    const actual = checkWin(squares);

    // assert
    expect(actual).toEqual(expected);

  }

  function makeSquares(players: Player[]): Square[] {
    const squares: Square[] = [];
    for (let id = 0; id < players.length; id++) {
      squares.push({ id, value: players[id], win: false });
    }
    return squares;
  }

});
