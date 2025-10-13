interface LoginResponse {
  data?: {
    token: string;
    refreshToken: string;
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
export const loginUser = async (email: string, password: string): Promise<LoginResponse> => {
  const response = await fetch("http://localhost:8080/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
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

export const logoutUser = () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("user");
};

export const registerUser = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  region: string
): Promise<RegistrationOtpResponse> => {
  const response = await fetch(
    "http://localhost:8080/api/auth/initiate-registration",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
        region,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || `HTTP error! status: ${response.status}`);
  }

  return data;
};
