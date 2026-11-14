import { useRef, useState } from 'react';
import { useGetEntriesQuery, useSaveEntryMutation } from '../../app/api.js';
import { relativeDate } from '../../lib/dates.js';
import { nearest, QUADRANTS, quadrantOf, WORDS } from './words.js';

const SIZE = 400;
const toPx = (v) => ((v + 1) / 2) * SIZE;
const fromPx = (px, len) => Math.max(-1, Math.min(1, (px / len) * 2 - 1));
const clamp = (v) => Math.max(-1, Math.min(1, Math.round(v * 100) / 100));

export function FeelPage() {
  const { data: entries = [] } = useGetEntriesQuery();
  const [save, { isLoading, error }] = useSaveEntryMutation();
  const [point, setPoint] = useState(null);
  const [word, setWord] = useState(null);
  const [cause, setCause] = useState('');
  const [helped, setHelped] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [saved, setSaved] = useState(null);
  const svg = useRef(null);

  const history = entries.filter((e) => e.step === 'feeling').slice(0, 30);

  function place(event) {
    const rect = svg.current.getBoundingClientRect();
    const x = fromPx(event.clientX - rect.left, rect.width);
    const y = -fromPx(event.clientY - rect.top, rect.height);
    setPoint({ x: clamp(x), y: clamp(y) });
    setWord(null);
    setSaved(null);
  }

  function onKey(event) {
    const step = 0.1;
    const moves = {
      ArrowLeft: [-step, 0],
      ArrowRight: [step, 0],
      ArrowUp: [0, step],
      ArrowDown: [0, -step],
    };
    const move = moves[event.key];
    if (!move) return;
    event.preventDefault();
    const p = point ?? { x: 0, y: 0 };
    setPoint({ x: clamp(p.x + move[0]), y: clamp(p.y + move[1]) });
    setWord(null);
    setSaved(null);
  }

  async function onSave() {
    const result = await save({
      step: 'feeling',
      answers: { x: point.x, y: point.y, word, cause, helped },
    });
    if (!result.error) {
      setSaved(word);
      setPoint(null);
      setWord(null);
      setCause('');
      setHelped([]);
    }
  }

  const q = point ? QUADRANTS[quadrantOf(point.x, point.y)] : null;
  const close = point ? nearest(point.x, point.y) : [];

  return (
    <div className="feel">
      <header className="page-head">
        <h1>Feelings map</h1>
        <p className="lede">
          Tap where you are right now. Left to right is how unpleasant or
          pleasant it feels. Bottom to top is how much energy is in your body.
          Then pick the word that fits best.
        </p>
      </header>

      <div className="feel-grid">
        <div className="map-wrap">
          <span className="axis axis-top">More energy</span>
          <span className="axis axis-bottom">Less energy</span>
          <span className="axis axis-left">Unpleasant</span>
          <span className="axis axis-right">Pleasant</span>
          <div
            className="map"
            role="slider"
            aria-label="Feelings map. Left and right arrows: pleasantness. Up and down arrows: energy."
            aria-valuemin={-100}
            aria-valuemax={100}
            aria-valuenow={Math.round((point?.x ?? 0) * 100)}
            aria-valuetext={
              point
                ? `${QUADRANTS[quadrantOf(point.x, point.y)].name}. Pleasantness ${Math.round(point.x * 100)}, energy ${Math.round(point.y * 100)}.`
                : 'Nothing placed yet'
            }
            tabIndex={0}
            onClick={place}
            onKeyDown={onKey}
          >
            <svg ref={svg} viewBox={`0 0 ${SIZE} ${SIZE}`} aria-hidden="true">
              <rect
                className="q q-hu"
                x="0"
                y="0"
                width={SIZE / 2}
                height={SIZE / 2}
              />
              <rect
                className="q q-hp"
                x={SIZE / 2}
                y="0"
                width={SIZE / 2}
                height={SIZE / 2}
              />
              <rect
                className="q q-lu"
                x="0"
                y={SIZE / 2}
                width={SIZE / 2}
                height={SIZE / 2}
              />
              <rect
                className="q q-lp"
                x={SIZE / 2}
                y={SIZE / 2}
                width={SIZE / 2}
                height={SIZE / 2}
              />
              <line
                className="axis-line"
                x1={SIZE / 2}
                y1="0"
                x2={SIZE / 2}
                y2={SIZE}
              />
              <line
                className="axis-line"
                x1="0"
                y1={SIZE / 2}
                x2={SIZE}
                y2={SIZE / 2}
              />
              {showAll &&
                WORDS.map(([w, x, y]) => (
                  <text
                    key={w}
                    className="map-word"
                    x={toPx(x)}
                    y={toPx(-y)}
                    textAnchor="middle"
                  >
                    {w}
                  </text>
                ))}
              {history.map((e) => (
                <circle
                  key={e.id}
                  className="past"
                  cx={toPx(e.answers.x)}
                  cy={toPx(-e.answers.y)}
                  r="5"
                >
                  <title>
                    {e.answers.word}, {relativeDate(e.createdAt)}
                  </title>
                </circle>
              ))}
              {point && (
                <g
                  className="marker"
                  transform={`translate(${toPx(point.x)} ${toPx(-point.y)})`}
                >
                  <circle r="14" className="marker-halo" />
                  <circle r="6" className="marker-dot" />
                </g>
              )}
            </svg>
          </div>
          <p className="muted map-note" aria-live="polite">
            {point ? q.name : 'Nothing placed yet.'}{' '}
            <button
              type="button"
              className="btn-link"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? 'Hide the words' : 'Show all the words'}
            </button>
          </p>
        </div>

        <div className="feel-side">
          {saved && (
            <p className="panel saved-note" role="status">
              Saved “{saved}”. Its dot is now on the map.
            </p>
          )}
          {!point && !saved && (
            <div className="panel">
              <h2>Why name it</h2>
              <p>
                Putting a precise word to a feeling, rather than “bad” or
                “fine”, makes it easier to understand what caused it and what
                might help.
              </p>
              <p className="muted">
                Dots on the map are your past check-ins. Only you see them.
              </p>
            </div>
          )}
          {point && (
            <div className="panel">
              <h2>Which word fits?</h2>
              <div className="word-choices">
                {close.map((c) => (
                  <button
                    key={c.word}
                    type="button"
                    className={`chip${word === c.word ? ' is-on' : ''}`}
                    aria-pressed={word === c.word}
                    onClick={() => setWord(c.word)}
                  >
                    {c.word}
                  </button>
                ))}
              </div>
              {word && (
                <>
                  <label className="field">
                    <span>What happened just before you felt {word}?</span>
                    <textarea
                      className="textarea"
                      rows={3}
                      maxLength={1000}
                      value={cause}
                      onChange={(e) => setCause(e.target.value)}
                    />
                  </label>
                  <fieldset className="checks">
                    <legend>Something that might help</legend>
                    {q.help.map((h) => (
                      <label key={h} className="check">
                        <input
                          type="checkbox"
                          checked={helped.includes(h)}
                          onChange={() =>
                            setHelped(
                              helped.includes(h)
                                ? helped.filter((x) => x !== h)
                                : [...helped, h],
                            )
                          }
                        />
                        <span>{h}</span>
                      </label>
                    ))}
                  </fieldset>
                  {error && (
                    <p className="error" role="alert">
                      Could not save. Try again.
                    </p>
                  )}
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={onSave}
                    disabled={isLoading}
                  >
                    Save this check-in
                  </button>
                </>
              )}
            </div>
          )}

          {history.length > 0 && (
            <div className="panel">
              <h2>Recently</h2>
              <ul className="feel-history">
                {history.slice(0, 8).map((e) => (
                  <li key={e.id}>
                    <span
                      className={`swatch t-${QUADRANTS[quadrantOf(e.answers.x, e.answers.y)].tone}`}
                    />
                    <span className="feel-word">{e.answers.word}</span>
                    <span className="muted">{relativeDate(e.createdAt)}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
