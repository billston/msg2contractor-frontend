import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { authService } from '../services/authService';
import { clearAuth } from '../utils/auth';

export function useAuthMethods() {
  const navigate = useNavigate();
  const { loginWithRedirect, logout: auth0Logout } = useAuth0();

  const login = useCallback(async (email: string, password: string) => {
    try {
      await authService.loginWithCredentials(email, password);
      navigate('/', { replace: true });
    } catch (error) {
      throw error;
    }
  }, [navigate]);

  const loginWithGoogle = useCallback(async () => {
    try {
      await loginWithRedirect({
        authorizationParams: {
          connection: 'google-oauth2',
        },
      });
    } catch (error) {
      console.error('Error during Google login:', error);
      clearAuth();
      throw new Error('Error al iniciar sesión con Google');
    }
  }, [loginWithRedirect]);

  const loginWithMicrosoft = useCallback(async () => {
    try {
      await loginWithRedirect({
        authorizationParams: {
          connection: 'windowslive',
        },
      });
    } catch (error) {
      console.error('Error during Microsoft login:', error);
      clearAuth();
      throw new Error('Error al iniciar sesión con Microsoft');
    }
  }, [loginWithRedirect]);

  const logout = useCallback(async () => {
    clearAuth();
    await auth0Logout({
      logoutParams: {
        returnTo: window.location.origin + '/login',
      },
    });
  }, [auth0Logout]);

  return {
    login,
    loginWithGoogle,
    loginWithMicrosoft,
    logout,
  };
}