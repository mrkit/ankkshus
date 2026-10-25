import { Link } from 'react-router-dom';
import {
  useGetAttemptsQuery,
  useGetPostsQuery,
  useGetVideosQuery,
  useUsersQuery,
} from '../../app/api.js';
import { Board } from '../../components/Board.jsx';
import { DRAGONS } from '../../dragons/dragons.jsx';
import { isToday, longDate, relativeDate } from '../../lib/dates.js';
import { playersFrom } from '../../lib/players.js';
import { youtubeId } from '../videos/youtube.js';

export function HomePage({ user }) {
  const { data: users = [] } = useUsersQuery();
  const { data: attempts = [], isLoading: loadingBoard } =
    useGetAttemptsQuery(52);
  const { data: posts = [] } = useGetPostsQuery();
  const { data: videos = [] } = useGetVideosQuery();

  const players = playersFrom(users);
  const other = players.find((p) => p.id !== user.id);
  const checkedInToday = attempts.some(
    (a) => a.userId === user.id && isToday(a.completedAt),
  );
  const newest = videos[0];
  const Hatchling = DRAGONS.at(-1)?.Component;

  return (
    <>
      <div className="greeting deal">
        <h1>Hi, {user.username}.</h1>
        <p className="muted">
          {longDate(new Date())}
          {other
            ? ` · ${other.username} is at the table too.`
            : ' · Waiting for the second player to sign up.'}
        </p>
      </div>

      <div className="home-grid deal">
        <div className="stack">
          <section className="card board-card" aria-labelledby="board-title">
            <div className="board-head">
              <h2 id="board-title">The board</h2>
              {checkedInToday ? (
                <span className="muted">You checked in today.</span>
              ) : (
                <Link to="/check-in/burns" className="btn btn-primary">
                  Check in today
                </Link>
              )}
            </div>
            {loadingBoard ? (
              <p className="muted">Setting up the board…</p>
            ) : (
              <Board attempts={attempts} players={players} />
            )}
            {attempts.length === 0 && (
              <p className="muted" style={{ marginTop: 12 }}>
                No check-ins yet. The first one puts a piece on the board.
              </p>
            )}
          </section>

          <section className="card" aria-labelledby="notes-title">
            <div className="page-title" style={{ marginBottom: 12 }}>
              <h2 id="notes-title">Notes</h2>
              <Link to="/notes/new" className="btn btn-quiet">
                Write a note
              </Link>
            </div>
            {posts.length === 0 ? (
              <p className="empty">Nothing here yet. Leave the first note.</p>
            ) : (
              <div className="stack">
                {posts.slice(0, 2).map((post) => (
                  <article className="note" key={post.id}>
                    <div className="note-head">
                      <h3>{post.title}</h3>
                      <span className="note-meta">
                        {post.author?.username} · {relativeDate(post.createdAt)}
                      </span>
                    </div>
                    <p className="note-body">{post.article}</p>
                  </article>
                ))}
                {posts.length > 2 && (
                  <Link to="/notes">All {posts.length} notes</Link>
                )}
              </div>
            )}
          </section>
        </div>

        <aside className="home-side">
          <section className="card" aria-labelledby="video-title">
            <h2 id="video-title" style={{ marginBottom: 10 }}>
              Newest video
            </h2>
            {newest ? (
              <Link
                to="/videos"
                className="plain video-tile"
                style={{ padding: 0, boxShadow: 'none' }}
              >
                {youtubeId(newest.url) && (
                  <img
                    src={`https://img.youtube.com/vi/${youtubeId(newest.url)}/mqdefault.jpg`}
                    alt=""
                    width="320"
                    height="180"
                  />
                )}
                <span className="video-title">{newest.title}</span>
                <span className="video-meta">
                  <span>
                    {newest.addedBy
                      ? `added by ${newest.addedBy.username}`
                      : ''}
                  </span>
                  <span>{relativeDate(newest.createdAt)}</span>
                </span>
              </Link>
            ) : (
              <p className="empty">No videos yet.</p>
            )}
          </section>

          <a className="card luci-card" href="/luci">
            <div className="luci-art" aria-hidden="true">
              {Hatchling && <Hatchling size={96} color="#9be36b" title="" />}
            </div>
            <h2>Play Luci</h2>
            <p className="muted">
              Run right, jump the gaps, stay ahead of the boulder.
            </p>
          </a>
        </aside>
      </div>
    </>
  );
}
