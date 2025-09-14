interface LoginResponse {
  token?: string;
  user?: {
    id: string;
    email: string;
    name: string;
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