import { ENDPOINTS } from "../../../api/endpoints";

// ------------------ Типы ------------------

export interface CompanyData {
  name: string;
  slug: string;
  logoUrl: string;
  email: string;
  phone: string;
  timezone: string;
}

// ------------------ API функции ------------------

/**
 * Получить компанию по tenantId
 */
export async function getCompany(
  authFetch: (url: string, options?: RequestInit) => Promise<Response>,
  tenantId: string
): Promise<Partial<CompanyData> | null> {
  const response = await authFetch(
    `${ENDPOINTS.TENANT.COMPANIES}/${tenantId}`
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch company (${response.status})`);
  }

  return await response.json();
}

/**
 * Создать / обновить компанию
 */
export async function saveCompany(
  authFetch: (url: string, options?: RequestInit) => Promise<Response>,
  data: CompanyData
): Promise<CompanyData> {
  const response = await authFetch(`${ENDPOINTS.TENANT.COMPANIES}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result: CompanyData = await response.json();

  if (!response.ok) {
    throw new Error(`Failed to save company (${response.status})`);
  }

  return result;
}