import { Outlet } from 'react-router-dom';
import RequestDashHeader from './RequestDashHeader';
import RequestDashFooter from './RequestDashFooter';

const RequestDashboard = () => {

    return (
        <>
            
            <Outlet />
            <RequestDashFooter />
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
export default RequestDashboard;