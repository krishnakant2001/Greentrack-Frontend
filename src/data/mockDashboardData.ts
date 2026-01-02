import { DashboardSummaryResponse } from "@/services/dashboardService";

// Mock data for weekly period
export const mockDashboardDataWeekly: DashboardSummaryResponse = {
  userId: "mock-user-123",
  summaryDate: "2025-12-22",
  period: "weekly",
  totalCo2eEmissions: 45.67,
  categoryBreakdown: {
    TRAVEL: 18.5,
    ENERGY: 12.3,
    PURCHASES: 8.75,
    FOOD: 4.12,
    WASTE: 2.0,
  },
  totalActivities: 15,
  activityCounts: {
    TRAVEL: 5,
    ENERGY: 4,
    PURCHASES: 3,
    FOOD: 2,
    WASTE: 1,
  },
  previousPeriodEmissions: 52.3,
  percentageChange: -12.68,
  isImprovement: true,
  topCategory: "TRAVEL",
  improvementArea: "Consider using public transport or walking",
};

// Mock data for monthly period
export const mockDashboardDataMonthly: DashboardSummaryResponse = {
  userId: "mock-user-123",
  summaryDate: "2025-12-22",
  period: "monthly",
  totalCo2eEmissions: 198.45,
  categoryBreakdown: {
    TRAVEL: 75.2,
    ENERGY: 58.3,
    PURCHASES: 35.75,
    FOOD: 20.2,
    WASTE: 9.0,
  },
  totalActivities: 62,
  activityCounts: {
    TRAVEL: 20,
    ENERGY: 18,
    PURCHASES: 12,
    FOOD: 8,
    WASTE: 4,
  },
  previousPeriodEmissions: 185.6,
  percentageChange: 6.92,
  isImprovement: false,
  topCategory: "TRAVEL",
  improvementArea: "Consider using public transport or walking",
};

// Mock data for yearly period
export const mockDashboardDataYearly: DashboardSummaryResponse = {
  userId: "mock-user-123",
  summaryDate: "2025-12-22",
  period: "yearly",
  totalCo2eEmissions: 2345.89,
  categoryBreakdown: {
    TRAVEL: 890.45,
    ENERGY: 678.3,
    PURCHASES: 420.75,
    FOOD: 245.39,
    WASTE: 111.0,
  },
  totalActivities: 732,
  activityCounts: {
    TRAVEL: 245,
    ENERGY: 220,
    PURCHASES: 145,
    FOOD: 95,
    WASTE: 27,
  },
  previousPeriodEmissions: 2520.15,
  percentageChange: -6.91,
  isImprovement: true,
  topCategory: "TRAVEL",
  improvementArea: "Consider using public transport or walking",
};

// Mock data with high emissions (for testing improvement area suggestions)
export const mockDashboardDataHighEnergy: DashboardSummaryResponse = {
  userId: "mock-user-123",
  summaryDate: "2025-12-22",
  period: "weekly",
  totalCo2eEmissions: 62.3,
  categoryBreakdown: {
    ENERGY: 35.5,
    TRAVEL: 12.3,
    PURCHASES: 8.0,
    FOOD: 4.5,
    WASTE: 2.0,
  },
  totalActivities: 18,
  activityCounts: {
    ENERGY: 8,
    TRAVEL: 4,
    PURCHASES: 3,
    FOOD: 2,
    WASTE: 1,
  },
  previousPeriodEmissions: 48.2,
  percentageChange: 29.25,
  isImprovement: false,
  topCategory: "ENERGY",
  improvementArea: "Try reducing energy consumption at home",
};

// Mock data with high purchases (for testing improvement area suggestions)
export const mockDashboardDataHighPurchases: DashboardSummaryResponse = {
  userId: "mock-user-123",
  summaryDate: "2025-12-22",
  period: "weekly",
  totalCo2eEmissions: 58.9,
  categoryBreakdown: {
    PURCHASES: 28.75,
    TRAVEL: 15.3,
    ENERGY: 10.0,
    FOOD: 3.85,
    WASTE: 1.0,
  },
  totalActivities: 20,
  activityCounts: {
    PURCHASES: 9,
    TRAVEL: 5,
    ENERGY: 3,
    FOOD: 2,
    WASTE: 1,
  },
  previousPeriodEmissions: 52.1,
  percentageChange: 13.05,
  isImprovement: false,
  topCategory: "PURCHASES",
  improvementArea: "Focus on sustainable purchasing choices",
};

// Mock data with no activities (empty state)
export const mockDashboardDataEmpty: DashboardSummaryResponse = {
  userId: "mock-user-123",
  summaryDate: "2025-12-22",
  period: "weekly",
  totalCo2eEmissions: 0,
  categoryBreakdown: {},
  totalActivities: 0,
  activityCounts: {},
  previousPeriodEmissions: 0,
  percentageChange: 0,
  isImprovement: false,
  topCategory: "None",
  improvementArea: "Start logging activities to get insights",
};

// Function to get mock data based on period
export const getMockDashboardData = (
  period: string
): DashboardSummaryResponse => {
  switch (period.toLowerCase()) {
    case "weekly":
      return mockDashboardDataWeekly;
    case "monthly":
      return mockDashboardDataMonthly;
    case "yearly":
      return mockDashboardDataYearly;
    default:
      return mockDashboardDataWeekly;
  }
};

// Export all mock data for testing different scenarios
export const mockDashboardScenarios = {
  weekly: mockDashboardDataWeekly,
  monthly: mockDashboardDataMonthly,
  yearly: mockDashboardDataYearly,
  highEnergy: mockDashboardDataHighEnergy,
  highPurchases: mockDashboardDataHighPurchases,
  empty: mockDashboardDataEmpty,
};
