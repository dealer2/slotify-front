import type { CompanyData } from "./companyApi";

// имитация задержки
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

let mockCompany: CompanyData = {
  name: "Mock Company",
  slug: "mock-company",
  logoUrl: "/mock-company",
  email: "mock@mail.com",
  phone: "+423953206010",
  timezone: "UTC",
};

/**
 * ✅ сигнатура как в real API
 */
export async function getCompany(
  _authFetch: (url: string, options?: RequestInit) => Promise<Response>,
  _tenantId: string
): Promise<Partial<CompanyData> | null> {
  await delay(500);
  return mockCompany;
}

/**
 * ✅ сигнатура как в real API
 */
export async function saveCompany(
  _authFetch: (url: string, options?: RequestInit) => Promise<Response>,
  data: CompanyData
): Promise<CompanyData> {
  await delay(500);
  mockCompany = { ...data };
  return mockCompany;
}