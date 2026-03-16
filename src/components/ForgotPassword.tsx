import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { StyledTextField } from "./RegistrationForm";
import { useTranslation } from "react-i18next";
import { Alert, CircularProgress } from "@mui/material";
import { ENDPOINTS } from "../api/endpoints";

interface ForgotPasswordProps {
  open: boolean;
  handleClose: () => void;
}

export default function ForgotPassword({
  open,
  handleClose,
}: ForgotPasswordProps) {
  const { t } = useTranslation("common");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setMessage(null);

    if (!email) {
      setMessage(t("email_required"));
      return;
    }

    setLoading(true);

    try {
      // 1️⃣ Поиск пользователя по email
      const searchResponse = await fetch(`${ENDPOINTS.USER.USERS}?email=${encodeURIComponent(email)}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!searchResponse.ok) throw new Error(`${t("network_error")} (${searchResponse.status})`);

      const users = await searchResponse.json();

      if (!users || users.length === 0) {
        setMessage(t("invalid_email"));
        return;
      }

      const userId = users[0].id;
      console.log("userId = " + userId)

      // 2️⃣ Отправка письма для сброса пароля
      const resetUrl = ENDPOINTS.USER.RESET_PASSWORD.replace("{id}", userId);
      console.log("resetUrl = " + resetUrl)
      
      const resetResponse = await fetch(resetUrl, { method: "PUT" });

      if (!resetResponse.ok) throw new Error(`${t("network_error")} (${resetResponse.status})`);

      setMessage(t("reset_email_sent"));
    } catch (error: any) {
      console.error(error);
      setMessage(error?.message || t("network_error"));
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
      <DialogTitle>{t("reset_password_title")}</DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%" }}>
        <DialogContentText>{t("reset_password_text")}</DialogContentText>

        {message && <Alert severity="info">{message}</Alert>}

        <StyledTextField
          autoFocus
          required
          margin="dense"
          id="email"
          name="email"
          placeholder={t("email_placeholder")}
          type="email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </DialogContent>
      <DialogActions sx={{ pb: 3, px: 3 }}>
        <Button onClick={handleClose}>{t("cancel_button")}</Button>
        <Button variant="contained" type="submit" disabled={loading}>
          {loading ? <CircularProgress size={20} /> : t("continue_button")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}