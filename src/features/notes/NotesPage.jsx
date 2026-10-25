import { Link } from 'react-router-dom';
import { useDeletePostMutation, useGetPostsQuery } from '../../app/api.js';
import { fullDate, relativeDate } from '../../lib/dates.js';

export function NotesPage({ user }) {
  const { data: posts = [], isLoading, isError } = useGetPostsQuery();
  const [deletePost, deleteState] = useDeletePostMutation();

  return (
    <>
      <div className="page-title">
        <div>
          <h1>Notes</h1>
          <p className="muted">Between the two of you, newest first.</p>
        </div>
        <Link to="/notes/new" className="btn btn-primary">
          Write a note
        </Link>
      </div>

      {isLoading && <p className="muted">Fetching the notes…</p>}
      {isError && (
        <p className="error" role="alert">
          Could not load the notes.
        </p>
      )}
      {!isLoading && posts.length === 0 && (
        <section className="card">
          <p className="empty">No notes yet. The first one is yours.</p>
        </section>
      )}

      <div className="stack deal">
        {posts.map((post) => (
          <article className="card note" key={post.id}>
            <div className="note-head">
              <h2>{post.title}</h2>
              <span className="note-meta" title={fullDate(post.createdAt)}>
                {post.author?.username} · {relativeDate(post.createdAt)}
              </span>
            </div>
            <p className="note-body">{post.article}</p>
            {post.authorId === user.id && (
              <div className="note-actions">
                <button
                  type="button"
                  className="btn btn-danger"
                  disabled={deleteState.isLoading}
                  onClick={() => {
                    if (
                      window.confirm(
                        `Delete “${post.title}”? This cannot be undone.`,
                      )
                    )
                      deletePost(post.id);
                  }}
                >
                  Delete
                </button>
              </div>
            )}
          </article>
        ))}
      </div>
    </>
  );
}
