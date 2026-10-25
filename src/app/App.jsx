import { Route, Routes } from 'react-router-dom';
import { LoginPage } from '../features/auth/LoginPage.jsx';
import { DistilleryLayout } from '../features/distillery/DistilleryLayout.jsx';
import { HomePage } from '../features/home/HomePage.jsx';
import { Footer } from './Footer.jsx';
import { Header } from './Header.jsx';

export function App() {
  return (
    <div className="container">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/distillery/*" element={<DistilleryLayout />} />
          <Route path="*" element={<p>Page not found.</p>} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
