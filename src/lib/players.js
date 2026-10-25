import { DRAGONS } from '../dragons/dragons.jsx';

const COLORS = ['var(--player-a)', 'var(--player-b)'];

// Each person is a player: a colour and a dragon piece, by sign-up order.
// A chosen dragon per person can replace the default later.
export function playersFrom(users = []) {
  const sorted = [...users].sort((a, b) => a.id - b.id);
  return sorted.map((user, i) => ({
    id: user.id,
    username: user.username,
    slot: i,
    color: COLORS[i % COLORS.length],
    dragon: DRAGONS[i % DRAGONS.length],
  }));
}

export const playerById = (players, id) => players.find((p) => p.id === id);
