import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  jwtToken:
    typeof window !== "undefined" ? localStorage.getItem("jwtToken") || "" : "",
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
    clearJwtToken: (state) => {
      state.jwtToken = "";
      if (typeof window !== "undefined") {
        localStorage.removeItem("jwtToken");
      }
    },
  },
});

export const { setJwtToken, clearJwtToken } = authSlice.actions;
export default authSlice.reducer;