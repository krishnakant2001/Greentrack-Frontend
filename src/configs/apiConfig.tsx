// Base API URL
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// API endpoints
export const API_ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    LOGIN: "/api/auth/login",
    REGISTER: "/api/auth/initiate-registration",
    RESEND_OTP: "/api/otp/resendOtp",
    VERIFY_OTP: "/api/auth/verifyOtpAndRegister",
    LOGOUT: "/api/auth/logout",
    REFRESH_TOKEN: "/api/auth/refresh-token",
  },

  // User endpoints
  USER: {
    PROFILE: "/api/user/getProfileDetails",
    UPDATE_PROFILE: "/api/user/updateProfileDetails",
    DELETE_PROFILE: "/api/user/deleteProfile",
  },

  // Activity endpoints
  ACTIVITIES: {
    CREATE: "/api/user/activities/createActivity",
    GET_ALL: "/api/user/activities/getUserActivities",
    GET_BY_ID: (id: string) => `/api/user/activities/${id}`,
    UPDATE: (id: string) => `/api/user/activities/${id}`,
    DELETE: (id: string) => `/api/user/activities/${id}`,
  },

  // Goal endpoints
  GOALS: {
    CREATE: "/api/user/goals",
    GET_ALL: "/api/user/goals",
    GET_BY_ID: (id: string) => `/api/user/goals/${id}`,
    UPDATE: (id: string) => `/api/user/goals/${id}`,
    DELETE: (id: string) => `/api/user/goals/${id}`,
  },

  // Dashboard endpoints
  DASHBOARD: {
    GET_DATA: "/api/user/dashboard",
    GET_STATS: "/api/user/dashboard/stats",
  },

  // Admin endpoints
  ADMIN: {
    EMISSION_FACTOR: "/api/admin/emission-factor",
  },

  OAUTH: {
    GOOGLE_LOGIN: "/oauth2/authorization/google",
  },
};

// Helper function to build full API URL
export const buildApiUrl = (endpoint: string): string => {
  return `${API_BASE_URL}${endpoint}`;
};

// Helper function to get common headers
export const getCommonHeaders = (token?: string) => {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return headers;
};
