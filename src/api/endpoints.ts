export const API_BASE_URL = "http://localhost:8000";

export const ENDPOINTS = {
  AUTH: {
    LOGIN: `${API_BASE_URL}/v1/auth/login`,
    REFRESH: `${API_BASE_URL}/v1/auth/token/refresh`,
    ME: `${API_BASE_URL}/v1/auth/me`,
    REGISTER: `${API_BASE_URL}/v1/auth/register`,
  },
};