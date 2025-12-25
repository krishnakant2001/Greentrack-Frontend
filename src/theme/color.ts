// 🌿 GreenTrack Color System - Centralized color tokens
// Environmental sustainability-focused color palette
// Update colors here and they will reflect across the entire application

export const colors = {
  // Primary colors - Ocean & Sky (Trust, Stability, Depth)
  primary: {
    main: "#0C2B4E",      // Deep Ocean Blue - main brand color
    light: "#27667B",     // Coastal Teal - lighter variant
    dark: "#143D60",      // Midnight Blue - darker variant
    ocean: "#27667B",     // Ocean blue for water themes
  },
  
  // Secondary colors - Nature & Growth (Energy, Optimism, Life)
  secondary: {
    main: "#FCB53B",      // Sunset Gold - calls to action, highlights
    light: "#DDEB9D",     // Spring Meadow - light accents
    dark: "#A0C878",      // Forest Green - success, growth
  },
  
  // Nature palette - Earth tones (Environmental theme)
  nature: {
    leaf: "#A0C878",      // Leaf Green - primary vegetation
    forest: "#7FAF5C",    // Forest Green - deeper vegetation
    meadow: "#DDEB9D",    // Meadow Yellow-Green - light vegetation
    earth: "#8B4513",     // Earth Brown - soil, wood
    moss: "#D0E8C5",      // Pale Moss - subtle nature accents
  },
  
  // Background colors - Clean & Fresh
  background: {
    default: "#F5F5F5",   // Clean Grey - main background
    paper: "#FFFFFF",     // Pure White - cards, elevated surfaces
    alt: "#FFFFFF",       // Alternative white
    cream: "#FFF8DE",     // Warm Cream - soft alternative background
    light: "#F5F5F5",     // Light Grey
    pale: "#FFE5A3",      // Pale Gold - subtle highlights
    hover: "#F8F7BA",     // Soft Yellow - hover states
    mist: "#F0F7F4",      // Light Mist - subtle green tint
  },
  
  // Text colors - Readable & Accessible
  text: {
    primary: "#0C2B4E",   // Deep Ocean - primary text
    secondary: "#27667B",  // Coastal Teal - secondary text
    tertiary: "#5A7F8F",  // Muted Teal - tertiary text
    black: "#080707",      // Near Black - emphasis
    white: "#FFFFFF",      // Pure White - on dark backgrounds
    light: "#FFF8DE",      // Cream - light backgrounds
    muted: "#6B7280",     // Grey - disabled/muted text
  },
  
  // Semantic colors - Status & Feedback
  success: {
    main: "#A0C878",      // Growth Green - success states
    light: "#D0E8C5",     // Light Moss - success backgrounds
    dark: "#7FAF5C",      // Forest - success emphasis
  },
  
  warning: {
    main: "#FCB53B",      // Sunset Gold - warnings
    light: "#FFE5A3",     // Pale Gold - warning backgrounds
    dark: "#E59F2A",      // Deep Gold - warning emphasis
  },
  
  error: {
    main: "#F4632E",      // Warm Coral - errors
    light: "#FFE5DB",     // Pale Coral - error backgrounds
    dark: "#D94F1C",      // Deep Coral - error emphasis
  },
  
  info: {
    main: "#27667B",      // Coastal Teal - information
    light: "#D0E8E8",     // Pale Cyan - info backgrounds
    dark: "#1A4D5C",      // Deep Teal - info emphasis
  },
  
  // Carbon tracking specific colors
  carbon: {
    emission: "#F4632E",  // Coral - carbon emissions
    reduction: "#A0C878", // Green - carbon reduction
    neutral: "#FCB53B",   // Gold - carbon neutral
    offset: "#27667B",    // Teal - carbon offset
  },
  
  // Border colors - Definition & Structure
  border: {
    main: "#27667B",      // Coastal Teal - primary borders
    light: "#27667b40",   // Teal with opacity - subtle borders
    lighter: "#E5E7EB",   // Light Grey - minimal borders
    accent: "#FCB53B",    // Sunset Gold - accent borders
    success: "#A0C878",   // Growth Green - success borders
  },
  
  // Chart colors - Data Visualization
  chart: {
    primary: "#27667B",   // Coastal Teal
    secondary: "#A0C878", // Leaf Green
    tertiary: "#FCB53B",  // Sunset Gold
    quaternary: "#DDEB9D",// Spring Meadow
    quinary: "#F4632E",   // Warm Coral
    gradient1: "#27667B", // Start gradient
    gradient2: "#A0C878", // End gradient
  },
} as const;

// Helper function to get color with opacity
export const withOpacity = (color: string, opacity: number): string => {
  return `${color}${Math.round(opacity * 255).toString(16).padStart(2, '0')}`;
};

// Helper to create rgba from hex
export const hexToRgba = (hex: string, alpha: number): string => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};
