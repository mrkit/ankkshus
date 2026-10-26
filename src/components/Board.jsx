import { Link } from 'react-router-dom';
import { BANDS, bandColor, bandFor } from '../lib/bands.js';
import { shortDate } from '../lib/dates.js';

// Snake order: even rows run left to right, odd rows run right to left.
function cellFor(index, cols) {
  const row = Math.floor(index / cols);
  const along = index % cols;
  const col = row % 2 === 0 ? along : cols - 1 - along;
  return { row, col };
}

function useCols() {
  if (typeof window === 'undefined') return 6;
  if (window.matchMedia('(min-width: 560px)').matches) return 8;
  return 6;
}

// attempts: checklist attempts, any order. players: from playersFrom().
// The board shows the last `limit` check-ins as spaces after a Start space;
// older ones are on the history page.

// Which way the track leaves a cell: along the row, or down at the row's end.
function nextFor(index, cols, total) {
  if (index >= total - 1) return undefined;
  const { row, col } = cellFor(index, cols);
  if (row % 2 === 0) return col < cols - 1 ? 'right' : 'down';
  return col > 0 ? 'left' : 'down';
}
export function Board({
  attempts = [],
  players = [],
  limit = 12,
  legend = true,
}) {
  const cols = useCols();
  const ordered = [...attempts]
    .sort((a, b) => new Date(a.completedAt) - new Date(b.completedAt))
    .slice(-limit);
  const spaces = [{ start: true }, ...ordered];
  const rows = Math.max(1, Math.ceil(spaces.length / cols));
  const totalCells = rows * cols;

  const pieces = players.map((player) => {
    const latestIndex = ordered.findLastIndex((a) => a.userId === player.id);
    const index = latestIndex === -1 ? 0 : latestIndex + 1;
    return { player, index };
  });
  // Both pieces share one corner unless they stand on the same space.
  const shared =
    pieces.length > 1 && pieces.every((p) => p.index === pieces[0].index);

  return (
    <div>
      {players.length > 0 && (
        <div className="players">
          {players.map((p) => {
            const Dragon = p.dragon.Component;
            return (
              <span className="player" key={p.id} style={{ color: p.color }}>
                <Dragon
                  size={26}
                  color={p.color}
                  title={`${p.username}: ${p.dragon.name}`}
                />
                <span style={{ color: 'var(--ink)' }}>{p.username}</span>
              </span>
            );
          })}
        </div>
      )}

      <ol className="board" aria-label="Check-ins, oldest to newest">
        {Array.from({ length: totalCells }, (_, i) => {
          const { row, col } = cellFor(i, cols);
          // A cell is a fixed position on the grid, so its key is that position.
          const key = `${row}-${col}`;
          const style = { gridRow: row + 1, gridColumn: col + 1 };
          const next = nextFor(i, cols, totalCells);
          const space = spaces[i];
          if (!space)
            return (
              <li key={key} className="cell" style={style} aria-hidden="true">
                <span className="space empty" data-next={next} />
              </li>
            );
          if (space.start) {
            return (
              <li key={key} className="cell" style={style}>
                <span className="space start" data-next={next}>
                  Start
                </span>
              </li>
            );
          }
          const band = bandFor(space.total);
          return (
            <li key={key} className="cell" style={style}>
              <Link
                to={`/check-in/attempts/${space.id}`}
                className={`space band-${band?.n ?? 0}`}
                data-next={next}
                aria-label={`${space.user?.username ?? 'Someone'} on ${shortDate(space.completedAt)}, total ${space.total}`}
              >
                {space.total}
                <span className="space-date" aria-hidden="true">
                  {shortDate(space.completedAt)}
                </span>
              </Link>
            </li>
          );
        })}

        <li className="piece-layer" aria-hidden="true">
          {pieces.map(({ player, index }) => {
            const { row, col } = cellFor(index, cols);
            const Dragon = player.dragon.Component;
            return (
              <div
                key={player.id}
                className={`piece${shared ? ' shared' : ''}`}
                data-slot={player.slot}
                style={{ '--row': row, '--col': col }}
              >
                <Dragon
                  color={player.color}
                  title=""
                  facing={row % 2 === 0 ? 'right' : 'left'}
                />
              </div>
            );
          })}
        </li>
      </ol>

      {legend && (
        <ul className="board-legend" aria-label="Burns' ranges">
          {BANDS.map((b) => (
            <li key={b.n}>
              <i style={{ background: bandColor(b) }} />
              {b.min}–{b.max} {b.label.toLowerCase()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
