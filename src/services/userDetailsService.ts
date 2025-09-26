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

const token =
  "eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiI2OGI2NmRlOWVmOGI3ZTAyY2ExNGQ2ZTAiLCJlbWFpbCI6ImtyaXNobmFrYW50QGdtYWlsLmNvbSIsImlhdCI6MTc1ODkxMzMzNywiZXhwIjoxNzYxNTA1MzM3fQ.ujaR1HygZvKQLbiHi_cKfzq_R2Ea3WFInjClqpem0-37DRLogqQXZCH1zMcDlCGk";

export const getUserProfileDetails = async () => {
  const response = await fetch("http://localhost:8080/api/users/profile", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

export const updateUserProfileDetails = async (
  firstName: string,
  lastName: string,
  region: string,
  currentPswd?: string,
  newPswd?: string
): Promise<updateUserProfileResponse> => {
  const response = await fetch("http://localhost:8080/api/users/profile", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      firstName,
      lastName,
      region,
      currentPassword: currentPswd,
      newPassword: newPswd,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || `HTTP error! status: ${response.status}`);
  }

  return data;
};


export const deleteUserProfile = async () => {
  const response = await fetch("http://localhost:8080/api/users/profile", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}