import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { useTranslation } from "react-i18next";
import {
  TextField,
  Button,
  Box,
  Typography,
  Alert,
  Container,
  Paper,
} from "@mui/material";

const Login = () => {
  const { t } = useTranslation("auth"); // namespace для переводов
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      await login(username, password); // используем реальный login из AuthContext
      navigate("/profile"); // переход после успешного входа
    } catch (err: any) {
      setError(err.message || t("login_error")); // используем перевод для ошибки
    }
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper elevation={3} sx={{ padding: 4, width: "100%" }}>
        <Typography variant="h5" align="center" gutterBottom>
          {t("login_title")}
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            fullWidth
            label={t("email")}
            type="email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            margin="normal"
          />

          <TextField
            fullWidth
            label={t("password")}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            margin="normal"
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3 }}
          >
            {t("login_button")}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;