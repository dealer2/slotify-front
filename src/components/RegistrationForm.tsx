import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ENDPOINTS } from "../api/endpoints";
import {
  TextField,
  Button,
  Box,
  Typography,
  Alert,
  Container,
  Paper,
} from "@mui/material";

interface RegistrationData {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface RegistrationResponse {
  id?: string;
  errorMessage?: string;
  message?: string;
}

function RegistrationForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<RegistrationData>({
    username: "",
    email: "",
    firstName: "",
    lastName: "",
  });

  const [message, setMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage(null);

    try {
      const response = await fetch(
        ENDPOINTS.AUTH.REGISTER,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data: RegistrationResponse = await response.json();

      if (response.ok) {
        navigate("/login", { state: { registered: true } });
      } else {
        const errorMessage =
          data.errorMessage || data.message || `${t("registration_error")} ${response.status}`;
        setMessage(errorMessage);
      }
    } catch (error: any) {
      console.error("Ошибка:", error);
      setMessage(error?.message || t("network_error"));
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 8 }}>
        <Typography variant="h4" align="center" gutterBottom>
          {t("register_title")}
        </Typography>

        {message && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {message}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            fullWidth
            label={t("username")}
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            margin="normal"
          />

          <TextField
            fullWidth
            label={t("email")}
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            margin="normal"
          />

          <TextField
            fullWidth
            label={t("first_name")}
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            margin="normal"
          />

          <TextField
            fullWidth
            label={t("last_name")}
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
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
            {t("register_button")}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default RegistrationForm;