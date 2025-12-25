interface updateUserProfileResponse {
  user?: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    region: string;
  };
  message?: string;
}

export const getUserProfileDetails = async (JWT_TOKEN: string) => {
  const response = await fetch(
    "http://localhost:8080/api/user/getProfileDetails",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JWT_TOKEN}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

export const updateUserProfileDetails = async (
  firstName: string,
  lastName: string,
  region: string,
  JWT_TOKEN: string,
  currentPswd?: string,
  newPswd?: string,
): Promise<updateUserProfileResponse> => {
  const response = await fetch(
    "http://localhost:8080/api/user/updateProfileDetails",
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JWT_TOKEN}`,
      },
      body: JSON.stringify({
        firstName,
        lastName,
        region,
        currentPassword: currentPswd,
        newPassword: newPswd,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || `HTTP error! status: ${response.status}`);
  }

  return data;
};

export const deleteUserProfile = async (JWT_TOKEN: string) => {
  const response = await fetch(
    "http://localhost:8080/api/user/deleteProfile",
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JWT_TOKEN}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};