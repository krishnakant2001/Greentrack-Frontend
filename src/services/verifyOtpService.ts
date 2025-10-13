export const verifyOtpAndRegisterUser = async (
  email: string,
  otp: string
): Promise<{message: string}> => {
  const response = await fetch(
    "http://localhost:8080/api/auth/verifyOtpAndRegister",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        otp,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || `HTTP error! status: ${response.status}`);
  }

  return data;
};
