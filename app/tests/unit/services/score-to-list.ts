import scoreToList from '../../../src/services/score-to-list';
import { Score, ScoreListItem } from '../../../src/types/score';

describe('/service/score-to-list', () => {

  it('should create a list from a score', () => {

    // arrange
    const score: Score = {
      x: 0,
      o: 1,
      tie: 2
    };
    const expected: ScoreListItem[] = [
      { player: 'tie', score: 2 },
      { player: 'o', score: 1 },
      { player: 'x', score: 0 }
    ];

    // act
    const actual = scoreToList(score);

    // assert
    expect(actual).toEqual(expected);

  });

  it('should return empty list when given undefined', () => {

    // arrange
    const score = undefined;
    const expected: ScoreListItem[] = [];

    // act
    const actual = scoreToList(score);

    // assert
    expect(actual).toEqual(expected);

  });

});
