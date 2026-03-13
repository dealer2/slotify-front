import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { useTranslation } from "react-i18next";
import { Box, Typography, Alert, FormControl, Link } from "@mui/material";
import {
  Card,
  SignInContainer,
  StyledButton,
  StyledFormLabel,
  StyledTextField,
} from "./RegistrationForm";
import ForgotPassword from "./ForgotPassword";
import { Formik } from "formik";
import * as Yup from "yup";
import { useState } from "react";

const Login = () => {
  const { t } = useTranslation("auth");
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState(false);

  const handleClickOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const validationSchema = Yup.object({
    email: Yup.string().email(t("invalid_email")).required(t("email_required")),
    password: Yup.string()
      .min(6, t("password_too_short"))
      .required(t("password_required")),
  });

  return (
    <SignInContainer direction="column" justifyContent="space-between">
      <Card variant="outlined">
        <Typography
          component="h1"
          variant="h4"
          sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
        >
          {t("login_title")}
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            setError(null);

            try {
              await login(values.email, values.password);
              navigate("/profile");
            } catch (err: any) {
              setError(err.message || t("login_error"));
            }

            setSubmitting(false);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleSubmit,
            isSubmitting,
          }) => (
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                gap: 2,
              }}
            >
              <FormControl>
                <StyledFormLabel htmlFor="email">{t("email")}</StyledFormLabel>

                <StyledTextField
                  name="email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  placeholder={t("email_placeholder")}
                  fullWidth
                  autoComplete="username"
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                />
              </FormControl>

              <FormControl>
                <StyledFormLabel htmlFor="password">
                  {t("password")}
                </StyledFormLabel>

                <StyledTextField
                  name="password"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  placeholder={t("password_placeholder")}
                  fullWidth
                  autoComplete="current-password"
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                />
              </FormControl>
              <ForgotPassword open={openModal} handleClose={handleClose} />
              <StyledButton
                type="submit"
                variant="contained"
                fullWidth
                disabled={isSubmitting}
              >
                {t("login_button")}
              </StyledButton>
              <Link
                component="button"
                type="button"
                onClick={handleClickOpen}
                variant="body2"
                sx={{ alignSelf: "center" }}
              >
                {t("forgot_password")}
              </Link>
            </Box>
          )}
        </Formik>
      </Card>
    </SignInContainer>
  );
};

export default Login;
