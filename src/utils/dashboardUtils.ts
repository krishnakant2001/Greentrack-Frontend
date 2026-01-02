// Category color utilities
export const CATEGORY_COLORS = {
  TRAVEL: "#1565c0",
  ENERGY: "#e65100",
  PURCHASES: "#6a1b9a",
  FOOD: "#2e7d32",
  WASTE: "#c62828",
} as const;

export const CATEGORY_BG_COLORS = {
  TRAVEL: "rgba(21, 101, 192, 0.1)",
  ENERGY: "rgba(230, 81, 0, 0.1)",
  PURCHASES: "rgba(106, 27, 154, 0.1)",
  FOOD: "rgba(46, 125, 50, 0.1)",
  WASTE: "rgba(198, 40, 40, 0.1)",
} as const;

export const CATEGORY_BORDER_COLORS = {
  TRAVEL: "#bbdefb",
  ENERGY: "#ffe0b2",
  PURCHASES: "#e1bee7",
  FOOD: "#c8e6c9",
  WASTE: "#ffcdd2",
} as const;

export const CATEGORY_GRADIENTS = {
  TRAVEL: "linear-gradient(90deg, #1565c0 0%, #42a5f5 100%)",
  ENERGY: "linear-gradient(90deg, #e65100 0%, #ff9800 100%)",
  PURCHASES: "linear-gradient(90deg, #6a1b9a 0%, #ab47bc 100%)",
  FOOD: "linear-gradient(90deg, #2e7d32 0%, #66bb6a 100%)",
  WASTE: "linear-gradient(90deg, #c62828 0%, #ef5350 100%)",
} as const;

export type CategoryType = keyof typeof CATEGORY_COLORS;

export const getCategoryColor = (category: string): string => {
  return CATEGORY_COLORS[category as CategoryType] || "#143d60";
};

export const getCategoryBgColor = (category: string): string => {
  return (
    CATEGORY_BG_COLORS[category as CategoryType] || "rgba(20, 61, 96, 0.1)"
  );
};

export const getCategoryBorderColor = (category: string): string => {
  return CATEGORY_BORDER_COLORS[category as CategoryType] || "#d0e8c5";
};

export const getCategoryGradient = (category: string): string => {
  return (
    CATEGORY_GRADIENTS[category as CategoryType] ||
    "linear-gradient(90deg, #143d60 0%, #a0c878 100%)"
  );
};

// Number formatting utilities
export const formatNumber = (num: number): string => {
  if (num >= 1000) {
    return (num / 1000).toFixed(2) + "k";
  }
  return num.toFixed(2);
};

export const calculatePercentage = (value: number, total: number): string => {
  if (total === 0) return "0";
  return ((value / total) * 100).toFixed(1);
};
