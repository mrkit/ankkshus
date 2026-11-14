import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetQuizAttemptsQuery } from '../../app/api.js';
import { TFA_ITEMS, TOOLS, TRAP_ITEMS, TRAPS } from './course.js';

export function TrapSorter({ value = {}, set }) {
  const right = TRAP_ITEMS.filter((item, i) => value[i] === item.answer).length;
  const tried = Object.keys(value).length;
  return (
    <div className="traps">
      <p>
        Ten thoughts, ten traps. Pick the trap each thought falls into. Every
        answer explains itself.
      </p>
      {TRAP_ITEMS.map((item, i) => {
        const pick = value[i];
        return (
          <fieldset key={item.thought} className="trap-item">
            <legend>“{item.thought}”</legend>
            <div className="trap-options">
              {item.options.map((key) => (
                <button
                  key={key}
                  type="button"
                  className={`btn btn-quiet${pick === key ? (key === item.answer ? ' is-right' : ' is-wrong') : ''}`}
                  aria-pressed={pick === key}
                  onClick={() => set({ ...value, [i]: key })}
                >
                  {TRAPS[key][0]}
                </button>
              ))}
            </div>
            {pick && (
              <p className="trap-feedback" role="status">
                {pick === item.answer ? (
                  <>
                    <strong>Yes.</strong> {TRAPS[pick][0]} {TRAPS[pick][1]}.
                  </>
                ) : (
                  <>
                    <strong>{TRAPS[pick][0]}</strong> {TRAPS[pick][1]}. This one
                    is closer to{' '}
                    <strong>{TRAPS[item.answer][0].toLowerCase()}</strong>: it{' '}
                    {TRAPS[item.answer][1]}.
                  </>
                )}
              </p>
            )}
          </fieldset>
        );
      })}
      {tried > 0 && (
        <p className="muted">
          {right} of {tried} matched on the first pick you left in place.
        </p>
      )}
    </div>
  );
}

const DAY = 24 * 60 * 60 * 1000;
const dayKey = (d) => new Date(d).toLocaleDateString('en-CA');

export function JournalDays({ user }) {
  const { data: morning = [] } = useGetQuizAttemptsQuery('cbt-6-morning');
  const { data: evening = [] } = useGetQuizAttemptsQuery('cbt-6-evening');
  const mine = (list) =>
    new Set(
      list
        .filter((a) => a.userId === user.id)
        .map((a) => dayKey(a.completedAt)),
    );
  const am = mine(morning);
  const pm = mine(evening);
  const days = Array.from({ length: 14 }, (_, i) => {
    const d = new Date(Date.now() - (13 - i) * DAY);
    return {
      key: dayKey(d),
      label: d.toLocaleDateString('en-US', { weekday: 'narrow' }),
      date: d,
    };
  });
  const count = days.filter((d) => am.has(d.key) || pm.has(d.key)).length;

  return (
    <div className="journal-days">
      <p>
        Days you journaled in the last two weeks: <strong>{count}</strong>. Top
        half is morning, bottom half is evening.
      </p>
      <ol className="day-strip" aria-label="Last 14 days">
        {days.map((d) => (
          <li key={d.key} title={d.date.toDateString()}>
            <span className={`half am${am.has(d.key) ? ' on' : ''}`} />
            <span className={`half pm${pm.has(d.key) ? ' on' : ''}`} />
            <span className="day-label" aria-hidden="true">
              {d.label}
            </span>
            <span className="sr-only">
              {d.date.toDateString()}: {am.has(d.key) ? 'morning' : ''}{' '}
              {pm.has(d.key) ? 'evening' : ''}
            </span>
          </li>
        ))}
      </ol>
      <div className="row">
        <Link to="/check-in/cbt-6-morning" className="btn btn-primary">
          Morning journal
        </Link>
        <Link to="/check-in/cbt-6-evening" className="btn btn-quiet">
          Evening journal
        </Link>
      </div>
    </div>
  );
}

export function LabelSwap({ value = {}, set }) {
  const field = (key) => ({
    value: value[key] ?? '',
    onChange: (e) => set({ ...value, [key]: e.target.value }),
    maxLength: 500,
  });
  return (
    <div className="label-swap">
      <div className="swap-example">
        <p className="muted">For example</p>
        <p>
          <s>“I'm useless.”</s> → “I made a mistake on one task. I'm a person
          who gets many things right and some things wrong.”
        </p>
      </div>
      <label className="field">
        <span>A label you call yourself</span>
        <input className="input" {...field('label')} />
      </label>
      {value.label?.trim() && (
        <>
          <label className="field">
            <span>
              What would you say to a friend who called themselves “
              {value.label.trim()}”? Write it about yourself, describing what
              happened rather than who you are.
            </span>
            <textarea className="textarea" rows={3} {...field('alternative')} />
          </label>
          <label className="field">
            <span>One piece of evidence for that kinder version</span>
            <textarea className="textarea" rows={2} {...field('evidence')} />
          </label>
        </>
      )}
    </div>
  );
}

export function Toolbox({ value = {}, set }) {
  const picked = value.tools ?? [];
  const plans = value.plans ?? {};
  const toggle = (id) =>
    set({
      ...value,
      tools: picked.includes(id)
        ? picked.filter((t) => t !== id)
        : [...picked, id],
    });
  return (
    <div className="toolbox">
      <p>
        Tick the tools you want to keep, then write when you will reach for
        each.
      </p>
      <ul>
        {TOOLS.map((tool) => (
          <li key={tool.id}>
            <label className="check">
              <input
                type="checkbox"
                checked={picked.includes(tool.id)}
                onChange={() => toggle(tool.id)}
              />
              <span>{tool.label}</span>
            </label>
            <Link to={tool.to} className="tool-open">
              Open
            </Link>
            {picked.includes(tool.id) && (
              <label className="field tool-plan">
                <span>When I notice…</span>
                <input
                  className="input"
                  placeholder="e.g. I'm replaying a conversation at night"
                  value={plans[tool.id] ?? ''}
                  maxLength={300}
                  onChange={(e) =>
                    set({
                      ...value,
                      plans: { ...plans, [tool.id]: e.target.value },
                    })
                  }
                />
              </label>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

const TFA_LABEL = { thought: 'Thought', feeling: 'Feeling', action: 'Action' };
const TFA_WHY = {
  thought: 'it is something you tell yourself, a sentence in your head',
  feeling: 'it is an emotion, usually one word',
  action: 'it is something you did, that someone else could have seen',
};

export function ThoughtFeelingAction({ value = {}, set }) {
  return (
    <div className="traps">
      <p>CBT splits an experience into three parts. Which part is each line?</p>
      {TFA_ITEMS.map(([line, answer], i) => {
        const pick = value[i];
        return (
          <fieldset key={line} className="trap-item">
            <legend>“{line}”</legend>
            <div className="trap-options tfa-options">
              {Object.keys(TFA_LABEL).map((key) => (
                <button
                  key={key}
                  type="button"
                  className={`btn btn-quiet${pick === key ? (key === answer ? ' is-right' : ' is-wrong') : ''}`}
                  aria-pressed={pick === key}
                  onClick={() => set({ ...value, [i]: key })}
                >
                  {TFA_LABEL[key]}
                </button>
              ))}
            </div>
            {pick && (
              <p className="trap-feedback" role="status">
                {pick === answer ? (
                  <strong>Yes. </strong>
                ) : (
                  <strong>Not quite. </strong>
                )}
                It is {answer === 'action' ? 'an' : 'a'} {answer}:{' '}
                {TFA_WHY[answer]}.
              </p>
            )}
          </fieldset>
        );
      })}
    </div>
  );
}

export function ProblemRanker({ value = {}, set }) {
  const items = value.items ?? [];
  const [draft, setDraft] = useState('');
  const add = (e) => {
    e.preventDefault();
    const text = draft.trim();
    if (!text || items.length >= 10) return;
    set({ ...value, items: [...items, { text, effect: 5 }] });
    setDraft('');
  };
  const update = (i, patch) =>
    set({
      ...value,
      items: items.map((it, j) => (j === i ? { ...it, ...patch } : it)),
    });
  const remove = (i) =>
    set({ ...value, items: items.filter((_, j) => j !== i) });
  const ranked = items
    .map((it, i) => ({ ...it, i }))
    .sort((a, b) => b.effect - a.effect)
    .slice(0, 5);

  return (
    <div className="problems">
      <p>
        Write down what is not right at the moment, one line each. Rate how much
        each one affects your days, 0 to 10. The five with the biggest effect
        rise to the top.
      </p>
      <form className="row ladder-own" onSubmit={add}>
        <input
          className="input"
          placeholder="A problem, in a few words"
          value={draft}
          maxLength={200}
          onChange={(e) => setDraft(e.target.value)}
        />
        <button type="submit" className="btn btn-quiet">
          Add
        </button>
      </form>
      {items.length > 0 && (
        <ul className="problem-list">
          {items.map((it, i) => (
            <li key={it.text}>
              <span>{it.text}</span>
              <label className="ladder-rating">
                <span className="sr-only">Effect on my days, 0 to 10</span>
                <span aria-hidden="true">Effect:</span>
                <select
                  className="input"
                  value={it.effect}
                  onChange={(e) =>
                    update(i, { effect: Number(e.target.value) })
                  }
                >
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </label>
              <button
                type="button"
                className="btn-link"
                onClick={() => remove(i)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
      {ranked.length > 0 && (
        <div className="reveal">
          <h3>Your top {ranked.length}</h3>
          <ol>
            {ranked.map((it) => (
              <li key={it.text}>
                {it.text} <span className="muted">({it.effect}/10)</span>
              </li>
            ))}
          </ol>
          <label className="field">
            <span>
              A long-term goal for “{ranked[0].text}”, about you rather than
              anyone else:
            </span>
            <input
              className="input"
              value={value.goal ?? ''}
              maxLength={300}
              onChange={(e) => set({ ...value, goal: e.target.value })}
            />
          </label>
        </div>
      )}
    </div>
  );
}

function Fields({ fields, value = {}, set }) {
  const bind = (key) => ({
    value: value[key] ?? '',
    onChange: (e) => set({ ...value, [key]: e.target.value }),
  });
  return (
    <div className="label-swap">
      {fields.map(([key, label, rows]) =>
        rows ? (
          <label key={key} className="field">
            <span>{label}</span>
            <textarea
              className="textarea"
              rows={rows}
              maxLength={1000}
              {...bind(key)}
            />
          </label>
        ) : (
          <label key={key} className="field">
            <span>{label}</span>
            <input className="input" maxLength={300} {...bind(key)} />
          </label>
        ),
      )}
    </div>
  );
}

export function AvoidanceCost(props) {
  return (
    <>
      <p>Pick one thing you avoid and weigh it up.</p>
      <Fields
        {...props}
        fields={[
          ['avoid', 'What I avoid'],
          ['now', 'What avoiding it gives me right now', 2],
          ['later', 'What it costs me over months', 2],
          ['instead', 'A healthy behavior to do instead'],
          ['when', 'When I will do it (a day and time)'],
        ]}
      />
    </>
  );
}

export function EmotionParts(props) {
  return (
    <>
      <p>
        Name the feeling first. The <Link to="/feel">feelings map</Link> helps
        if the word will not come. Then take it apart.
      </p>
      <Fields
        {...props}
        fields={[
          ['emotion', 'The emotion'],
          ['situation', 'What was happening', 2],
          ['thought', 'What I was telling myself', 2],
          ['body', 'Where I felt it in my body'],
          ['urge', 'What it made me do, or want to do'],
          ['challenge', 'A more balanced thought about the situation', 2],
        ]}
      />
    </>
  );
}
