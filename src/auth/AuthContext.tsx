import React, { createContext, useContext, useEffect, useState } from "react";
import { ENDPOINTS } from "../api/endpoints";

interface UserInfo {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  realmRoles: string[];
  created_at: string;
}

interface LoginResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

interface RefreshResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

interface AuthContextType {
  user: UserInfo | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  authFetch: (url: string, options?: RequestInit) => Promise<Response>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(() =>
    localStorage.getItem("access_token")
  );
  const [loading, setLoading] = useState(true);

  const saveTokens = (access_token: string, refresh_token: string) => {
    setAccessToken(access_token);
    localStorage.setItem("access_token", access_token);
    localStorage.setItem("refresh_token", refresh_token);
  };

  const clearTokens = () => {
    setAccessToken(null);
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  };

  const refreshAccessToken = async (): Promise<string> => {
    const refreshToken = localStorage.getItem("refresh_token");
    if (!refreshToken) throw new Error("Нет refresh_token");

    const response = await fetch(
      `${ENDPOINTS.AUTH.REFRESH}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh_token: refreshToken }),
      }
    );

    if (!response.ok) {
      logout();
      throw new Error("Refresh token недействителен");
    }

    const data: RefreshResponse = await response.json();
    saveTokens(data.access_token, data.refresh_token);
    return data.access_token;
  };

  const authFetch = async (url: string, options: RequestInit = {}) => {
    let token = accessToken;

    if (!token) {
      token = await refreshAccessToken();
    }

    let response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 401) {
      const newToken = await refreshAccessToken();
      response = await fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${newToken}`,
        },
      });
    }

    return response;
  };

  const login = async (username: string, password: string) => {
    const response = await fetch(
      `${ENDPOINTS.AUTH.LOGIN}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      }
    );

    if (!response.ok) throw new Error("Ошибка логина");

    const data: LoginResponse = await response.json();
    saveTokens(data.access_token, data.refresh_token);
    await loadUser(data.access_token);
  };

  const loadUser = async (token: string) => {
    const response = await fetch(
      `${ENDPOINTS.AUTH.ME}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (!response.ok) throw new Error("Ошибка получения user-info");

    const data: UserInfo = await response.json();
    setUser(data);
  };

  const logout = () => {
    setUser(null);
    clearTokens();
  };

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("access_token");
      const refreshToken = localStorage.getItem("refresh_token");

      if (token && refreshToken) {
        try {
          await loadUser(token);
        } catch {
          try {
            const newToken = await refreshAccessToken();
            await loadUser(newToken);
          } catch {
            logout();
          }
        }
      }

      setLoading(false);
    };

    initAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, authFetch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuth must be used inside AuthProvider");
  return context;
};