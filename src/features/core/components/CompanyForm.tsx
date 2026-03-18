import { useState, useEffect } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

interface CompanyData {
  name: string;
  slug: string;
  logoUrl: string;
  email: string;
  phone: string;
  timezone: string;
}

interface CompanyFormProps {
  company: Partial<CompanyData>;
  onSave: (data: CompanyData) => void;
  userEmail: string; // ✅ добавлено
}

// ✅ функция для инициализации (избегаем дублирования)
const buildFormData = (company: Partial<CompanyData>): CompanyData => ({
  name: company.name || "",
  slug: company.slug || "",
  logoUrl: company.logoUrl || "",
  email: "", // ❌ не используем
  phone: company.phone || "",
  timezone: company.timezone || "UTC",
});

const CompanyForm = ({ company, onSave, userEmail }: CompanyFormProps) => {
  const { t } = useTranslation("profile");

  const [formData, setFormData] = useState<CompanyData>(() =>
    buildFormData(company)
  );

  useEffect(() => {
    setFormData(buildFormData(company));
  }, [company]);

  const handleChange = (field: keyof CompanyData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    // ✅ email берём из user, а не из формы
    onSave({ ...formData, email: userEmail });
  };

  return (
    <Box sx={{ mt: 2, mb: 4, p: 2, border: "1px solid #ddd", borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom>
        {t("company_form_title", "Company Information")}
      </Typography>

      <TextField
        fullWidth
        margin="normal"
        label={t("company_name_label", "Company Name")}
        value={formData.name}
        onChange={e => handleChange("name", e.target.value)}
      />

      <TextField
        fullWidth
        margin="normal"
        label={t("company_slug_label", "Slug")}
        value={formData.slug}
        onChange={e => handleChange("slug", e.target.value)}
      />

      <TextField
        fullWidth
        margin="normal"
        label={t("company_logo_label", "Logo URL")}
        value={formData.logoUrl}
        onChange={e => handleChange("logoUrl", e.target.value)}
      />

      {/* ✅ email readonly из user */}
      <TextField
        fullWidth
        margin="normal"
        label={t("company_email_label", "Email")}
        value={userEmail}
        slotProps={{ input: { readOnly: true } }}
      />

      <TextField
        fullWidth
        margin="normal"
        label={t("company_phone_label", "Phone")}
        value={formData.phone}
        onChange={e => handleChange("phone", e.target.value)}
      />

      <TextField
        fullWidth
        margin="normal"
        label={t("company_timezone_label", "Timezone")}
        value={formData.timezone}
        onChange={e => handleChange("timezone", e.target.value)}
      />

      <Button variant="contained" sx={{ mt: 2 }} onClick={handleSubmit}>
        {t("save_button", "Save")}
      </Button>
    </Box>
  );
};

export default CompanyForm;