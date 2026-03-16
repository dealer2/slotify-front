import { ENDPOINTS } from "../../../api/endpoints";

// ------------------ Типы ------------------
export interface RegistrationData {
  email: string;
  firstName: string;
  lastName: string;
}

export interface RegistrationResponse {
  id?: string;
  message?: string;
  timestamp?: string;
}

export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
}

// ------------------ API функции ------------------

/**
 * Регистрирует пользователя
 */
export async function registerUser(
  data: RegistrationData
): Promise<RegistrationResponse> {
  const response = await fetch(ENDPOINTS.AUTH.REGISTER, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result: RegistrationResponse = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || result.timestamp || `Registration error ${response.status}`
    );
  }

  return result;
}

/**
 * Получает пользователя по email
 */
export async function getUserByEmail(email: string): Promise<User | null> {
  const response = await fetch(`${ENDPOINTS.USER.USERS}?email=${encodeURIComponent(email)}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch user (${response.status})`);
  }

  const users: User[] = await response.json();

  return users.length > 0 ? users[0] : null;
}

/**
 * Отправляет запрос на сброс пароля для пользователя по ID
 */
export async function sendResetPasswordEmail(userId: string): Promise<void> {
  const resetUrl = ENDPOINTS.USER.RESET_PASSWORD.replace("{id}", userId);

  const response = await fetch(resetUrl, { method: "PUT" });

  if (!response.ok) {
    throw new Error(`Failed to send reset email (${response.status})`);
  }
}