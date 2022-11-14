import { useLocation, Navigate, Outlet, useNavigate } from "react-router-dom";
import axios from "./axios";
import { useState } from 'react';
import useLogout from "./useLogout";
import useAuth from "./useAuth";

const Status = () => {
    const { auth } = useAuth();
    console.log(auth);
    console.log("checkin status");
    const logout = useLogout();
    const location = useLocation();
    const navigate = useNavigate();
    const signOut = async () => {
        await logout();
        navigate('/login');
    }
    return (
        (document.cookie.match("logged") !== null) ? <Outlet/> : <Navigate to="/login" state={{ from: location }} replace />
    )
}

export default Status;