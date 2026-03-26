import type { CompanyData } from "./companyApi";
import mockCompanyJson from "./mocks/mock-company.json"; // импорт JSON

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

// Используем локальную переменную для хранения изменений
let mockCompany: CompanyData = mockCompanyJson as CompanyData;

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