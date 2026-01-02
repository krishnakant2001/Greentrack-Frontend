import {
  buildApiUrl,
  API_ENDPOINTS,
  getCommonHeaders,
} from "@/configs/apiConfig";

interface LoginResponse {
  data?: {
    token: string;
    refreshToken: string;
    user?: {
      firstName: string;
      lastName: string;
      email: string;
    };
  };
  message?: string;
}

interface RegistrationOtpResponse {
  data?: {
    email: string;
    message: string;
  };
  message?: string;
}
export const loginUser = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  const response = await fetch(buildApiUrl(API_ENDPOINTS.AUTH.LOGIN), {
    method: "POST",
    headers: getCommonHeaders(),
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || `HTTP error! status: ${response.status}`);
  }

  return data;
};

export const logoutUser = async (token: string): Promise<void> => {
  await fetch(buildApiUrl(API_ENDPOINTS.AUTH.LOGOUT), {
    method: "POST",
    headers: {
      ...getCommonHeaders(),
      Authorization: `Bearer ${token}`,
    },
  });
};

export const registerUser = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  region: string
): Promise<RegistrationOtpResponse> => {
  const response = await fetch(buildApiUrl(API_ENDPOINTS.AUTH.REGISTER), {
    method: "POST",
    headers: getCommonHeaders(),
    body: JSON.stringify({
      firstName,
      lastName,
      email,
      password,
      region,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || `HTTP error! status: ${response.status}`);
  }

  return data;
};
