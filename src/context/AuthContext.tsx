"use client";

import { createContext, useContext, useEffect, useState } from "react";
import api, { setAuthToken } from "@/lib/api";

type Customer = {
  id: string;
  email: string;
  role: string;
};

type AuthContextType = {
  customer: Customer | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [customer, setCustomer] = useState<Customer | null>(null);

  useEffect(() => {
    const t = localStorage.getItem("token");
    if (t) {
      setAuthToken(t);
      setToken(t);
      // optionally fetch customer info here
    }
  }, []);

  const login = async (email: string, password: string) => {
    const res = await api.post("/customers/login", {
      customer: { email, password },
    });

    const token = res.headers["authorization"]?.split(" ")[1];
    if (token) {
      setAuthToken(token);
      localStorage.setItem("token", token);
      setToken(token);
      setCustomer(res.data.customer);
    }
  };

  const signup = async (email: string, password: string) => {
    const res = await api.post("/customers/signup", {
      customer: { email, password },
    });

    const token = res.headers["authorization"]?.split(" ")[1];
    if (token) {
      setAuthToken(token);
      localStorage.setItem("token", token);
      setToken(token);
      setCustomer(res.data.customer);
    }
  };

  const logout = () => {
    setAuthToken(null);
    localStorage.removeItem("token");
    setToken(null);
    setCustomer(null);
  };

  return (
    <AuthContext.Provider value={{ customer, token, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
