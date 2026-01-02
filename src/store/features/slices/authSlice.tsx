import { createSlice } from "@reduxjs/toolkit";

interface UserInfo {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface AuthState {
  jwtToken: string;
  user: UserInfo | null;
}

const loadUserFromStorage = (): UserInfo | null => {
  if (typeof window !== "undefined") {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch {
        return null;
      }
    }
  }
  return null;
};

const initialState: AuthState = {
  jwtToken:
    typeof window !== "undefined" ? localStorage.getItem("jwtToken") || "" : "",
  user: loadUserFromStorage(),
};

const authSlice = createSlice({
  name: "authenticatedUser",
  initialState,
  reducers: {
    setJwtToken: (state, action) => {
      state.jwtToken = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("jwtToken", action.payload);
      }
    },
    setUserInfo: (state, action) => {
      state.user = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(action.payload));
      }
    },
    clearAuth: (state) => {
      state.jwtToken = "";
      state.user = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem("jwtToken");
        localStorage.removeItem("user");
      }
    },
    clearJwtToken: (state) => {
      state.jwtToken = "";
      if (typeof window !== "undefined") {
        localStorage.removeItem("jwtToken");
      }
    },
  },
});

export const { setJwtToken, setUserInfo, clearAuth, clearJwtToken } =
  authSlice.actions;
export default authSlice.reducer;
