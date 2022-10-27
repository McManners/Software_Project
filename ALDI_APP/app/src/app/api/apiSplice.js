import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setCredentials } from '../../features/auth/authSlice';

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:3001',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const accessToken = getState().auth.accessToken;

        if (accessToken) {
            headers.set("authorization", `Bearer ${accessToken}`);
        }
        return headers;
    }
});

const baseQueryWithAuth = async (args, api, extraOptions) => {
    console.logs(args);
    console.log(api);
    console.log(extraOptions);

    let result = await baseQuery(args, api, extraOptions);

    if (result?.error?.status === 403) {
        console.log("getting refresh token");

        const refreshResult = await baseQuery('/auth/refresh', api, extraOptions);

        if (refreshResult?.data) {
            api.dispatch(setCredentials({ ...refreshResult.data }));

            result = await baseQuery(args, api, extraOptions);
        } else {
            if (refreshResult?.error?.status === 403) {
                refreshResult.error.data.message = "Login credentials have expired.";
            }
            return refreshResult;
        }
    }
    return result;
}

export const apiSplice = createApi({
    baseQuery: baseQueryWithAuth,
    endpoints: builder => ({}),
})