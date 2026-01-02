import {
  buildApiUrl,
  API_ENDPOINTS,
  getCommonHeaders,
} from "@/configs/apiConfig";

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
  const response = await fetch(buildApiUrl(API_ENDPOINTS.USER.PROFILE), {
    method: "GET",
    headers: getCommonHeaders(JWT_TOKEN),
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
  JWT_TOKEN: string,
  currentPswd?: string,
  newPswd?: string
): Promise<updateUserProfileResponse> => {
  const response = await fetch(buildApiUrl(API_ENDPOINTS.USER.UPDATE_PROFILE), {
    method: "PUT",
    headers: getCommonHeaders(JWT_TOKEN),
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

export const deleteUserProfile = async (JWT_TOKEN: string) => {
  const response = await fetch(buildApiUrl(API_ENDPOINTS.USER.DELETE_PROFILE), {
    method: "DELETE",
    headers: getCommonHeaders(JWT_TOKEN),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};
