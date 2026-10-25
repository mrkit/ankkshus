// Burns' own ranges for the 25-item checklist total. These are his words, kept
// as material the reader can weigh for themselves.
export const BANDS = [
  { n: 1, min: 0, max: 5, label: 'No depression' },
  { n: 2, min: 6, max: 10, label: 'Normal but unhappy' },
  { n: 3, min: 11, max: 25, label: 'Mild depression' },
  { n: 4, min: 26, max: 50, label: 'Moderate depression' },
  { n: 5, min: 51, max: 75, label: 'Severe depression' },
  { n: 6, min: 76, max: 100, label: 'Extreme depression' },
];

export function bandFor(total) {
  if (total === null || total === undefined) return null;
  return BANDS.find((b) => total >= b.min && total <= b.max) ?? BANDS.at(-1);
}

export const bandColor = (band) =>
  band ? `var(--space-${band.n})` : 'var(--space-empty)';
