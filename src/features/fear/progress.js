import { REVIEW_GAPS, REVIEWS, STEPS } from './steps.js';

const DAY = 24 * 60 * 60 * 1000;
const dayKey = (d) => new Date(d).toLocaleDateString('en-CA');

// Everything the overview needs, worked out from the saved entries (newest
// first, as the server sends them).
export function progressFrom(entries, now = Date.now()) {
  const done = new Set(entries.map((e) => e.step));
  const latest = (step) => entries.find((e) => e.step === step);

  const next = STEPS.find((s) => !done.has(s.slug)) ?? null;

  const reviewsDue = Object.keys(REVIEWS).flatMap((slug) => {
    const finished = entries.filter((e) => e.step === slug);
    if (!finished.length) return [];
    const reviews = entries.filter((e) => e.step === `review-${slug}`);
    if (reviews.length >= REVIEW_GAPS.length) return [];
    const anchor = Math.max(
      ...[...finished, ...reviews].map((e) => new Date(e.createdAt).getTime()),
    );
    const gap = REVIEW_GAPS[reviews.length] * DAY;
    return now - anchor >= gap ? [slug] : [];
  });

  const rungs = latest('ladder')?.answers?.rungs ?? [];
  const tries = entries.filter((e) => e.step === 'rung');
  const ladder = [...rungs]
    .sort((a, b) => a.rating - b.rating)
    .map((rung) => {
      const mine = tries.filter((t) => t.answers?.rung === rung.text);
      const calmDays = new Set(
        mine
          .filter((t) => (t.before ?? 10) <= 3)
          .map((t) => dayKey(t.createdAt)),
      );
      return {
        ...rung,
        tries: mine.length,
        lastPeak: mine[0]?.before ?? null,
        // Judgement, see design/fear-section.md: calm on two different days.
        easier: calmDays.size >= 2,
      };
    });
  const nextRung = ladder.find((r) => !r.easier) ?? null;

  const days = new Set(entries.map((e) => dayKey(e.createdAt)));
  const last = entries[0] ? new Date(entries[0].createdAt).getTime() : null;
  const daysAway = last ? Math.floor((now - last) / DAY) : null;

  const logs = entries.filter((e) => e.step === 'now').slice(0, 6);

  return {
    done,
    next,
    reviewsDue,
    ladder,
    nextRung,
    days: days.size,
    daysAway,
    logs,
    latest,
  };
}
