import { configureStore } from '@reduxjs/toolkit';
import { logOut } from '../features/auth/authSlice';
import { apiSlice } from './api/apiSplice';

export const store = configureStore({
    reducer: {
        auth: logOut,
    },
    devTools: true
});