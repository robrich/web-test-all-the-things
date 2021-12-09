// export type Player = 'x' | 'o' | 'tie';
// below is like above but doesn't require a second list
export const players = ['x', 'o', 'tie'] as const;
export type Player = typeof players[number];
