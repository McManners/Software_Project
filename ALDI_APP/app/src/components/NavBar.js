import React, { useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './navbar.css';

const NavBar = ({ navRef, navOpen }) => {
    const navigate = useNavigate();
    const location = useLocation();
    
    return (
        <div className='navbar' ref={navRef} style={navOpen ? {width: '200px', minWidth: '200px', maxWidth: '200px'} : {width: '0'}}>
            <div className='container'>
                <div className='navbar-header'>
                    <div>ALDI</div>
                </div>
                <button type='button' className={location.pathname === '/dashboard' ? 'active' : 'inactive'} onClick={() => navigate('/dashboard')}>Home</button>
                <button type='button' className={location.pathname === '/dashboard/create' ? 'active' : 'inactive'} onClick={() => navigate('/dashboard/create')}>Create</button>
                <button type='button' className={location.pathname === '/dashboard/pending' ? 'active' : 'inactive'} onClick={() => navigate('/dashboard/pending')}>Pending</button>
                <button type='button' className={location.pathname === '/dashboard/closed' ? 'active' : 'inactive'} onClick={() => navigate('/dashboard/closed')}>Closed</button>
                <button type='button' className={location.pathname === '/dashboard/manager' ? 'active' : 'inactive'} onClick={() => navigate('/dashboard/manager')}>Manager</button>
                <button type='button' className={location.pathname === '/dashboard/newmanager' ? 'active' : 'inactive'} onClick={() => navigate('/dashboard/newmanager')}>New Manager</button>
            </div>
        </div>
    )
}

export default NavBar;