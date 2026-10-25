import { Link, Route, Routes } from 'react-router-dom';
import { GamesPage } from '../games/GamesPage.jsx';
import { CreatePostPage } from '../posts/CreatePostPage.jsx';
import { QuizPage } from '../quizzes/QuizPage.jsx';
import { VideosPage } from '../videos/VideosPage.jsx';

function DistillerySidebar() {
  return (
    <aside className="distillery-sidebar">
      <h2 className="distillery-sidebar-title">The Distillery</h2>
      <ul className="distillery-sidebar-main-tabs">
        <li>
          <Link to="/distillery/videos">Videos</Link>
        </li>
        <li>
          <Link to="/distillery/quizzes">Quizzes</Link>
        </li>
        <li>
          <Link to="/distillery/games">Games</Link>
        </li>
      </ul>
    </aside>
  );
}

export function DistilleryLayout() {
  return (
    <section className="distillery">
      <DistillerySidebar />
      <section className="distillery-main">
        <Routes>
          <Route index element={<p>Pick a section from the sidebar.</p>} />
          <Route path="videos" element={<VideosPage />} />
          <Route path="quizzes/*" element={<QuizPage />} />
          <Route path="games" element={<GamesPage />} />
          <Route path="createpost" element={<CreatePostPage />} />
        </Routes>
      </section>
    </section>
  );
}
