import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "./useAuth";

const RequireAuth = () => {
    const { auth } = useAuth();
    const location = useLocation();
    if (auth.email === undefined) console.log("yeah its undefined");
    else {
        console.log("yeah its defined: " + JSON.stringify(auth));
        console.log(auth);
    }

    return (
        (auth.email === undefined || auth.email === "")
                ? <Navigate to="/login" state={{ from: location }} replace />
                : <Outlet />
    );
}

export default RequireAuth;