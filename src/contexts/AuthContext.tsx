import { createContext, useContext, ReactNode, useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useAuthMethods } from '../hooks/useAuthMethods';
import { useAuthRedirect } from '../hooks/useAuthRedirect';
import { getAuthUser } from '../utils/auth';

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
  const { isAuthenticated: auth0IsAuthenticated, isLoading: auth0IsLoading, user: auth0User } = useAuth0();
  const [user, setUser] = useState(getAuthUser());
  const { login, loginWithGoogle, loginWithMicrosoft, logout } = useAuthMethods();
  
  useEffect(() => {
    if (auth0User) {
      setUser(auth0User);
    }
  }, [auth0User]);

  // Handle authentication redirects
  useAuthRedirect();

  const isAuthenticated = auth0IsAuthenticated || !!user;
  const isLoading = auth0IsLoading;

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        user: user || auth0User,
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