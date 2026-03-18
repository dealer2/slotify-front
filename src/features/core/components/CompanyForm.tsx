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
  company: Partial<CompanyData>;           // текущие данные компании
  onSave: (data: CompanyData) => void;     // callback для сохранения
}

const CompanyForm = ({ company, onSave }: CompanyFormProps) => {
  const { t } = useTranslation("profile");
  const [formData, setFormData] = useState<CompanyData>({
    name: company.name || "",
    slug: company.slug || "",
    logoUrl: company.logoUrl || "",
    email: company.email || "",
    phone: company.phone || "",
    timezone: company.timezone || "UTC",
  });

  useEffect(() => {
    setFormData({
      name: company.name || "",
      slug: company.slug || "",
      logoUrl: company.logoUrl || "",
      email: company.email || "",
      phone: company.phone || "",
      timezone: company.timezone || "UTC",
    });
  }, [company]);

  const handleChange = (field: keyof CompanyData, value: string) => {
    setFormData((prev: CompanyData) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    onSave(formData);
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6">{t("company_form_title", "Company Information")}</Typography>

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

      <TextField
        fullWidth
        margin="normal"
        label={t("company_email_label", "Email")}
        value={formData.email}
        onChange={e => handleChange("email", e.target.value)}
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

      <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleSubmit}>
        {t("save_button", "Save")}
      </Button>
    </Box>
  );
};

export default CompanyForm;