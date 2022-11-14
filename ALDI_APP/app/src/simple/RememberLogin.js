import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from './useRefreshToken';
import useAuth from './useAuth';

const RememberLogin = () => {
    console.log("remember login checking refresh token1")
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const { auth, remember } = useAuth();
    console.log("remember");

    useEffect(() => {
        console.log("remember login checking refresh token2")
        let isMounted = true;
        console.log("auth: " + JSON.stringify(auth))
        const verifyRefreshToken = async () => {
            try {
                await refresh();
            }
            catch (err) {
                console.error(err);
            }
            finally {
                isMounted && setIsLoading(false);
            }
        }

        console.log("auth: " + JSON.stringify(auth))

        !auth?.access_token && remember ? verifyRefreshToken() : setIsLoading(false);

        return () => isMounted = false;
    }, [])

    // useEffect(() => {
    //     console.log(`isLoading: ${isLoading}`)
    //     console.log(`aT: ${JSON.stringify(auth?.access_token)}`)
    // }, [isLoading])

    return (
        <>
            {!remember
                ? <Outlet />
                : isLoading
                    ? <p>Loading...</p>
                    : <Outlet />
            }
        </>
    )
}

export default RememberLogin;