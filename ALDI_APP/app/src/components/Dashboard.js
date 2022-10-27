import { Outlet } from 'react-router-dom';
import DashHeader from './DashHeader';
import DashFooter from './DashFooter';

import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../simple/AuthProvider";

const Dashboard = () => {
    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    const logout = async () => {
        console.log(AuthContext)
        setAuth({});
        navigate('/');
    }

    return (
        <>
            <DashHeader />
            <Outlet />
            <DashFooter />
            {/* Note that DashHeader is above children in Outlet. So it will always be above the contents
            {/* <div className="dash-container">
                {/* Wrapped in div so we can have different styles for logged in user/protected. All children will be in this
                <h1>Hey from dashboard</h1>
                <br /><br />
                <button onClick={logout}>Sign Out</button>
            </div>
            {/* Header and footer will be shown when protected page auth is validated */}
        </>
    )
}
export default Dashboard;