import { Outlet } from 'react-router-dom';
import useAuth from '../simple/useAuth';
import DashHeader from './DashHeader';
import NavBar from './NavBar';
import SupportDialog from './SupportDialog';
import { useEffect, useRef, useState } from 'react';
import Loaded from './Loaded';

const Dashboard = () => {
    const { auth } = useAuth();
    const [supportOpen, setSupportOpen] = useState(false);
    const [navOpen, setNavOpen] = useState(false);
    const navRef = useRef();

    useEffect(() => {
        navOpen ? navRef.current.style.width = '200px' : navRef.current.style.width = '0';
    }, []);

    return (
        <div className='dashboard'>
            <Loaded />
            <NavBar navRef={navRef} navOpen={navOpen} />
            <div className='dashboard-content'>
                <DashHeader name={`${auth.first_name} ${auth.last_name}`} setSupportOpen={setSupportOpen} navOpen={navOpen} setNavOpen={setNavOpen} />
                <SupportDialog supportOpen={supportOpen} setSupportOpen={setSupportOpen} />
                <Outlet />
            </div>
        </div>
    )
}
export default Dashboard;