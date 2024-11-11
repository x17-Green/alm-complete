import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { loginUser, logoutUser } from '../utils/api';

interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  fullName: string;
}

interface AuthContextType {
  isLoggedIn: boolean;
  user: UserData | null;
  login: (usernameOrEmail: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      setIsLoggedIn(true);
      // You might want to validate the token here or fetch user data
    }
    setLoading(false);
  }, []);

  const login = async (usernameOrEmail: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await loginUser({ usernameOrEmail, password });
      if (response.jwtToken) {
        localStorage.setItem('jwtToken', response.jwtToken);
      }
      if (response.refreshToken) {
        localStorage.setItem('refreshToken', response.refreshToken);
      }
      setIsLoggedIn(true);
      setUser(response.userData || null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      setIsLoggedIn(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('jwtToken');
      await logoutUser(token);
      localStorage.removeItem('jwtToken');
      localStorage.removeItem('refreshToken');
      setIsLoggedIn(false);
      setUser(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };