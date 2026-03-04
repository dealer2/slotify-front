import { useAuth } from "../auth/AuthContext";
import { useTranslation } from "react-i18next";
import { Box, Typography, Button } from "@mui/material";

const Profile = () => {
  const { user, logout } = useAuth();
  const { t } = useTranslation("profile"); // подключаем namespace "profile"

  if (!user) return <Typography>{t("loading_message")}</Typography>;

  return (
    <Box sx={{ maxWidth: 600, margin: "0 auto", padding: 2 }}>
      <Typography variant="h5" gutterBottom>
        {t("profile_title")}
      </Typography>

      <Typography>
        <strong>ID:</strong> {user.id}
      </Typography>
      <Typography>
        <strong>{t("username_label", "Username")}:</strong> {user.username}
      </Typography>
      <Typography>
        <strong>{t("email_label")}:</strong> {user.email}
      </Typography>
      <Typography>
        <strong>{t("first_name_label")}:</strong> {user.firstName}
      </Typography>
      <Typography>
        <strong>{t("last_name_label")}:</strong> {user.lastName}
      </Typography>
      <Typography>
        <strong>{t("roles_label")}:</strong> {user.realmRoles.join(", ")}
      </Typography>

      <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={logout}>
        {t("logout_button")}
      </Button>
    </Box>
  );
};

export default Profile;