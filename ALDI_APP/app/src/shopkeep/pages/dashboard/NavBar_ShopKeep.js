import React, { useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './navbar_ShopKeep.css';
import { AiOutlineBarChart, AiFillSetting } from 'react-icons/ai';
import { IoMdShirt } from 'react-icons/io';
import { BiSupport } from 'react-icons/bi';
import { BsPeopleFill } from 'react-icons/bs';
import InnerNavBar from './InnerNavBar';

const NavBar_ShopKeep = ({ navRef, navOpen }) => {
    const location = useLocation();

    const [innerNavType, setInnerNavType] = useState("");
    const [loc, setLoc] = useState(location.pathname.substring(location.pathname.search(/^\/salerno\/items/)));
    console.log(loc);
    return (
        <div className='NavBar_ShopKeep' ref={navRef} style={navOpen ? {width: '260px', minWidth: '260px'} : {width: '0', minWidth: '0'}}>
            <div className='NavBar_Container_ShopKeep' style={innerNavType.length > 0 ? { minWidth: '64px' } : { minWidth: '260px' }}>
                <div className='NavBar_Header_ShopKeep'>
                    <div>Salerno's</div>
                </div>
                <div className='NavBar_Button_Wrapper'>
                    <button type='button' className={(location.pathname === '/salerno/reports' || innerNavType === "reports") ? 'NavBar_Button_ShopKeep NavBar_Active_ShopKeep' : 'NavBar_Button_ShopKeep NavBar_Inactive_ShopKeep'}>
                        <div className='NavBar_Button_Icon_Wrapper'>
                            <AiOutlineBarChart size=' 1.25em'  />
                        </div>
                        <span>Reports</span>
                    </button>
                    <button type='button' className={loc === '/salerno/items' ? 'NavBar_Button_ShopKeep NavBar_Active_ShopKeep' : 'NavBar_Button_ShopKeep NavBar_Inactive_ShopKeep'} onClick={() => { setInnerNavType(prev => (prev !== "items") ? "items" : ""); setLoc("/salerno/items");}}>
                        <div className='NavBar_Button_Icon_Wrapper'>
                            <IoMdShirt size='1.25em'  />
                        </div>
                        <span>Items</span>
                    </button>
                    <button type='button' className={loc === '/salerno/employees' ? 'NavBar_Button_ShopKeep NavBar_Active_ShopKeep' : 'NavBar_Button_ShopKeep NavBar_Inactive_ShopKeep'} onClick={() => { setInnerNavType(prev => (prev !== "staff") ? "staff" : ""); setLoc("/salerno/employees");}}>
                        <div className='NavBar_Button_Icon_Wrapper'>
                            <BsPeopleFill size=' 1.25em'  />
                        </div>
                        <span>Staff</span>
                    </button>
                    <button type='button' className={loc === '/salerno/settings' ? 'NavBar_Button_ShopKeep NavBar_Active_ShopKeep' : 'NavBar_Button_ShopKeep NavBar_Inactive_ShopKeep'} onClick={() => { setInnerNavType(prev => (prev !== "settings") ? "settings" : ""); setLoc("/salerno/settings");}}>
                        <div className='NavBar_Button_Icon_Wrapper'>
                            <AiFillSetting size=' 1.25em'  />
                        </div>
                        <span>Settings</span>
                    </button>
                    <button type='button' className={loc === '/salerno/support' ? 'NavBar_Button_ShopKeep NavBar_Active_ShopKeep' : 'NavBar_Button_ShopKeep NavBar_Inactive_ShopKeep'} onClick={() => { setInnerNavType(""); setLoc("");}}>
                        <div className='NavBar_Button_Icon_Wrapper'>
                            <BiSupport size=' 1.25em'  />
                        </div>
                        <span>Support</span>
                    </button>
                </div>
            </div>
            <InnerNavBar innerNavType={innerNavType} />
        </div>
    )
}

export default NavBar_ShopKeep;