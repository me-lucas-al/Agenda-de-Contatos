import React from 'react';
import { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
  email: string | null;
  login: (email: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [email, setEmail] = useState<string | null>(null);

  const login = (email: string) => {
    setEmail(email);
    localStorage.setItem('userEmail', email);
  };

  const logout = () => {
    setEmail(null);
    localStorage.removeItem('userEmail');
  };

  React.useEffect(() => {
    const storedEmail = localStorage.getItem('userEmail');
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ email, login, logout }}>
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