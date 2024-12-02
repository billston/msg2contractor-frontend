import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { useAuth0 } from "@auth0/auth0-react";
import Layout from './components/Layout';
import ReceptoresPage from './pages/ReceptoresPage';
import GruposPage from './pages/GruposPage';
import ComunicadosPage from './pages/ComunicadosPage';
import NotificacionesPage from './pages/NotificacionesPage';
import MainPage from './pages/MainPage';

const queryClient = new QueryClient();

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route
              path="/receptores"
              element={
                <ProtectedRoute>
                  <ReceptoresPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/grupos"
              element={
                <ProtectedRoute>
                  <GruposPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/comunicados"
              element={
                <ProtectedRoute>
                  <ComunicadosPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/notificaciones"
              element={
                <ProtectedRoute>
                  <NotificacionesPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Layout>
      </Router>
      <Toaster position="top-right" />
    </QueryClientProvider>
  );
}

export default App;