import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    jwtToken: "",
};

export const authSlice = createSlice({
    name: "AuthenticatedUser",
    initialState,
    reducers: {
        setJwtToken: (state, action) => {
            state.jwtToken = action.payload;
        },
        clearJwtToken: (state) => {
            state.jwtToken = "";
        }
    }
});

export const {setJwtToken, clearJwtToken} = authSlice.actions;

export default authSlice.reducer;