import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { LoginPage } from '../features/auth/LoginPage.jsx';
import { AttemptDetail } from '../features/checkin/AttemptDetail.jsx';
import { CheckInLibrary } from '../features/checkin/CheckInLibrary.jsx';
import { QuizHistory } from '../features/checkin/QuizHistory.jsx';
import { QuizRunner } from '../features/checkin/QuizRunner.jsx';
import { FearNow } from '../features/fear/FearNow.jsx';
import { FearPage } from '../features/fear/FearPage.jsx';
import { ReviewPage } from '../features/fear/ReviewPage.jsx';
import { RungSession } from '../features/fear/RungSession.jsx';
import { StepRunner } from '../features/fear/StepRunner.jsx';
import { FeelPage } from '../features/feel/FeelPage.jsx';
import { HomePage } from '../features/home/HomePage.jsx';
import { ManualPage } from '../features/manual/ManualPage.jsx';
import { PeoplePage } from '../features/manual/PeoplePage.jsx';
import { SituationPage } from '../features/manual/SituationPage.jsx';
import { NewNotePage } from '../features/notes/NewNotePage.jsx';
import { NotesPage } from '../features/notes/NotesPage.jsx';
import { SettingsPage } from '../features/settings/SettingsPage.jsx';
import { SectionPage } from '../features/therapy/SectionPage.jsx';
import { TherapyPage } from '../features/therapy/TherapyPage.jsx';
import { VideosPage } from '../features/videos/VideosPage.jsx';
import { useMeQuery } from './api.js';
import { Footer } from './Footer.jsx';
import { TopBar } from './TopBar.jsx';

// The whole site is for two signed-in people, so every route sits behind login.
export function App() {
  const { data, isLoading } = useMeQuery();
  const user = data?.user;
  const { pathname } = useLocation();

  // The home page alone shows the watercolour (see app.scss).
  useEffect(() => {
    document.body.dataset.page = pathname === '/' ? 'home' : 'inner';
  }, [pathname]);

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
      <TopBar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage user={user} />} />
          <Route path="/login" element={<Navigate to="/" replace />} />
          <Route path="/manual" element={<ManualPage />} />
          <Route path="/manual/people" element={<PeoplePage />} />
          <Route path="/manual/:slug" element={<SituationPage />} />
          <Route path="/fear" element={<FearPage />} />
          <Route path="/fear/now" element={<FearNow />} />
          <Route path="/fear/rung" element={<RungSession />} />
          <Route path="/fear/step/:slug" element={<StepRunner />} />
          <Route path="/fear/review/:slug" element={<ReviewPage />} />
          <Route path="/therapy" element={<TherapyPage />} />
          <Route path="/therapy/:n" element={<SectionPage user={user} />} />
          <Route path="/feel" element={<FeelPage />} />
          <Route path="/settings" element={<SettingsPage user={user} />} />
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
