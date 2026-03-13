import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import RegistrationForm from "./components/RegistrationForm";
import Login from "./components/Login";
import Profile from "./components/Profile";
import { ProtectedRoute } from "./auth/ProtectedRoute";
import LangSwitcher from "./components/LangSwitcher"; // импорт переключателя языка
import { useMemo, useState } from "react";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import ThemeSwitcher from "./components/ThemeSwitcher";

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
            <Route path="/login" element={<Login />} />
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
