import {
  buildApiUrl,
  API_ENDPOINTS,
  getCommonHeaders,
} from "@/configs/apiConfig";

export const resendOtp = async (
  email: string
): Promise<{ message: string }> => {
  const response = await fetch(buildApiUrl(API_ENDPOINTS.AUTH.RESEND_OTP), {
    method: "POST",
    headers: getCommonHeaders(),
    body: JSON.stringify({
      email
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || `HTTP error! status: ${response.status}`);
  }

  return data;
};
