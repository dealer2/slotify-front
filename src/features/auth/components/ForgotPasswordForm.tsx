import * as React from "react";
import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Alert, CircularProgress, TextField, Button, styled } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import { getUserByEmail, sendResetPasswordEmail } from "../api/authApi";

// --- Компонент ---
interface ForgotPasswordProps {
  open: boolean;
  handleClose: () => void;
}

export default function ForgotPassword({ open, handleClose }: ForgotPasswordProps) {
  const { t } = useTranslation("auth");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setMessage(null);

    if (!email) {
      setMessage(t("auth.forgot_password.email_required"));
      return;
    }

    setLoading(true);

    try {
      const user = await getUserByEmail(email);
      if (!user) {
        setMessage(t("auth.forgot_password.invalid_email"));
        return;
      }

      await sendResetPasswordEmail(user.id);
      setMessage(t("reset_password_email_sent"));
    } catch (error: any) {
      console.error(error);
      setMessage(error?.message || t("http_error_description"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      slotProps={{
        paper: {
          component: "form",
          onSubmit: handleSubmit,
          sx: { backgroundImage: "none" },
        },
      }}
    >
      <DialogTitle>{t("auth.forgot_password.reset_password_title")}</DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%" }}>
        <DialogContentText>{t("auth.forgot_password.reset_password_description")}</DialogContentText>

        {message && <Alert severity="info">{message}</Alert>}

        <StyledTextField
          autoFocus
          required
          margin="dense"
          id="email"
          name="email"
          placeholder={t("auth.forgot_password.email_placeholder")}
          type="email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </DialogContent>
      <DialogActions sx={{ pb: 3, px: 3 }}>
        <StyledButton onClick={handleClose}>{t("auth.forgot_password.cancel_button")}</StyledButton>
        <StyledButton variant="contained" type="submit" disabled={loading}>
          {loading ? <CircularProgress size={20} /> : t("auth.forgot_password.submit_button")}
        </StyledButton>
      </DialogActions>
    </Dialog>
  );
}

// --- Стили ---
const gray = {
  50: "hsl(220, 35%, 97%)",
  100: "hsl(220, 30%, 94%)",
  200: "hsl(220, 20%, 88%)",
  300: "hsl(220, 20%, 80%)",
  400: "hsl(220, 20%, 65%)",
  500: "hsl(220, 20%, 42%)",
  600: "hsl(220, 20%, 35%)",
  700: "hsl(220, 20%, 25%)",
  800: "hsl(220, 30%, 6%)",
  900: "hsl(220, 35%, 3%)",
};

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    padding: "8px 12px",
    borderRadius: theme.shape.borderRadius,
    border: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.background.default,
    transition: "border 120ms ease-in",
    "&:hover": { borderColor: theme.palette.grey[400] },
    "&.Mui-focused": {
      outline: `3px solid ${alpha(theme.palette.primary.main, 0.3)}`,
      borderColor: theme.palette.primary.main,
    },
    "& input": {
      padding: 0,
      "&::placeholder": { opacity: 0.7, color: theme.palette.grey[500] },
    },
    "& fieldset": { border: "none" },
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  ...(theme.palette.mode === "light" && {
    color: "white",
    backgroundColor: gray[900],
    "&:hover": { backgroundColor: gray[700] },
  }),
  ...(theme.palette.mode === "dark" && {
    color: "white",
    backgroundColor: gray[700],
    "&:hover": { backgroundColor: gray[600] },
  }),
}));