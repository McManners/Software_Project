import axios, { axiosPrivate } from "./axios";
import { useEffect } from 'react';
import useRefreshToken from './useRefreshToken';
import useAuth from './useAuth';

const useAxiosPrivate = () => {
    // This sends a request and if it returns error 403 (forbidden)
    // it will try to refresh the access token with the current refresh token.
    // This works because the error is returned if the access token has expired
    // but the refresh token is still valid.
    // So, if our request fails, we want to make another request
    // if we get another refresh token. Otherwise, the only other
    // option would be to logout and navigate.

    // It works by intercepting the request, adding the bearer auth header,
    // and then intercepting the response, checking for the error, and 
    // acting on it by getting a new access token

    // https://github.com/gitdagray/react_persist_login/blob/main/src/hooks/useAxiosPrivate.js
    
    const refresh = useRefreshToken();
    const { auth } = useAuth();

    useEffect(() => {
        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${auth?.access_token}`;
                }
                return config;
            }, (err) => Promise.reject(err)
        );
        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response,
            async (err) => {
                const prevRequest = err?.config;
                if (err?.response?.status === 403 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return axiosPrivate(prevRequest);
                }
                return Promise.reject(err);
            }
        );
        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        }
    }, [auth, refresh]);

    return axiosPrivate;
}

export default useAxiosPrivate;