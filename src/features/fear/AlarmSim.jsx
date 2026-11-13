import { useState } from 'react';

const START = 6;
const MAX_ROUNDS = 8;

// A picture of the loop from "How the fear works": pushing a thought away
// brings quick relief and a louder alarm next time; letting it stay brings a
// slower drop and a quieter alarm next time. Illustrative numbers only.
export function AlarmSim() {
  const [level, setLevel] = useState(START);
  const [rounds, setRounds] = useState([]);
  const finished = rounds.length >= MAX_ROUNDS;

  function choose(choice) {
    const peak = level;
    const end = choice === 'push' ? 1 : Math.max(0, peak - 4);
    const nextLevel =
      choice === 'push' ? Math.min(10, peak + 1.5) : Math.max(1, peak - 1.5);
    setRounds((r) => [...r, { n: r.length + 1, choice, peak, end }]);
    setLevel(nextLevel);
  }

  function reset() {
    setLevel(START);
    setRounds([]);
  }

  return (
    <div className="sim">
      <div className="sim-now">
        <span className="sim-label">
          {finished ? 'Done' : `Thought ${rounds.length + 1} arrives. Alarm:`}
        </span>
        <div className="sim-meter" aria-hidden="true">
          <span style={{ transform: `scaleX(${level / 10})` }} />
        </div>
        <span className="sim-num">{Math.round(level)} / 10</span>
      </div>

      {!finished && (
        <div className="row">
          <button
            type="button"
            className="btn btn-quiet"
            onClick={() => choose('push')}
          >
            Push it away
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => choose('let')}
          >
            Let it stay
          </button>
        </div>
      )}

      {rounds.length > 0 && (
        <>
          <ol className="sim-history" aria-label="Rounds so far">
            {rounds.map((r) => (
              <li key={r.n} className={r.choice}>
                <span className="bar" style={{ height: `${r.peak * 10}%` }} />
                <span className="sr-only">
                  Round {r.n}:{' '}
                  {r.choice === 'push' ? 'pushed away' : 'let it stay'}, alarm
                  reached {Math.round(r.peak)}
                </span>
              </li>
            ))}
          </ol>
          <p className="muted sim-key">
            Each bar is how loud the alarm got when that thought arrived. Blue:
            let it stay. Grey: pushed away.{' '}
            <button type="button" className="btn-link" onClick={reset}>
              Start again
            </button>
          </p>
        </>
      )}
      <p className="muted sim-key">
        A picture of the idea, not real measurements.
      </p>
    </div>
  );
}
