import { User } from '@auth0/auth0-react';

export const TOKEN_KEY = 'auth_token';
export const USER_KEY = 'auth_user';

export const setAuthToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const getAuthToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const removeAuthToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const setAuthUser = (user: User) => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const getAuthUser = () => {
  const user = localStorage.getItem(USER_KEY);
  return user ? JSON.parse(user) : null;
};

export const removeAuthUser = () => {
  localStorage.removeItem(USER_KEY);
};

export const clearAuth = () => {
  removeAuthToken();
  removeAuthUser();
};