import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  useGetAttemptsQuery,
  useGetQuizAttemptsQuery,
  useGetQuizQuery,
  useSaveAttemptMutation,
  useUsersQuery,
} from '../../app/api.js';
import { Board } from '../../components/Board.jsx';
import { bandColor, bandFor } from '../../lib/bands.js';
import { relativeDate } from '../../lib/dates.js';
import { playersFrom } from '../../lib/players.js';

const SCALE = [
  [0, 'Not at all'],
  [1, 'Somewhat'],
  [2, 'Moderately'],
  [3, 'A lot'],
  [4, 'Extremely'],
];

// One part per step, so a 25-item list never shows as one wall. The intro is
// step 0 and the saved result is the last step.
export function QuizRunner({ user }) {
  const { slug } = useParams();
  const { data: quiz, isLoading, isError } = useGetQuizQuery(slug);
  const { data: history = [] } = useGetQuizAttemptsQuery(slug);
  const [save, saveState] = useSaveAttemptMutation();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [previous, setPrevious] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [step]);

  if (isLoading) return <p className="muted">Setting up…</p>;
  if (isError || !quiz)
    return (
      <p className="error" role="alert">
        That check-in is not on the table.
      </p>
    );

  const sections = quiz.sections;
  const section = sections[step - 1];
  const isIntro = step === 0;
  const isResult = result !== null;
  const mine = history.filter((a) => a.userId === user.id);
  const lastMine = mine[0];

  const sectionDone = (s) =>
    quiz.kind !== 'checklist' ||
    s.questions.every((q) => answers[q.id] !== undefined);

  async function finish() {
    const payload = Object.entries(answers).map(([questionId, value]) => ({
      questionId: Number(questionId),
      value,
    }));
    // Remember the attempt before this one, because the history refetches on save.
    setPrevious(lastMine ?? null);
    const res = await save({ slug, answers: payload });
    if (!res.error) setResult(res.data);
  }

  if (isResult) {
    return (
      <Result quiz={quiz} result={result} previous={previous} user={user} />
    );
  }

  return (
    <div className="runner">
      <div
        className="runner-progress"
        aria-label={`Step ${step} of ${sections.length}`}
      >
        <ol aria-hidden="true">
          {sections.map((s, i) => (
            <li
              key={s.id}
              className={i + 1 < step ? 'done' : i + 1 === step ? 'now' : ''}
            />
          ))}
        </ol>
        <span>
          {isIntro ? quiz.title : `Part ${step} of ${sections.length}`}
        </span>
      </div>

      {isIntro ? (
        <section className="card stack">
          <h1>{quiz.title}</h1>
          {quiz.summary && <p>{quiz.summary}</p>}
          {quiz.source && <p className="muted">{quiz.source}</p>}
          {quiz.videoUrl && (
            <p>
              Watch first:{' '}
              <a href={quiz.videoUrl} target="_blank" rel="noopener">
                {quiz.videoTitle ?? 'the video for this section'}
              </a>
              . Then come back and write.
            </p>
          )}
          <p className="muted">
            {lastMine
              ? `You last did this ${relativeDate(lastMine.completedAt)}${lastMine.total !== null ? ` (total ${lastMine.total})` : ''}.`
              : 'This is your first time with this one.'}
          </p>
          {quiz.kind === 'checklist' && (
            <p className="muted">
              A checklist is not a diagnosis. It is a number you can look back
              on with your brother.
            </p>
          )}
          <div className="row">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => setStep(1)}
            >
              Begin
            </button>
            <Link to="/check-in" className="btn btn-quiet">
              Not now
            </Link>
          </div>
        </section>
      ) : (
        <form
          className="card"
          onSubmit={(e) => {
            e.preventDefault();
            if (step < sections.length) setStep(step + 1);
            else finish();
          }}
        >
          <h2 style={{ marginBottom: 6 }}>{section.title}</h2>
          {section.intro && (
            <p className="muted" style={{ marginBottom: 14 }}>
              {section.intro}
            </p>
          )}

          {section.questions.map((q) =>
            q.type === 'scale' ? (
              <fieldset
                className="question"
                key={q.id}
                style={{ border: 0, margin: 0 }}
              >
                <legend>{q.prompt}</legend>
                {q.help && <p className="question-help">{q.help}</p>}
                <div className="scale">
                  {SCALE.map(([value, word]) => (
                    <label key={value}>
                      <input
                        type="radio"
                        name={`q-${q.id}`}
                        value={value}
                        checked={answers[q.id] === value}
                        onChange={() =>
                          setAnswers((a) => ({ ...a, [q.id]: value }))
                        }
                        required
                      />
                      {value}
                      <small>{word}</small>
                    </label>
                  ))}
                </div>
              </fieldset>
            ) : (
              <div className="question" key={q.id}>
                <label className="field">
                  <span className="question-prompt">{q.prompt}</span>
                  {q.help && <span className="question-help">{q.help}</span>}
                  <textarea
                    className="textarea"
                    rows={q.type === 'longtext' ? 6 : 3}
                    value={answers[q.id] ?? ''}
                    onChange={(e) =>
                      setAnswers((a) => ({ ...a, [q.id]: e.target.value }))
                    }
                  />
                </label>
              </div>
            ),
          )}

          {saveState.error && (
            <p className="error" role="alert">
              {saveState.error.data?.error ?? 'Could not save. Try again.'}
            </p>
          )}

          <div className="runner-actions">
            <button
              type="button"
              className="btn btn-quiet"
              onClick={() => setStep(step - 1)}
            >
              Back
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={!sectionDone(section) || saveState.isLoading}
            >
              {step < sections.length ? 'Next part' : 'Save'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

// The saved result. For a checklist the piece moves on a small board here,
// so the feedback and the motion land in the same place.
function Result({ quiz, result, previous, user }) {
  const { data: users = [] } = useUsersQuery();
  const { data: attempts = [] } = useGetAttemptsQuery(52);
  const [revealed, setRevealed] = useState(false);
  const players = playersFrom(users);

  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 450);
    return () => clearTimeout(t);
  }, []);

  const band = bandFor(result.total);
  const shown = revealed
    ? attempts
    : attempts.filter((a) => a.id !== result.id);
  const delta =
    previous && previous.total !== null && result.total !== null
      ? result.total - previous.total
      : null;

  return (
    <div className="runner">
      <section className="card result">
        <h1>Saved.</h1>
        {result.total !== null ? (
          <>
            <p className="result-total">
              <strong>Total {result.total}.</strong>
              {band && (
                <span className="result-band">
                  <i style={{ background: bandColor(band) }} />
                  Burns puts {band.min} to {band.max} as “
                  {band.label.toLowerCase()}”.
                </span>
              )}
            </p>
            <p className="muted">
              {previous
                ? delta === 0
                  ? `Same as last time (${relativeDate(previous.completedAt)}).`
                  : `${Math.abs(delta)} ${delta > 0 ? 'higher' : 'lower'} than last time, ${relativeDate(previous.completedAt)} (${previous.total}).`
                : 'First one on the board.'}
            </p>
            <p className="muted">
              A checklist is not a diagnosis. {user.username}, it is a number
              the two of you can look back on.
            </p>
            {quiz.kind === 'checklist' && (
              <Board
                attempts={shown}
                players={players}
                legend={false}
                limit={11}
              />
            )}
          </>
        ) : (
          <p>
            Your answers are kept with today's date. You can read them back any
            time from the history.
          </p>
        )}
        <div className="row">
          <Link to="/" className="btn btn-primary">
            Back to the table
          </Link>
          <Link to={`/check-in/${quiz.slug}/history`} className="btn btn-quiet">
            History
          </Link>
        </div>
      </section>
    </div>
  );
}
