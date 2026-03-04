import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();

  if (loading) return <p>Загрузка...</p>; // ждем, пока user загрузится

  if (!user) return <Navigate to="/login" replace />;

  return <>{children}</>;
};
