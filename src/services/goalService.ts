import { Dayjs } from "dayjs";
import { getJwtToken } from "./jwtToken";
import {
  buildApiUrl,
  API_ENDPOINTS,
  getCommonHeaders,
} from "@/configs/apiConfig";

export const createGoal = async (
  goalType: string,
  targetCategory: string,
  targetValue: string,
  goalPeriod: string,
  startDate: Dayjs | null,
  endDate: Dayjs | null,
  goalTitle: string,
  goalDescription: string
) => {
  const payload = {
    goalType,
    targetCategory: targetCategory || null,
    targetValue: Number(targetValue),
    goalPeriod,
    startDate: startDate ? startDate.format("YYYY-MM-DD") : null,
    endDate: endDate ? endDate.format("YYYY-MM-DD") : null,
    title: goalTitle,
    description: goalDescription,
  };

  try {
    const response = await fetch(buildApiUrl(API_ENDPOINTS.GOALS.CREATE), {
      method: "POST",
      headers: getCommonHeaders(getJwtToken()),
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("createGoal payload:", payload);
      console.error("createGoal server response:", response.status, text);
      // try parse json
      try {
        const json = JSON.parse(text);
        throw new Error(
          `Server error ${response.status}: ${JSON.stringify(json)}`
        );
      } catch (error) {
        throw new Error(`Server error ${response.status}: ${error}`);
      }
    }

    return await response.json();
  } catch (err) {
    console.error("createGoal error:", err);
    throw err;
  }
};

export const getUserGoals = async () => {
  const response = await fetch(buildApiUrl(API_ENDPOINTS.GOALS.GET_ALL), {
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

export const updateGoal = async (
  goalId: string,
  goalType: string,
  targetCategory: string,
  targetValue: string,
  goalPeriod: string,
  startDate: Dayjs | null,
  endDate: Dayjs | null,
  goalTitle: string,
  goalDescription: string
) => {
  const payload = {
    goalType,
    targetCategory: targetCategory || null,
    targetValue: Number(targetValue),
    goalPeriod,
    startDate: startDate ? startDate.format("YYYY-MM-DD") : null,
    endDate: endDate ? endDate.format("YYYY-MM-DD") : null,
    title: goalTitle,
    description: goalDescription,
  };

  try {
    const response = await fetch(
      buildApiUrl(API_ENDPOINTS.GOALS.UPDATE(goalId)),
      {
        method: "PUT",
        headers: getCommonHeaders(getJwtToken()),
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      const text = await response.text();
      console.error("updateGoal payload:", payload);
      console.error("updateGoal server response:", response.status, text);
      throw new Error(`Server error ${response.status}: ${text}`);
    }

    return response.json();
  } catch (err) {
    console.error("updateGoal error:", err);
    throw err;
  }
};

export const deleteGoal = async (goalId: string) => {
  try {
    const response = await fetch(
      buildApiUrl(API_ENDPOINTS.GOALS.DELETE(goalId)),
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getJwtToken()}`,
        },
      }
    );

    if (!response.ok) {
      const text = await response.text();
      console.error("deleteGoal server response:", response.status, text);
      throw new Error(`Server error ${response.status}: ${text}`);
    }

    return true;
  } catch (err) {
    console.error("deleteGoal error:", err);
    throw err;
  }
};
