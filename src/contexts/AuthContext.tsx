import { createContext, useContext, ReactNode, useCallback } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { api } from '../config/api';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: any;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  loginWithMicrosoft: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const {
    isAuthenticated,
    isLoading,
    user,
    loginWithRedirect,
    logout: auth0Logout,
  } = useAuth0();

  const login = useCallback(async (email: string, password: string) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      const { token } = response.data;
      localStorage.setItem('token', token);
    } catch (error) {
      throw new Error('Error al iniciar sesión');
    }
  }, []);

  const loginWithGoogle = useCallback(async () => {
    await loginWithRedirect({
      authorizationParams: {
        connection: 'google-oauth2',
      },
    });
  }, [loginWithRedirect]);

  const loginWithMicrosoft = useCallback(async () => {
    await loginWithRedirect({
      authorizationParams: {
        connection: 'windowslive',
      },
    });
  }, [loginWithRedirect]);

  const logout = useCallback(async () => {
    localStorage.removeItem('token');
    await auth0Logout();
  }, [auth0Logout]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        user,
        login,
        loginWithGoogle,
        loginWithMicrosoft,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}