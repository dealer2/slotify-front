// src/api/mockBranchApi.ts
import type { Branch } from "./types";
import mockBranchesJson from "./mocks/mock-branches.json";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

// Загружаем ветки из мока
const mockBranches: Branch[] = mockBranchesJson.branches as Branch[];

/**
 * Получить все филиалы по companyId
 * В моках companyId игнорируется — возвращаем все ветки
 */
export async function getBranchesByCompanyId(
  _authFetch?: (url: string, options?: RequestInit) => Promise<Response>,
  _companyId?: string
): Promise<Branch[]> {
  await delay(300); // имитация сетевой задержки
  return mockBranches;
}