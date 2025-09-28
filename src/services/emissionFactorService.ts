import { JWT_TOKEN } from "./jwtToken";

export const createEmissionFactor = async (
  region: string,
  activityCategory: string,
  activitySubCategory: string,
  unit: string,
  co2eFactor: string,
  methodology: string,
  source: string
) => {
  const response = await fetch(
    "http://localhost:8080/api/admin/emission-factor",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JWT_TOKEN}`,
      },
      body: JSON.stringify({
        region: region,
        category: activityCategory,
        subType: activitySubCategory,
        unit: unit,
        co2eFactor: Number(co2eFactor),
        methodology,
        source,
      }),
    }
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
};
