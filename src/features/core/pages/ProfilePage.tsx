import { useState, useEffect } from "react";
import { useAuth } from "../../../auth/AuthContext";
import { useTranslation } from "react-i18next";
import { Box, Typography, Button } from "@mui/material";
import OwnerForm from "../components/OwnerForm";
import CompanyForm from "../components/CompanyForm";

import * as realApi from "../api/companyApi";      
import * as mockApi from "../api/companyMockApi";  

import type { CompanyData } from "../api/companyApi";

const ProfilePage = () => {
  const { user, logout, authFetch } = useAuth();
  const { t } = useTranslation("profile");

  const [company, setCompany] = useState<Partial<CompanyData>>({});
  const [loading, setLoading] = useState(true);

  // ✅ читаем env прямо на странице
  const useMock = import.meta.env.VITE_USE_MOCK === "true";
  console.log("useMock = " + useMock);

  // ✅ выбираем API локально
  const api = useMock ? mockApi : realApi;

  useEffect(() => {
    if (!user) return;

    const fetchCompany = async () => {
      try {
        const tenantId = user.attributes?.["tenant_id"]?.[0];
        if (!tenantId) return;

        const data = await api.getCompany(authFetch, tenantId);
        if (data) setCompany(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCompany();
  }, [user, authFetch, api]);

  const handleSaveCompany = async (data: CompanyData) => {
    try {
      const updated = await api.saveCompany(authFetch, data);
      setCompany(updated);
    } catch (err) {
      console.error(err);
    }
  };

  if (!user) return <Typography>{t("loading_message")}</Typography>;
  if (loading) return <Typography>{t("loading_message")}</Typography>;

  return (
    <Box sx={{ maxWidth: 600, margin: "0 auto", padding: 2 }}>
      <Typography variant="h5" gutterBottom>
        {t("profile_title")}
      </Typography>

      <Typography variant="body2" sx={{ mb: 2 }}>
        Mode: {useMock ? "Mock API" : "Real API"}
      </Typography>

      <OwnerForm
        owner={{
          id: user.id,
          username: user.username,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          realmRoles: user.realmRoles || [],
          attributes: user.attributes,
        }}
      />

      <CompanyForm
        company={company}
        onSave={handleSaveCompany}
        userEmail={user.email || ""}
      />

      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
        onClick={logout}
      >
        {t("logout_button")}
      </Button>
    </Box>
  );
};

export default ProfilePage;