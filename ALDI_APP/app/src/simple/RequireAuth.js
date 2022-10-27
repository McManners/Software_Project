import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "./useAuth";

const RequireAuth = () => {
    const { auth, setAuth } = useAuth();
    const location = useLocation();

    if (auth?.accessToken) {
        console.log("yes, access token exists");
        return (<Outlet />)
    } else {
        console.log("no, access token does not exist");
        return (<Navigate to="/login" state={{ from: location }} replace />)
    }
}

export default RequireAuth;