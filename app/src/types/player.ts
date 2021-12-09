// export type Player = 'x' | 'o' | undefined;
// below is like above but doesn't require a second list
export const players = ['x', 'o', undefined] as const;
export type Player = typeof players[number];

export type Winner = 'x' | 'o' | 'tie';
