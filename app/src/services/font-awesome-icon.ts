import { Player } from '../types/player';

export default function fontAwesomeIcon(player: Player, dimmed: boolean, win?: boolean): string {
  const classes = [];
  if (win) {
    classes.push('win');
  } else if (dimmed) {
    classes.push('dimmed');
  }
  if (player === 'x') {
    classes.push('fas fa-times');
  } else if (player === 'o') {
    classes.push('far fa-circle');
  } else {
    classes.push(undefined); // blank
  }
  return classes.join(' ');
}
