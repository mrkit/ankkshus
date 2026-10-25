const dateFmt = new Intl.DateTimeFormat(undefined, {
  weekday: 'long',
  month: 'long',
  day: 'numeric',
});
const shortFmt = new Intl.DateTimeFormat(undefined, {
  month: 'short',
  day: 'numeric',
});
const fullFmt = new Intl.DateTimeFormat(undefined, {
  weekday: 'short',
  month: 'short',
  day: 'numeric',
  year: 'numeric',
  hour: 'numeric',
  minute: '2-digit',
});
const relFmt = new Intl.RelativeTimeFormat(undefined, { numeric: 'auto' });

export const longDate = (d) => dateFmt.format(new Date(d));
export const shortDate = (d) => shortFmt.format(new Date(d));
export const fullDate = (d) => fullFmt.format(new Date(d));

// "today", "yesterday", "3 days ago", "5 weeks ago".
export function relativeDate(d) {
  const days = Math.round((new Date(d) - Date.now()) / 86_400_000);
  if (Math.abs(days) < 7) return relFmt.format(days, 'day');
  if (Math.abs(days) < 60) return relFmt.format(Math.round(days / 7), 'week');
  return relFmt.format(Math.round(days / 30), 'month');
}

export const isToday = (d) =>
  new Date(d).toDateString() === new Date().toDateString();
