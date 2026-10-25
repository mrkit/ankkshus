import { Navigate, Route, Routes } from 'react-router-dom';
import { LoginPage } from '../features/auth/LoginPage.jsx';
import { AttemptDetail } from '../features/checkin/AttemptDetail.jsx';
import { CheckInLibrary } from '../features/checkin/CheckInLibrary.jsx';
import { QuizHistory } from '../features/checkin/QuizHistory.jsx';
import { QuizRunner } from '../features/checkin/QuizRunner.jsx';
import { HomePage } from '../features/home/HomePage.jsx';
import { NewNotePage } from '../features/notes/NewNotePage.jsx';
import { NotesPage } from '../features/notes/NotesPage.jsx';
import { VideosPage } from '../features/videos/VideosPage.jsx';
import { useMeQuery } from './api.js';
import { Footer } from './Footer.jsx';
import { TopBar } from './TopBar.jsx';

// The whole site is for two signed-in people, so every route sits behind login.
export function App() {
  const { data, isLoading } = useMeQuery();
  const user = data?.user;

  if (isLoading) return null;

  if (!user) {
    return (
      <Routes>
        <Route path="*" element={<LoginPage />} />
      </Routes>
    );
  }

  return (
    <div className="shell">
      <TopBar user={user} />
      <main>
        <Routes>
          <Route path="/" element={<HomePage user={user} />} />
          <Route path="/login" element={<Navigate to="/" replace />} />
          <Route path="/check-in" element={<CheckInLibrary user={user} />} />
          <Route
            path="/check-in/attempts/:id"
            element={<AttemptDetail user={user} />}
          />
          <Route path="/check-in/:slug" element={<QuizRunner user={user} />} />
          <Route
            path="/check-in/:slug/history"
            element={<QuizHistory user={user} />}
          />
          <Route path="/notes" element={<NotesPage user={user} />} />
          <Route path="/notes/new" element={<NewNotePage user={user} />} />
          <Route path="/videos" element={<VideosPage user={user} />} />
          <Route
            path="*"
            element={<p className="muted">That page is not on the board.</p>}
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
