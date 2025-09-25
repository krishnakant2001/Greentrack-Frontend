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
  "eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiI2OGQwYzEyNzE0ZjRjZDBjMmZiYmJiOGQiLCJlbWFpbCI6InByYXRoYW1AZ21haWwuY29tIiwiaWF0IjoxNzU4NjM1MTI1LCJleHAiOjE3NjEyMjcxMjV9._-aqrjwq6qpxLpDFcmDetyrwJjE1hSPkT3ZgX6cQ453--42gi4Fh_e5KygBOuDaQ";

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
