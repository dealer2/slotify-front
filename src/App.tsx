import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import RegistrationForm from "./features/auth/components/RegisterForm";
import LoginForm from "./features/auth/components/LoginForm";
import Profile from "./features/core/components/Profile";
import { ProtectedRoute } from "./auth/ProtectedRoute";
import LangSwitcher from "./features/common/LangSwitcher"; // импорт переключателя языка
import { useMemo, useState } from "react";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import ThemeSwitcher from "./features/common/ThemeSwitcher";

function App() {
  const [mode, setMode] = useState<"light" | "dark">("light");

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  const toggleTheme = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <AuthProvider>
        <BrowserRouter>
          {/* Переключатель языка виден на всех страницах */}
          <LangSwitcher />
           <ThemeSwitcher toggleTheme={toggleTheme} mode={mode} />

          <Routes>
            <Route path="/" element={<RegistrationForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
