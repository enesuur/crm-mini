"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface User {
  id: string;
  username: string;
  email?: string;
  // İstersen başka kullanıcı bilgileri ekle
}

interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  login: (user: User, token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  // İstersen localStorage veya cookie'den otomatik login yapabilirsin:
  useEffect(() => {
    // Örnek:
    // const savedUser = localStorage.getItem("user");
    // const savedToken = localStorage.getItem("accessToken");
    // if (savedUser && savedToken) {
    //   setUser(JSON.parse(savedUser));
    //   setAccessToken(savedToken);
    // }
  }, []);

  const login = (userData: User, token: string) => {
    setUser(userData);
    setAccessToken(token);
    // localStorage.setItem("user", JSON.stringify(userData));
    // localStorage.setItem("accessToken", token);
  };

  const logout = () => {
    setUser(null);
    setAccessToken(null);
    // localStorage.removeItem("user");
    // localStorage.removeItem("accessToken");
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{ user, accessToken, login, logout, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
