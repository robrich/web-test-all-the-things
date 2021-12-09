import fontAwesomeIcon from '../../../src/services/font-awesome-icon';
import { Player } from '../../../src/types/player';

describe('/service/font-awesome-icon', () => {

  it('should render regular class for x when no special features', () => {

    // arrange
    const player: Player = 'x';
    const dimmed = false;
    const win = false;
    const expected = 'fas fa-times';

    // act
    const actual = fontAwesomeIcon(player, dimmed, win);

    // assert
    expect(actual).toEqual(expected);

  });

  it('should render win for o when winning', () => {

    // arrange
    const player: Player = 'o';
    const dimmed = false;
    const win = true;
    const expected = 'win far fa-circle';

    // act
    const actual = fontAwesomeIcon(player, dimmed, win);

    // assert
    expect(actual).toEqual(expected);

  });

  it('should render win if both win and dimmed', () => {

    // arrange
    const player: Player = 'o';
    const dimmed = true;
    const win = true;
    const expected = 'win far fa-circle';

    // act
    const actual = fontAwesomeIcon(player, dimmed, win);

    // assert
    expect(actual).toEqual(expected);

  });

  it('should render blank for invalid player', () => {

    // arrange
    const player: Player = 'invalid' as Player;
    const dimmed = false;
    const win = false;
    const expected = '';

    // act
    const actual = fontAwesomeIcon(player, dimmed, win);

    // assert
    expect(actual).toEqual(expected);

  });

});
