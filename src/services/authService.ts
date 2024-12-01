import { User } from '@auth0/auth0-react';
import { api } from '../config/api';
import { setAuthToken, setAuthUser, clearAuth } from '../utils/auth';

interface LoginResponse {
  token: string;
  user: User;
}

export const authService = {
  async loginWithCredentials(email: string, password: string): Promise<void> {
    try {
      const response = await api.post<LoginResponse>('/auth/login', { email, password });
      const { token, user } = response.data;
      await this.handleAuthSuccess(token, user);
    } catch (error) {
      console.error('Error during credential login:', error);
      clearAuth();
      throw new Error('Error al iniciar sesión');
    }
  },

  async loginWithSocialToken(token: string, user: User): Promise<void> {
    try {
      // Validate token with backend
      const response = await api.post<LoginResponse>('/auth/social-login', { token });
      const { token: validatedToken } = response.data;
      await this.handleAuthSuccess(validatedToken, user);
    } catch (error) {
      console.error('Error during social login:', error);
      clearAuth();
      throw new Error('Error al iniciar sesión con proveedor social');
    }
  },

  async handleAuthSuccess(token: string, user: User): Promise<void> {
    setAuthToken(token);
    setAuthUser(user);
  },
};