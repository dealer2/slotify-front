import { Box, Typography, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";

interface OwnerData {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  realmRoles: string[];
  attributes?: Record<string, string[]>;
}

interface OwnerFormProps {
  owner: OwnerData;
}

const OwnerForm = ({ owner }: OwnerFormProps) => {
  const { t } = useTranslation("profile");

  const tenantId = owner.attributes?.["tenant_id"]?.[0] || "";  

  return (
    <Box sx={{ mt: 2, mb: 4, p: 2, border: "1px solid #ddd", borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom>
        {t("owner_form_title", "Owner Information")}
      </Typography>

      <TextField
        fullWidth
        margin="normal"
        label="User ID"
        value={owner.id}
        slotProps={{ input: { readOnly: true } }}
      />

      <TextField
        fullWidth
        margin="normal"
        label="Tenant ID"
        value={tenantId}
        slotProps={{ input: { readOnly: true } }}
      />

      <TextField
        fullWidth
        margin="normal"
        label={t("username_label", "Username")}
        value={owner.username}
        slotProps={{ input: { readOnly: true } }}
      />

      <TextField
        fullWidth
        margin="normal"
        label={t("email_label", "Email")}
        value={owner.email}
        slotProps={{ input: { readOnly: true } }}
      />

      <TextField
        fullWidth
        margin="normal"
        label={t("first_name_label", "First Name")}
        value={owner.firstName}
        slotProps={{ input: { readOnly: true } }}
      />

      <TextField
        fullWidth
        margin="normal"
        label={t("last_name_label", "Last Name")}
        value={owner.lastName}
        slotProps={{ input: { readOnly: true } }}
      />

      <TextField
        fullWidth
        margin="normal"
        label={t("roles_label", "Roles")}
        value={owner.realmRoles.join(", ")}
        slotProps={{ input: { readOnly: true } }}
      />
    </Box>
  );
};

export default OwnerForm;