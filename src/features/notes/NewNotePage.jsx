import { Link, useNavigate } from 'react-router-dom';
import { useCreatePostMutation } from '../../app/api.js';

export function NewNotePage() {
  const navigate = useNavigate();
  const [createPost, { isLoading, error }] = useCreatePostMutation();

  async function handleSubmit(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const result = await createPost({
      title: form.get('title'),
      article: form.get('article'),
    });
    if (!result.error) navigate('/notes');
  }

  return (
    <>
      <div className="page-title">
        <h1>Write a note</h1>
      </div>
      <section className="card">
        <form className="note-form" onSubmit={handleSubmit}>
          <label className="field">
            <span>Title</span>
            <input
              className="input"
              type="text"
              name="title"
              autoComplete="off"
              required
              maxLength={200}
            />
          </label>
          <label className="field">
            <span>Note</span>
            <textarea
              className="textarea"
              name="article"
              rows={10}
              required
              maxLength={20000}
            />
          </label>
          {error && (
            <p className="error" role="alert">
              Could not save the note. Try again.
            </p>
          )}
          <div className="row">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isLoading}
            >
              Leave it on the table
            </button>
            <Link to="/notes" className="btn btn-quiet">
              Cancel
            </Link>
          </div>
        </form>
      </section>
    </>
  );
}
