import { useState, useEffect } from "react";
import { useAuth } from "../../../auth/AuthContext";
import { useTranslation } from "react-i18next";
import { Box, Typography, Button } from "@mui/material";
import OwnerForm from "../components/OwnerForm";
import CompanyForm from "../components/CompanyForm";
import { ENDPOINTS } from "../../../api/endpoints";

interface CompanyData {
  name: string;
  slug: string;
  logoUrl: string;
  email: string;
  phone: string;
  timezone: string;
}

const ProfilePage = () => {
  const { user, logout, authFetch } = useAuth(); // исправлено
  const { t } = useTranslation("profile");

  const [company, setCompany] = useState<Partial<CompanyData>>({});
  const [loading, setLoading] = useState(true);

  if (!user) return <Typography>{t("loading_message")}</Typography>;

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const tenantId = user.attributes?.["tenant_id"]?.[0];
        const res = await authFetch(`http://localhost:8000/v1/api/companies/${tenantId}`);
        if (res.ok) {
          const data = await res.json();
          setCompany(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCompany();
  }, [user]);

  const handleSaveCompany = async (data: CompanyData) => {
    try {
      const payload = { ...data };

      const res = await authFetch(`${ENDPOINTS.TENANT.COMPANIES}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const updated = await res.json();
        setCompany(updated);
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <Typography>{t("loading_message")}</Typography>;

  return (
    <Box sx={{ maxWidth: 600, margin: "0 auto", padding: 2 }}>
      <Typography variant="h5" gutterBottom>{t("profile_title")}</Typography>

      <OwnerForm owner={{
        id: user.id,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        realmRoles: user.realmRoles || [],
        attributes: user.attributes
      }} />

      <CompanyForm company={company} onSave={handleSaveCompany} />

      <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={logout}>
        {t("logout_button")}
      </Button>
    </Box>
  );
};

export default ProfilePage;