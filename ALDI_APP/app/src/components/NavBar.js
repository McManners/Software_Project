import React, { useRef, useState } from 'react';
import './navbar.css';

const NavBar = () => {
    const [navOpen, setNavOpen] = useState(false);
    const navRef = useRef();
    
    return (
        <div className='navbar' ref={navRef}>
            hey
        </div>
    )
}

export default NavBar;