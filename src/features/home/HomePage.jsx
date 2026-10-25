import { Link } from 'react-router-dom';
import {
  useDeletePostMutation,
  useGetPostsQuery,
  useMeQuery,
} from '../../app/api.js';

export function HomePage() {
  const { data: me } = useMeQuery();
  const { data: posts = [], isLoading, isError } = useGetPostsQuery();
  const [deletePost] = useDeletePostMutation();
  const user = me?.user;

  return (
    <div className="home">
      <h1>Welcome, {user ? user.username : 'Guest'}!</h1>
      <p>Add new content.</p>
      <section>
        <ul className="home-options">
          <li>
            <Link to="/distillery/createpost">Add a Post</Link>
          </li>
          <li>
            <Link to="/distillery/videos">Add a Video</Link>
          </li>
          <li>
            <Link to="/distillery/quizzes">Add a Quiz</Link>
          </li>
        </ul>

        {isLoading && <p>Loading posts…</p>}
        {isError && <p role="alert">Could not load posts.</p>}

        <ol className="home-posts">
          {posts.map((post) => (
            <li className="home-article" key={post.id}>
              <div className="home-article-title">
                <h2>{post.title}</h2>
                {user && (
                  <button type="button" onClick={() => deletePost(post.id)}>
                    Delete
                  </button>
                )}
              </div>
              <p className="home-article-author-date">
                <em>
                  {post.author} - {post.date}
                </em>
              </p>
              <p className="home-article-article">{post.article}</p>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
