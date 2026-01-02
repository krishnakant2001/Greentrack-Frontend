import { store } from "@/store/store";

// Function to get the current JWT token from the Redux store
export const getJwtToken = (): string => {
  const state = store.getState();
  return state.auth.jwtToken || "";
};

// Export the JWT token for use in other parts of the application
export const JWT_TOKEN = getJwtToken();
