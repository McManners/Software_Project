import { Outlet } from 'react-router-dom';
import useAuth from '../simple/useAuth';
import OfficialDashFooter from './OfficialDashFooter';
import OfficialDashheader from './OfficialDashHeader';
import NavBar from './OfficialNavBar';

const OfficialDashboard = () => {
    const { auth } = useAuth();

    console.log("hey from official dashboard");
    return (
        <>
            <OfficialDashheader />
            <Outlet />
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
export default OfficialDashboard;