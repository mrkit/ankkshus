export const SCALE = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// A 0 to 10 rating as eleven radio buttons, big enough to tap.
export function Rate10({
  name,
  value,
  onChange,
  low = 'None',
  high = 'The worst',
}) {
  return (
    <fieldset className="rate10">
      <div className="rate10-row">
        {SCALE.map((n) => (
          <label key={n} className={value === n ? 'is-on' : ''}>
            <input
              type="radio"
              name={name}
              value={n}
              checked={value === n}
              onChange={() => onChange(n)}
            />
            <span>{n}</span>
          </label>
        ))}
      </div>
      <div className="rate10-ends muted" aria-hidden="true">
        <span>{low}</span>
        <span>{high}</span>
      </div>
    </fieldset>
  );
}
