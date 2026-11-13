import { useState } from 'react';
import { SCALE } from './Rate10.jsx';
import { SUGGESTED_RUNGS } from './steps.js';

// value: [{ text, rating }]
export function LadderBuilder({ value = [], onChange }) {
  const [own, setOwn] = useState('');
  const picked = new Map(value.map((r) => [r.text, r.rating]));
  const options = [
    ...SUGGESTED_RUNGS,
    ...value.map((r) => r.text).filter((t) => !SUGGESTED_RUNGS.includes(t)),
  ];

  function toggle(text) {
    if (picked.has(text)) onChange(value.filter((r) => r.text !== text));
    else onChange([...value, { text, rating: 5 }]);
  }

  function rate(text, rating) {
    onChange(value.map((r) => (r.text === text ? { ...r, rating } : r)));
  }

  function addOwn(event) {
    event.preventDefault();
    const text = own.trim();
    if (!text || picked.has(text)) return;
    onChange([...value, { text, rating: 5 }]);
    setOwn('');
  }

  return (
    <div className="ladder-builder">
      <ul>
        {options.map((text) => (
          <li key={text} className={picked.has(text) ? 'is-on' : ''}>
            <label className="check">
              <input
                type="checkbox"
                checked={picked.has(text)}
                onChange={() => toggle(text)}
              />
              <span>{text}</span>
            </label>
            {picked.has(text) && (
              <label className="ladder-rating">
                <span className="sr-only">How hard, 0 to 10</span>
                <span aria-hidden="true">Hard:</span>
                <select
                  className="input"
                  value={picked.get(text)}
                  onChange={(e) => rate(text, Number(e.target.value))}
                >
                  {SCALE.map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </label>
            )}
          </li>
        ))}
      </ul>
      <div className="row ladder-own">
        <input
          className="input"
          placeholder="Add your own step"
          value={own}
          maxLength={200}
          onChange={(e) => setOwn(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addOwn(e)}
        />
        <button type="button" className="btn btn-quiet" onClick={addOwn}>
          Add
        </button>
      </div>
    </div>
  );
}
