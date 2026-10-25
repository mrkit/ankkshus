import { Link } from 'react-router-dom';
import { useGetQuizzesQuery } from '../../app/api.js';
import { relativeDate } from '../../lib/dates.js';

const kindLabel = {
  checklist: 'Checklist, scored',
  worksheet: 'Worksheet, written',
};

export function CheckInLibrary({ user }) {
  const { data: quizzes = [], isLoading, isError } = useGetQuizzesQuery();

  return (
    <>
      <div className="page-title">
        <div>
          <h1>Check-in</h1>
          <p className="muted">
            Each one is its own short thing. Results are kept with the date.
          </p>
        </div>
      </div>

      {isLoading && <p className="muted">Shuffling…</p>}
      {isError && (
        <p className="error" role="alert">
          Could not load the check-ins.
        </p>
      )}

      <div className="quiz-list deal">
        {quizzes.map((quiz) => {
          const mine = quiz.latestAttempts.find((a) => a.userId === user.id);
          const theirs = quiz.latestAttempts.find((a) => a.userId !== user.id);
          return (
            <section
              className="card quiz-tile"
              key={quiz.id}
              aria-labelledby={`quiz-${quiz.slug}`}
            >
              <h2 id={`quiz-${quiz.slug}`}>{quiz.title}</h2>
              <div className="quiz-meta">
                <span>{kindLabel[quiz.kind]}</span>
                <span>
                  {quiz.questionCount}{' '}
                  {quiz.kind === 'checklist' ? 'items' : 'prompts'} in{' '}
                  {quiz.sectionCount}{' '}
                  {quiz.sectionCount === 1 ? 'part' : 'parts'}
                </span>
              </div>
              {quiz.summary && <p>{quiz.summary}</p>}
              <div className="quiz-last">
                <span>
                  You:{' '}
                  {mine
                    ? `${relativeDate(mine.completedAt)}${mine.total !== null ? `, total ${mine.total}` : ''}`
                    : 'not yet'}
                </span>
                {theirs && (
                  <span>
                    {theirs.user?.username}: {relativeDate(theirs.completedAt)}
                    {theirs.total !== null ? `, total ${theirs.total}` : ''}
                  </span>
                )}
              </div>
              <div className="row">
                <Link to={`/check-in/${quiz.slug}`} className="btn btn-primary">
                  {mine ? 'Do it again' : 'Start'}
                </Link>
                {quiz.attemptCount > 0 && (
                  <Link
                    to={`/check-in/${quiz.slug}/history`}
                    className="btn btn-quiet"
                  >
                    History ({quiz.attemptCount})
                  </Link>
                )}
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
}
