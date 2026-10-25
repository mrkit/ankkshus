import { Link, useParams } from 'react-router-dom';
import { useGetAttemptQuery, useGetQuizQuery } from '../../app/api.js';
import { bandColor, bandFor } from '../../lib/bands.js';
import { fullDate } from '../../lib/dates.js';

export function AttemptDetail() {
  const { id } = useParams();
  const { data: attempt, isLoading, isError } = useGetAttemptQuery(id);
  const { data: quiz } = useGetQuizQuery(attempt?.quiz?.slug, {
    skip: !attempt,
  });

  if (isLoading) return <p className="muted">Opening…</p>;
  if (isError || !attempt)
    return (
      <p className="error" role="alert">
        That check-in is not on the table.
      </p>
    );

  const band = bandFor(attempt.total);
  const byQuestion = new Map(attempt.answers.map((a) => [a.quizQuestionId, a]));

  return (
    <>
      <div className="page-title">
        <div>
          <h1>{attempt.quiz.title}</h1>
          <p className="muted">
            {attempt.user?.username} · {fullDate(attempt.completedAt)}
          </p>
        </div>
        <Link
          to={`/check-in/${attempt.quiz.slug}/history`}
          className="btn btn-quiet"
        >
          All of these
        </Link>
      </div>

      <section className="card result">
        {attempt.total !== null && (
          <p className="result-total">
            <strong>Total {attempt.total}.</strong>
            {band && (
              <span className="result-band">
                <i style={{ background: bandColor(band) }} />
                Burns puts {band.min} to {band.max} as “
                {band.label.toLowerCase()}”.
              </span>
            )}
          </p>
        )}

        <div className="answers">
          {quiz
            ? quiz.sections.map((section) => (
                <div key={section.id}>
                  <h3>{section.title}</h3>
                  <div className="answers">
                    {section.questions.map((q) => {
                      const a = byQuestion.get(q.id);
                      if (!a) return null;
                      return (
                        <div className="answer" key={q.id}>
                          <span className="muted">{q.prompt}</span>
                          {a.score !== null ? (
                            <strong>{a.score}</strong>
                          ) : (
                            <p className="answer-text">{a.text}</p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))
            : attempt.answers.map((a) => (
                <div className="answer" key={a.id}>
                  <span className="muted">{a.question?.prompt}</span>
                  {a.score !== null ? (
                    <strong>{a.score}</strong>
                  ) : (
                    <p className="answer-text">{a.text}</p>
                  )}
                </div>
              ))}
        </div>
      </section>
    </>
  );
}
