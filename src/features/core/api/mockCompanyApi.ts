import type { Company } from "./types";
import type { CompanyDto } from "./companyApi";
import mockCompanyJson from "./mocks/mock-company.json"; // импорт JSON

// Имитация сетевой задержки
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

// Используем локальную переменную для хранения изменений
let mockCompany: Company = mockCompanyJson as Company;

/**
 * ✅ сигнатура как в real API
 */
export async function getCompany(
  _authFetch: (url: string, options?: RequestInit) => Promise<Response>,
  _tenantId: string
): Promise<Partial<CompanyDto> | null> {
  await delay(500);

  // 👇 возвращаем DTO (без id, active)
  const { name, slug, logoUrl, email, phone, timezone } = mockCompany;

  return { name, slug, logoUrl, email, phone, timezone };
}

/**
 * ✅ сигнатура как в real API
 */
export async function saveCompany(
  _authFetch: (url: string, options?: RequestInit) => Promise<Response>,
  data: CompanyDto
): Promise<CompanyDto> {
  await delay(500);

  // 👇 обновляем только редактируемые поля
  mockCompany = {
    ...mockCompany,
    ...data,
  };

  return data;
}