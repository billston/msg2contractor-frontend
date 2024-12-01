import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { authService } from '../services/authService';
import { clearAuth, getAuthToken } from '../utils/auth';

export function useAuthRedirect() {
  const navigate = useNavigate();
  const { isAuthenticated, user, getIdTokenClaims, isLoading } = useAuth0();

  useEffect(() => {
    const handleAuthentication = async () => {
      // Wait for Auth0 to finish loading
      if (isLoading) return;

      // If user is authenticated with Auth0
      if (isAuthenticated && user) {
        try {
          const token = await getIdTokenClaims();
          if (token) {
            await authService.loginWithSocialToken(token.__raw, user);
            // Only redirect if we're on the login page
            if (window.location.pathname === '/login') {
              navigate('/', { replace: true });
            }
          }
        } catch (error) {
          console.error('Error during authentication:', error);
          clearAuth();
          navigate('/login', { replace: true });
        }
      } else if (!isLoading && !isAuthenticated && !getAuthToken()) {
        // If not authenticated and no local token, redirect to login
        navigate('/login', { replace: true });
      }
    };

    handleAuthentication();
  }, [isAuthenticated, user, getIdTokenClaims, navigate, isLoading]);
}