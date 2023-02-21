import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './navbar_ShopKeep.css';

const InnerNavBar = ({ innerNavType }) => {
    console.log(innerNavType);
    const location = useLocation();
    const navigate = useNavigate();
    
    const isCurrentPage = (page) => {
        if (location.pathname.search(`/${page}$`) > -1)
            return "NavBar_Button_ShopKeep NavBar_Active_ShopKeep";
        return "NavBar_Button_ShopKeep NavBar_Inactive_ShopKeep";
    }
    switch (innerNavType) {
        case "items":
            return (
                <div className='NavBar_Inner_Container'>
                    <div className='NavBar_Inner_Header'>
                        <span>Items</span>
                    </div>
                    <div className='NavBar_Inner_Buttons_Container'>
                        <button type="button" className={isCurrentPage("items")} onClick={() => navigate('/salerno/items')}><div>Item List</div></button>
                        <button type='button' className='NavBar_Inner_Button'><div>Item Shortcuts</div></button>
                        <button type='button' className='NavBar_Inner_Button'><div>Update Inventory</div></button>
                        <button type='button' className='NavBar_Inner_Button'><div>Bulk Manage Items</div></button>
                    </div>
                </div>
            );
        case "staff":
            return (
                <div className='NavBar_Inner_Container'>
                    <div className='NavBar_Inner_Header'>
                        <span>Staff</span>
                    </div>
                    <div className='NavBar_Inner_Buttons_Container'>
                        <button type='button' className={isCurrentPage("employees")} onClick={() => navigate('/salerno/employees')}><div>Staff List</div></button>
                        <button type='button' className={isCurrentPage("timeclock")} onClick={() => navigate('/salerno/employees/timeclock')}><div>Time Clock</div></button>
                        <button type='button' className='NavBar_Inner_Button'><div>Labor Tracking</div></button>
                    </div>
                </div>
            );
        default:
            return (
                <div>hey</div>
            )

    }
}

export default InnerNavBar;