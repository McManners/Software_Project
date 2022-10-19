import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "./useAuth";

const RequireAuth = () => {
    const { auth } = useAuth();
    const location = useLocation();
    console.log(auth);
    console.log(auth?.email);
    if (auth === undefined) console.log("yeah its undefined");
    else {
        console.log("yeah its defined: " + JSON.stringify(auth));
        console.log(auth.email);
    }

    return (
        auth.email === "" || auth.email === undefined
                ? <Navigate to="/login" state={{ from: location }} replace />
                : <Outlet />
    );
}

export default RequireAuth;