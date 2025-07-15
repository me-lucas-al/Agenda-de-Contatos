'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
  email: string | null;
  name: string | null;
  login: (email: string, name: string) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [email, setEmail] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const login = (newEmail: string, newName: string) => {
    setEmail(newEmail);
    setName(newName);
    localStorage.setItem('userData', JSON.stringify({ email: newEmail, name: newName }));
  };

  const logout = () => {
    setEmail(null);
    setName(null);
    localStorage.removeItem('userData');
  };

  useEffect(() => {
    const checkAuth = () => {
      try {
        const storedData = localStorage.getItem('userData');
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          setEmail(parsedData.email);
          setName(parsedData.name);
        }
      } catch (error) {
        console.error('Failed to parse user data', error);
        localStorage.removeItem('userData');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ email, name, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};