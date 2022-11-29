import React from 'react';
import useAuth from '../simple/useAuth';

const NavBar = () => {
    const { auth } = useAuth();

    return (
        <div style={{backgroundColor: 'blue'}}>
            <div>ALDI NavBar</div>
            <div></div>
        </div>
    )
}

export default NavBar;