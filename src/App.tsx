import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import RegistrationForm from "./components/RegistrationForm";
import Login from "./components/Login";
import Profile from "./components/Profile";
import { ProtectedRoute } from "./auth/ProtectedRoute";
import LangSwitcher from "./components/LangSwitcher"; // импорт переключателя языка

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        {/* Переключатель языка виден на всех страницах */}
        <LangSwitcher /> 

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
  );
}

export default App;