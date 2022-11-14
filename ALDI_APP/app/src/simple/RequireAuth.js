import { useLocation, Navigate, Outlet } from "react-router-dom";
import axios from "./axios";
import useAuth from "./useAuth";

const RequireAuth = ({ allowedEmployeeType }) => {
    const { auth } = useAuth();
    console.log("require");
    const location = useLocation();
    
    return (
        allowedEmployeeType.includes(auth?.employee_type) // current auth employee_type is included in the routes set allowed employee_types
            ? <Outlet/>
            : auth?.access_token
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />
    );
    // if (auth?.accessToken) {
    //     console.log("yes, access token exists");
    //     return (<Outlet />)
    // } else {
    //     console.log("no, access token does not exist");
    //     return (<Navigate to="/login" state={{ from: location }} replace />)
    // }
}

export default RequireAuth;