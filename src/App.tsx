import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { Auth0Provider } from '@auth0/auth0-react';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/Layout';
import LoginPage from './pages/LoginPage';
import ReceptoresPage from './pages/ReceptoresPage';
import GruposPage from './pages/GruposPage';
import ComunicadosPage from './pages/ComunicadosPage';
import NotificacionesPage from './pages/NotificacionesPage';

const queryClient = new QueryClient();

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" replace />;
}

function App() {
  return (
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <Router>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <Layout>
                      <Routes>
                        <Route path="/receptores" element={<ReceptoresPage />} />
                        <Route path="/grupos" element={<GruposPage />} />
                        <Route path="/comunicados" element={<ComunicadosPage />} />
                        <Route path="/notificaciones" element={<NotificacionesPage />} />
                        <Route path="/" element={<Navigate to="/comunicados" replace />} />
                      </Routes>
                    </Layout>
                  </PrivateRoute>
                }
              />
            </Routes>
          </Router>
          <Toaster position="top-right" />
        </QueryClientProvider>
      </AuthProvider>
    </Auth0Provider>
  );
}

export default App;