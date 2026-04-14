// src/pages/profile/api/companyApi.ts

import { ENDPOINTS } from "../../../api/endpoints";

// DTO (что реально отправляем на бэк)
export interface CompanyDto {
  name: string;
  slug: string;
  logoUrl: string;
  email: string;
  phone: string;
  timezone: string;  
}

/**
 * Получить компанию
 */
export async function getCompany(
  authFetch: (url: string, options?: RequestInit) => Promise<Response>,
  tenantId: string
): Promise<Partial<CompanyDto> | null> {
  const response = await authFetch(
    `${ENDPOINTS.TENANT.COMPANIES}/${tenantId}`
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch company (${response.status})`);
  }

  return await response.json();
}

/**
 * Сохранить компанию
 */
export async function saveCompany(
  authFetch: (url: string, options?: RequestInit) => Promise<Response>,
  data: CompanyDto
): Promise<CompanyDto> {
  const response = await authFetch(`${ENDPOINTS.TENANT.COMPANIES}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result: CompanyDto = await response.json();

  if (!response.ok) {
    throw new Error(`Failed to save company (${response.status})`);
  }

  return result;
}