import { Outlet } from 'react-router-dom';
import DashHeader_ShopKeep from './DashHeader_ShopKeep';
import NavBar_ShopKeep from './NavBar_ShopKeep';
import SupportDialog_ShopKeep from './SupportDialog_ShopKeep';
import { useEffect, useRef, useState } from 'react';
import Loaded_ShopKeep from './Loaded_ShopKeep';
import './dashboard_ShopKeep.css';

const Dashboard_ShopKeep = () => {
    const [supportOpen, setSupportOpen] = useState(false);
    const [navOpen, setNavOpen] = useState(false);


    return (
        <div className='Dashboard_ShopKeep'>
            <Loaded_ShopKeep />
            <NavBar_ShopKeep navOpen={navOpen} />
            <div className='Dashboard_Content_ShopKeep'>
                <DashHeader_ShopKeep name='Anthony Salerno' setSupportOpen={setSupportOpen} navOpen={navOpen} setNavOpen={setNavOpen} />
                <SupportDialog_ShopKeep supportOpen={supportOpen} setSupportOpen={setSupportOpen} />
                <Outlet />
            </div>
        </div>
    )
}
export default Dashboard_ShopKeep;