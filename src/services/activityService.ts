import { createHash } from "crypto";
import { JWT_TOKEN } from "./jwtToken";
import { Dayjs } from "dayjs";

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

  const response = await fetch("http://localhost:8080/api/activities", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${JWT_TOKEN}`,
    },
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
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
};
