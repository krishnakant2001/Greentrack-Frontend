import { Dayjs } from "dayjs";
import { JWT_TOKEN } from "./jwtToken";

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
  const response = await fetch("http://localhost:8080/api/user/goals", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${JWT_TOKEN}`,
    },
    body: JSON.stringify({
      goalType,
      targetCategory: targetCategory || null,
      targetValue: Number(targetValue),
      goalPeriod,
      startDate: startDate ? startDate.format("YYYY-MM-DD") : null,
      endDate: endDate ? endDate.format("YYYY-MM-DD") : null,
      title: goalTitle,
      description: goalDescription,
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
};
