"use client";

import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

interface User {
  isAdmin: boolean;
  role: string;
  // Add other user properties as needed
}

interface AuthContextType {
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  error: string | null;
  user: User | null;
  customer: User | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      const decodedUser = jwtDecode<User>(token);
      setUser(decodedUser);
    }
  }, []);

  const login = async (email: string, password: string) => {
    if (loginAttempts >= 8) {
      setError('Too many failed attempts. Please try again later.');
      return;
    }

    try {
      const response = await axios.post('/api/login', { email, password });
      const token = response.data.token;
      localStorage.setItem('jwt', token);
      const decodedUser = jwtDecode<User>(token);
      setUser(decodedUser);
      setLoginAttempts(0);
      setError(null);
    } catch (err) {
      setLoginAttempts(prev => prev + 1);
      setError('Invalid credentials.');
    }
  };

  const signup = async (email: string, password: string) => {
    try {
      const response = await axios.post('/api/signup', { email, password });
      const token = response.data.token;
      localStorage.setItem('jwt', token);
      const decodedUser = jwtDecode<User>(token);
      setUser(decodedUser);
      setError(null);
    } catch (err) {
      setError('Signup failed. Please try again.');
    }
  };

  return (
    <AuthContext.Provider value={{ login, signup, error, user, customer: user }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
