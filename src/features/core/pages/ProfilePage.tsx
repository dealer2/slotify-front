import { useState, useEffect } from "react";
import { useAuth } from "../../../auth/AuthContext";
import { useTranslation } from "react-i18next";
import { Box, Typography } from "@mui/material";
import OwnerForm from "../components/OwnerForm";
import CompanyForm from "../components/CompanyForm";

import * as realApi from "../api/companyApi";      
import * as mockApi from "../api/mockCompanyApi";  

import type { CompanyDto } from "../api/companyApi";

const ProfilePage = () => {
  const { user, authFetch } = useAuth();
  const { t } = useTranslation("profile");

  const [company, setCompany] = useState<Partial<CompanyDto>>({}); // всегда объект
  const [loading, setLoading] = useState(true);

  const useMock = import.meta.env.VITE_USE_MOCK === "true";
  const api = useMock ? mockApi : realApi;

  useEffect(() => {
    if (!user) return;

    const fetchCompany = async () => {
      try {
        const tenantId = user.attributes?.["tenant_id"]?.[0];
        if (!tenantId) return;

        const data = await api.getCompany(authFetch, tenantId);
        if (data) setCompany(data ?? {}); // защита от null
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCompany();
  }, [user, authFetch, api]);

  const handleSaveCompany = async (data: CompanyDto) => {
    try {
      const updated = await api.saveCompany(authFetch, data);
      setCompany(updated ?? {}); // защита от null
    } catch (err) {
      console.error(err);
    }
  };

  if (!user || loading) return <Typography>{t("loading_message")}</Typography>;

  return (
    <Box sx={{ maxWidth: 900, margin: "0 auto", padding: 2 }}>
      <Typography variant="h5" gutterBottom>
        {t("profile_title")}
      </Typography>

      <Typography variant="body2" sx={{ mb: 2 }}>
        Mode: {useMock ? "Mock API" : "Real API"}
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 2,
        }}
      >
        <Box sx={{ flex: 1 }}>
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
        </Box>

        <Box sx={{ flex: 2 }}>
          <CompanyForm
            company={company ?? {}} // всегда объект
            onSave={handleSaveCompany}
            userEmail={user.email || ""}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;