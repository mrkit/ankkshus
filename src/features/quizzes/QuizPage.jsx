import { useState } from 'react';
import { useGetQuizzesQuery } from '../../app/api.js';

// Each question is scored 0 to 4. Answers are tracked by question id, so a
// question in one section can never affect the total of another.
export function QuizPage() {
  const { data: quizzes = [], isLoading, isError } = useGetQuizzesQuery();
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const quiz = quizzes[0];
  const questions = quiz?.quizSections.flatMap((s) => s.quizQuestions) ?? [];
  const total = questions.reduce((sum, q) => sum + (answers[q.id] ?? 0), 0);
  const answered = questions.filter((q) => answers[q.id] !== undefined).length;

  function choose(questionId, score) {
    setAnswers((prev) => ({ ...prev, [questionId]: score }));
    setSubmitted(false);
  }

  function reset() {
    setAnswers({});
    setSubmitted(false);
  }

  return (
    <section className="quiz">
      <h1>Quizzes</h1>
      <section className="quiz-main">
        {isLoading && <p>Loading quiz…</p>}
        {isError && <p role="alert">Could not load the quiz.</p>}
        {quiz && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
          >
            <h2 className="titleStyle">{quiz.title}</h2>
            <ul className="quiz-main-ul">
              {quiz.quizSections.map((section) => (
                <li className="quiz-section" key={section.id}>
                  <h3>{section.section}</h3>
                  {section.quizQuestions.map((question) => (
                    <fieldset className="quiz-row" key={question.id}>
                      <legend>{question.question}</legend>
                      <div className="quiz-row-scores">
                        {[0, 1, 2, 3, 4].map((score) => (
                          <label key={score}>
                            <input
                              type="radio"
                              name={`question-${question.id}`}
                              value={score}
                              checked={answers[question.id] === score}
                              onChange={() => choose(question.id, score)}
                            />
                            {score}
                          </label>
                        ))}
                      </div>
                    </fieldset>
                  ))}
                </li>
              ))}
            </ul>
            <button type="button" className="submitStyle">
              Submit
            </button>
          </form>
        )}
        <button type="button" onClick={reset} className="resetStyle">
          Reset
        </button>
        <div className="scoreStyle">
          {submitted
            ? `Total: ${total}`
            : `Answered ${answered} of ${questions.length}`}
        </div>
      </section>
    </section>
  );
}
