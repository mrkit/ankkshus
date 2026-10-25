import { Link, useNavigate } from 'react-router-dom';
import { useCreatePostMutation, useMeQuery } from '../../app/api.js';

const stamp = () =>
  new Date().toLocaleString([], {
    weekday: 'long',
    month: 'numeric',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

export function CreatePostPage() {
  const navigate = useNavigate();
  const { data: me } = useMeQuery();
  const [createPost, { isLoading, error }] = useCreatePostMutation();

  if (!me?.user) {
    return (
      <p>
        You need to <Link to="/login">log in</Link> to write a post.
      </p>
    );
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const result = await createPost({
      title: form.get('title'),
      article: form.get('article'),
      author: me.user.username,
      date: stamp(),
    });
    if (!result.error) navigate('/');
  }

  return (
    <div className="create-post">
      <h2>Create New Post:</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          autoComplete="off"
          required
        />
        <textarea
          name="article"
          cols="30"
          rows="10"
          placeholder="Content"
          required
        />
        <button type="submit" disabled={isLoading}>
          Create new post
        </button>
        {error && <p role="alert">Could not save the post.</p>}
      </form>
    </div>
  );
}
