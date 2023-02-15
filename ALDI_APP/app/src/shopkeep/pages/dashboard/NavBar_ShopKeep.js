import React, { useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './navbar_ShopKeep.css';
import { AiOutlineBarChart, AiFillSetting } from 'react-icons/ai';
import { IoMdShirt } from 'react-icons/io';
import { BiSupport } from 'react-icons/bi';
import { BsPeopleFill } from 'react-icons/bs';

const NavBar_ShopKeep = ({ navRef, navOpen }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const InnerNavBar = () => {
        return (
            <div className='NavBar_Inner_Container'>
                <div className='NavBar_Inner_Header'>
                    <span>Items</span>
                </div>
                <div className='NavBar_Inner_Buttons_Container'>
                    <button type='button' className='NavBar_Inner_Button' onClick={() => navigate('/salerno/itemlist')}><div>Item List</div></button>
                    <button type='button' className='NavBar_Inner_Button'><div>Item Shortcuts</div></button>
                    <button type='button' className='NavBar_Inner_Button'><div>Update Inventory</div></button>
                    <button type='button' className='NavBar_Inner_Button'><div>Bulk Manage Items</div></button>
                </div>
            </div>
        )
    }
    const [test, setTest] = useState(false);
    
    return (
        <div className='NavBar_ShopKeep' ref={navRef} style={navOpen ? {width: '260px', minWidth: '260px'} : {width: '0', minWidth: '0'}}>
            <div className='NavBar_Container_ShopKeep' style={test ? { minWidth: '64px' } : { minWidth: '260px' }}>
                <div className='NavBar_Header_ShopKeep'>
                    <div>Salerno's</div>
                </div>
                <div className='NavBar_Button_Wrapper'>
                    <button type='button' className={location.pathname === '/salerno/reports' ? 'NavBar_Button_ShopKeep NavBar_Active_ShopKeep' : 'NavBar_Button_ShopKeep NavBar_Inactive_ShopKeep'}>
                        <div className='NavBar_Button_Icon_Wrapper'>
                            <AiOutlineBarChart size=' 1.25em'  />
                        </div>
                        <span>Reports</span>
                    </button>
                    <button type='button' className={location.pathname === '/salerno/itemlist' ? 'NavBar_Button_ShopKeep NavBar_Active_ShopKeep' : 'NavBar_Button_ShopKeep NavBar_Inactive_ShopKeep'} onClick={() => setTest(prev => !prev)}>
                        <div className='NavBar_Button_Icon_Wrapper'>
                            <IoMdShirt size='1.25em'  />
                        </div>
                        <span>Items</span>
                    </button>
                    <button type='button' className={location.pathname === '/salerno/staff' ? 'NavBar_Button_ShopKeep NavBar_Active_ShopKeep' : 'NavBar_Button_ShopKeep NavBar_Inactive_ShopKeep'}>
                        <div className='NavBar_Button_Icon_Wrapper'>
                            <BsPeopleFill size=' 1.25em'  />
                        </div>
                        <span>Staff</span>
                    </button>
                    <button type='button' className={location.pathname === '/salerno/settings' ? 'NavBar_Button_ShopKeep NavBar_Active_ShopKeep' : 'NavBar_Button_ShopKeep NavBar_Inactive_ShopKeep'}>
                        <div className='NavBar_Button_Icon_Wrapper'>
                            <AiFillSetting size=' 1.25em'  />
                        </div>
                        <span>Settings</span>
                    </button>
                    <button type='button' className={location.pathname === '/salerno/support' ? 'NavBar_Button_ShopKeep NavBar_Active_ShopKeep' : 'NavBar_Button_ShopKeep NavBar_Inactive_ShopKeep'}>
                        <div className='NavBar_Button_Icon_Wrapper'>
                            <BiSupport size=' 1.25em'  />
                        </div>
                        <span>Support</span>
                    </button>
                </div>
            </div>
            <InnerNavBar />
        </div>
    )
}

export default NavBar_ShopKeep;