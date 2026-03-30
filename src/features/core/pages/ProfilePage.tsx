import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { useAuth } from "../../../auth/AuthContext";
import { useTranslation } from "react-i18next";

import OwnerForm from "../components/OwnerForm";
import CompanyForm from "../components/CompanyForm";
import BranchForm from "../components/BranchForm";

import * as realCompanyApi from "../api/companyApi";
import * as mockCompanyApi from "../api/mockCompanyApi";
import * as realBranchesApi from "../api/branchesApi";
import * as mockBranchesApi from "../api/mockBranchesApi";

import type { Company, Branch } from "../api/types";

const ProfilePage = () => {
  const { user, authFetch } = useAuth();
  const { t } = useTranslation("profile");

  const [company, setCompany] = useState<Company | null>(null);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [loading, setLoading] = useState(true);

  const useMock = import.meta.env.VITE_USE_MOCK === "true";
  const companyApi = useMock ? mockCompanyApi : realCompanyApi;
  const branchesApi = useMock ? mockBranchesApi : realBranchesApi;

  // Получение компании
  useEffect(() => {
    if (!user) return;

    const fetchCompany = async () => {
      try {
        const tenantId = user.attributes?.["tenant_id"]?.[0];
        if (!tenantId) return;

        const data = await companyApi.getCompany(authFetch, tenantId);
        if (data) setCompany(data as Company);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCompany();
  }, [user, authFetch, companyApi]);

  // Получение филиалов (только для моков пока)
  useEffect(() => {
    if (!user) return;

    const fetchBranches = async () => {
      try {
        const tenantId = user.attributes?.["tenant_id"]?.[0];
        if (!tenantId) return;

        const data = await branchesApi.getBranchesByCompanyId(authFetch, tenantId);
        setBranches(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchBranches();
  }, [user, useMock]);

  const handleSaveCompany = async (data: Company) => {
    try {
      const updated = await companyApi.saveCompany(authFetch, data);
      setCompany(updated as Company);
    } catch (err) {
      console.error(err);
    }
  };

  if (!user) return <Typography>{t("loading_message")}</Typography>;
  if (loading) return <Typography>{t("loading_message")}</Typography>;

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
            company={company || {}}
            onSave={handleSaveCompany}
            userEmail={user.email || ""}
          />
        </Box>
      </Box>

      {/* Карточки филиалов */}
      {branches.length > 0 && <BranchForm branches={branches} />}
    </Box>
  );
};

export default ProfilePage;