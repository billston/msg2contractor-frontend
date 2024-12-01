import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { Auth0Provider } from '@auth0/auth0-react';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/Layout';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import ReceptoresPage from './pages/ReceptoresPage';
import GruposPage from './pages/GruposPage';
import ComunicadosPage from './pages/ComunicadosPage';
import NotificacionesPage from './pages/NotificacionesPage';

const queryClient = new QueryClient();

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const token = localStorage.getItem('auth_token');
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
      useRefreshTokens={true}
      cacheLocation="localstorage"
    >
      <QueryClientProvider client={queryClient}>
        <Router>
          <AuthProvider>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <Layout>
                      <Routes>
                        <Route index element={<MainPage />} />
                        <Route path="/receptores" element={<ReceptoresPage />} />
                        <Route path="/grupos" element={<GruposPage />} />
                        <Route path="/comunicados" element={<ComunicadosPage />} />
                        <Route path="/notificaciones" element={<NotificacionesPage />} />
                      </Routes>
                    </Layout>
                  </PrivateRoute>
                }
              />
            </Routes>
            <Toaster position="top-right" />
          </AuthProvider>
        </Router>
      </QueryClientProvider>
    </Auth0Provider>
  );
}

export default App;