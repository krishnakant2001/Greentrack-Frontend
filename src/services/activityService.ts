import { createHash } from "crypto";
import { getJwtToken } from "./jwtToken";
import { Dayjs } from "dayjs";
import { API_ENDPOINTS, buildApiUrl, getCommonHeaders } from "@/configs/apiConfig";

const generateClientIdempotencyKey = (
  activityCategory: string,
  activitySubCategory: string,
  quantity: string,
  unit: string,
  userId: string
) => {
  const str = `${userId}-${activityCategory}-${activitySubCategory}-${quantity}-${unit}`;
  const key = createHash("sha256").update(str).digest("hex");

  return key.length <= 50 ? key : key.slice(0, 50);
};

export const createActivity = async (
  activityCategory: string,
  activitySubCategory: string,
  quantity: string,
  unit: string,
  activityDate: Dayjs | null,
  location: string,
  description: string,
  userId: string
) => {
  const clientIdempotencyKey = generateClientIdempotencyKey(
    activityCategory,
    activitySubCategory,
    quantity,
    unit,
    userId
  );

  const response = await fetch(buildApiUrl(API_ENDPOINTS.ACTIVITIES.CREATE), {
    method: "POST",
    headers: getCommonHeaders(getJwtToken()),
    body: JSON.stringify({
      category: activityCategory,
      subType: activitySubCategory,
      quantity: Number(quantity),
      unit,
      activityDate,
      location,
      description,
      clientIdempotencyKey: clientIdempotencyKey,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    const errorMessage =
      errorData?.message || `HTTP error! status: ${response.status}`;
    throw new Error(errorMessage);
  }

  return await response.json();
};

export const updateActivity = async (
  activityId: string,
  activityCategory: string,
  activitySubCategory: string,
  quantity: string,
  unit: string,
  activityDate: Dayjs | null,
  location: string,
  description: string,
  userId: string
) => {
  const clientIdempotencyKey = generateClientIdempotencyKey(
    activityCategory,
    activitySubCategory,
    quantity,
    unit,
    userId
  );

  const response = await fetch(
    buildApiUrl(API_ENDPOINTS.ACTIVITIES.UPDATE(activityId)),
    {
      method: "PUT",
      headers: getCommonHeaders(getJwtToken()),
      body: JSON.stringify({
        category: activityCategory,
        subType: activitySubCategory,
        quantity: Number(quantity),
        unit,
        activityDate,
        location,
        description,
        clientIdempotencyKey: clientIdempotencyKey,
      }),
    }
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    const errorMessage =
      errorData?.message || `HTTP error! status: ${response.status}`;
    throw new Error(errorMessage);
  }

  return await response.json();
};

export const getUserActivities = async () => {
  const response = await fetch(buildApiUrl(API_ENDPOINTS.ACTIVITIES.GET_ALL), {
    method: "GET",
    headers: getCommonHeaders(getJwtToken()),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    const errorMessage =
      errorData?.message || `HTTP error! status: ${response.status}`;
    throw new Error(errorMessage);
  }

  return response.json();
};

export const getActivityById = async (activityId: string) => {
  const response = await fetch(
    buildApiUrl(`${API_ENDPOINTS.ACTIVITIES.GET_BY_ID(activityId)}`),
    {
      method: "GET",
      headers: getCommonHeaders(getJwtToken()),
    }
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    const errorMessage =
      errorData?.message || `HTTP error! status: ${response.status}`;
    throw new Error(errorMessage);
  }

  return response.json();
};

export const deleteActivity = async (activityId: string) => {
  const response = await fetch(
    buildApiUrl(API_ENDPOINTS.ACTIVITIES.DELETE(activityId)),
    {
      method: "DELETE",
      headers: getCommonHeaders(getJwtToken()),
    }
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    const errorMessage =
      errorData?.message || `HTTP error! status: ${response.status}`;
    throw new Error(errorMessage);
  }

  return;
};
