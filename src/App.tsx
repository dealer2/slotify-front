import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import RegistrationForm from "./features/auth/components/RegisterForm";
import LoginForm from "./features/auth/components/LoginForm";
//import Profile from "./features/core/components/Profile";
import ProfilePage from "./features/core/pages/ProfilePage";
import { ProtectedRoute } from "./auth/ProtectedRoute";
import LangSwitcher from "./features/common/LangSwitcher"; // импорт переключателя языка
import ThemeSwitcher from "./features/common/ThemeSwitcher";
import { Layout } from "./features/core/components/slotify-ui/src/layout/Layout";
import { AuthLayout } from "./features/core/components/slotify-ui/src/layout/AuthLayout";
import { AppThemeProvider } from "./AppThemeProvider";

function App() {
  return (
      <AppThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          {/* Переключатель языка виден на всех страницах */}
          <LangSwitcher />
          <ThemeSwitcher  />

          <Routes>
            <Route
              path="/"
              element={
                <AuthLayout>
                  <RegistrationForm />
                </AuthLayout>
              }
            />
            <Route
              path="/login"
              element={
                <AuthLayout>
                  <LoginForm />
                </AuthLayout>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Layout>
                    <ProfilePage />
                  </Layout>
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </AppThemeProvider>
  );
}

export default App;
