import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: { email: null, token: null },
    reducers: {
        setCredentials: (state, action) => {
            const { email, accessToken } = action.payload;
            state.email = email;
            state.token = accessToken;
        },
        logOut: (state, action) => {
            state.email = null;
            state.token = null;
        }
    },
})

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;



export const getCurrentEmail = (state) => state.auth.email;
export const getCurrentToken = (state) => state.auth.token;