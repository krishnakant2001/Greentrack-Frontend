import { getMockDashboardData } from "@/data/mockDashboardData";
import { getJwtToken } from "./jwtToken";
import { buildApiUrl, getCommonHeaders } from "@/configs/apiConfig";

// Set this to true to use mock data (useful when backend is down)
const USE_MOCK_DATA = true;

export interface CategoryBreakdown {
  [key: string]: number;
}

export interface ActivityCounts {
  [key: string]: number;
}

export interface DashboardSummaryResponse {
  userId: string;
  summaryDate: string;
  period: string;
  totalCo2eEmissions: number;
  categoryBreakdown: CategoryBreakdown;
  totalActivities: number;
  activityCounts: ActivityCounts;
  previousPeriodEmissions: number;
  percentageChange: number;
  isImprovement: boolean;
  topCategory: string;
  improvementArea: string;
}

export const getDashboardSummary = async (
  period: string = "weekly"
): Promise<DashboardSummaryResponse> => {
  // Return mock data if enabled
  if (USE_MOCK_DATA) {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    return getMockDashboardData(period);
  }

  const response = await fetch(
    buildApiUrl(`/api/dashboard/summary?period=${period}`),
    {
      method: "GET",
      headers: getCommonHeaders(getJwtToken()),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch dashboard summary");
  }

  return await response.json();
};
