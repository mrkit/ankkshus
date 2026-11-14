import { useState } from 'react';
import { AlarmSim } from './AlarmSim.jsx';
import { LadderBuilder } from './LadderBuilder.jsx';
import { Rate10 } from './Rate10.jsx';
import { SOURCES, TRAP_DEFS, TRAPS } from './steps.js';

function Text({ block }) {
  return (
    <div className="block-text">
      {block.title && <h3>{block.title}</h3>}
      {block.body.map((p) => (
        <p key={p}>{p}</p>
      ))}
    </div>
  );
}

function Write({ block, value = '', set }) {
  const onChange = (e) => set(e.target.value);
  if (block.short) {
    return (
      <label className="field">
        <span>{block.prompt}</span>
        <input
          className="input"
          value={value}
          maxLength={500}
          onChange={onChange}
        />
      </label>
    );
  }
  return (
    <label className="field">
      <span>{block.prompt}</span>
      <textarea
        className="textarea"
        rows={4}
        value={value}
        maxLength={2000}
        onChange={onChange}
      />
    </label>
  );
}

// Ask first; show the answer only after an attempt (or an honest "not sure").
export function Ask({ block, value = '', set, kind }) {
  const [shown, setShown] = useState(Boolean(value));
  const answer = kind === 'guess' ? block.reveal : [block.model];
  return (
    <div className="ask">
      <label className="field">
        <span>{block.prompt}</span>
        <textarea
          className="textarea"
          rows={3}
          value={value}
          maxLength={2000}
          onChange={(e) => set(e.target.value)}
          readOnly={shown}
        />
      </label>
      {!shown ? (
        <div className="row">
          <button
            type="button"
            className="btn btn-primary"
            disabled={!value.trim()}
            onClick={() => setShown(true)}
          >
            {block.button ??
              (kind === 'guess' ? 'See what happens' : 'Compare')}
          </button>
          <button
            type="button"
            className="btn-link"
            onClick={() => {
              if (!value.trim()) set('(not sure)');
              setShown(true);
            }}
          >
            I'm not sure
          </button>
        </div>
      ) : (
        <div className="reveal">
          <h3>
            {kind === 'guess' ? 'What usually happens' : 'One way to say it'}
          </h3>
          {answer.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      )}
    </div>
  );
}

function RateList({ block, value = {}, set }) {
  return (
    <ul className="rate-list">
      {block.options.map((opt) => {
        const on = opt in value;
        return (
          <li key={opt}>
            <label className="check">
              <input
                type="checkbox"
                checked={on}
                onChange={() => {
                  const next = { ...value };
                  if (on) delete next[opt];
                  else next[opt] = 5;
                  set(next);
                }}
              />
              <span>{opt}</span>
            </label>
            {on && (
              <Rate10
                name={`r-${opt}`}
                value={value[opt]}
                onChange={(n) => set({ ...value, [opt]: n })}
                low="Barely"
              />
            )}
          </li>
        );
      })}
    </ul>
  );
}

function Checks({ block, value = [], set }) {
  const toggle = (opt) =>
    set(value.includes(opt) ? value.filter((v) => v !== opt) : [...value, opt]);
  return (
    <fieldset className="checks">
      <legend>{block.prompt}</legend>
      {block.options.map((opt) => (
        <label key={opt} className="check">
          <input
            type="checkbox"
            checked={value.includes(opt)}
            onChange={() => toggle(opt)}
          />
          <span>{opt}</span>
        </label>
      ))}
    </fieldset>
  );
}

function Traps({ block, value = {}, set }) {
  return (
    <div className="traps">
      <p>Which trap is each thought in? Every answer explains itself.</p>
      {block.items.map((item, i) => {
        const pick = value[i];
        return (
          <fieldset key={item.thought} className="trap-item">
            <legend>{item.thought}</legend>
            <div className="trap-options">
              {Object.entries(TRAPS).map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  className={`btn btn-quiet${pick === key ? (key === item.answer ? ' is-right' : ' is-wrong') : ''}`}
                  aria-pressed={pick === key}
                  onClick={() => set({ ...value, [i]: key })}
                >
                  {label}
                </button>
              ))}
            </div>
            {pick && (
              <p className="trap-feedback" role="status">
                {pick === item.answer ? (
                  <>
                    <strong>Yes, {TRAPS[item.answer].toLowerCase()}.</strong>{' '}
                    {item.why}
                  </>
                ) : (
                  <>
                    <strong>{TRAPS[pick]}</strong> {TRAP_DEFS[pick]}. This
                    thought is closer to{' '}
                    <strong>{TRAPS[item.answer].toLowerCase()}</strong>:{' '}
                    {item.why}
                  </>
                )}
              </p>
            )}
          </fieldset>
        );
      })}
    </div>
  );
}

function Sources({ block }) {
  return (
    <details className="sources-box">
      <summary>What this rests on</summary>
      <p>
        <span className="tag">
          {block.status === 'checked' ? 'Checked' : 'Judgement'}
        </span>{' '}
        {block.note}
      </p>
      <ul>
        {block.ids.map((id) => (
          <li key={id}>
            <a href={SOURCES[id].url} target="_blank" rel="noreferrer">
              {SOURCES[id].label}
            </a>
          </li>
        ))}
      </ul>
    </details>
  );
}

export function Block({ block, answers, setAnswer }) {
  const value = block.key ? answers[block.key] : undefined;
  const set = (v) => setAnswer(block.key, v);
  switch (block.type) {
    case 'text':
      return <Text block={block} />;
    case 'write':
      return <Write block={block} value={value} set={set} />;
    case 'guess':
    case 'recall':
      return <Ask block={block} value={value} set={set} kind={block.type} />;
    case 'rate-list':
      return <RateList block={block} value={value} set={set} />;
    case 'checks':
      return <Checks block={block} value={value} set={set} />;
    case 'traps':
      return <Traps block={block} value={value} set={set} />;
    case 'sim':
      return <AlarmSim />;
    case 'ladder':
      return <LadderBuilder value={value} onChange={set} />;
    case 'sources':
      return <Sources block={block} />;
    default:
      return null;
  }
}
