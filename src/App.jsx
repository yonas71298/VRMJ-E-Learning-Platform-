import { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import MeowAIChat from './components/MeowAIChat';
import Navbar from './components/Navbar';
import PageLoader from './components/PageLoader';
import Favorites from './pages/Favorites';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
import { getSession } from './services/api';

function ProtectedRoute({ user, children }) {
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

function App() {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    setUser(getSession());
    setReady(true);

    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  if (!ready || showLoader) {
    return <PageLoader message="Preparing your learning space…" />;
  }

  return (
    <div className="app-shell">
      {user && <Navbar user={user} onLogout={() => setUser(null)} />}
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute user={user}>
                <Home user={user} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/favorites"
            element={
              <ProtectedRoute user={user}>
                <Favorites user={user} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute user={user}>
                <Profile user={user} onUserUpdate={setUser} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/login"
            element={
              user ? <Navigate to="/" replace /> : <Login onLogin={setUser} />
            }
          />
          <Route
            path="/signup"
            element={user ? <Navigate to="/" replace /> : <Signup />}
          />
          <Route path="*" element={<Navigate to={user ? '/' : '/login'} replace />} />
        </Routes>
      </main>
      {user && <Footer />}
      {user && <MeowAIChat userName={user.name} />}
    </div>
  );
}

export default App;
