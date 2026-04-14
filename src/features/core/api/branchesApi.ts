// src/pages/profile/api/branchesApi.ts

import { ENDPOINTS } from "../../../api/endpoints";
import type { Branch } from "./types";

/**
 * Получить все филиалы по companyId
 */
export async function getBranchesByCompanyId(
  authFetch: (url: string, options?: RequestInit) => Promise<Response>,
  companyId: string
): Promise<Branch[]> {
  const url = ENDPOINTS.TENANT.BRANCHES_BY_COMPANY_ID.replace(
    "{companyId}",
    companyId
  );

  const response = await authFetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch branches (${response.status})`);
  }

  return await response.json();
}