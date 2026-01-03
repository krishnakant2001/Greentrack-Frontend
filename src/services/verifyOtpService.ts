import {
  buildApiUrl,
  API_ENDPOINTS,
  getCommonHeaders,
} from "@/configs/apiConfig";

interface RegisterationResponse {
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

export const verifyOtpAndRegisterUser = async (
  email: string,
  otp: string
): Promise<RegisterationResponse> => {
  const response = await fetch(buildApiUrl(API_ENDPOINTS.AUTH.VERIFY_OTP), {
    method: "POST",
    headers: getCommonHeaders(),
    body: JSON.stringify({
      email,
      otp,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || `HTTP error! status: ${response.status}`);
  }

  return data;
};
