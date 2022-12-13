import './dashboard.css';
import { BsPersonCircle, BsCaretDownFill } from 'react-icons/bs';
import useAuth from '../simple/useAuth';
import { IconContext } from 'react-icons/lib';
import { useState } from 'react';
import useLogout from '../simple/useLogout';
import { useNavigate } from 'react-router-dom';

const DashHeader = ({ name }) => {
    const { auth } = useAuth();
    console.log(auth);
    const [dropdown, setDropdown] = useState(false);
    const logout = useLogout();
    const navigate = useNavigate();
    const date = new Date();
    const signOut = () => {
        logout();
        navigate('/login');
    }
    
    return (
        <div className='dashboard-header'>
            <div className='aldi-header'>ALDI</div>
            <div className='header-dropdown' onClick={() => setDropdown(prev => !prev)}>
                <div className='user-header' key={'hey'}>
                    <IconContext.Provider value={{ style: { verticalAlign: 'middle' },  size: '1.2em' }}>
                        <BsPersonCircle className='user-icon' />
                    </IconContext.Provider>
                        {name/* {`${auth.first_name} ${auth.last_name}`} */}
                    <IconContext.Provider value={{ style: { verticalAlign: 'middle'}, size: '0.75em' }}>
                        <BsCaretDownFill className='header-dropdown-icon' />
                    </IconContext.Provider>
                </div>
                <div className='header-dropdown-content' style={{display: (dropdown ? 'block' : 'none')}}>
                    <div>{date.toDateString()}</div>
                    <div className='header-dropdown-logout' onClick={signOut}><span>Logout</span></div>
                </div>
            </div>
        </div>
    )
}
export default DashHeader;

{/* <nav>
                <button type="button" onClick={() => navigate('./')}>Home</button>
                <button type="button" onClick={() => navigate('./pending')}>Pending</button>
                <button type="button" onClick={() => navigate('./closed')}>Complete</button>
                <button type="button" onClick={() => navigate('./create')}>Create</button>
                <button type="button" onClick={() => navigate('./manager')}>Manager</button>
                <button type="button" onClick={signOut}>Logout</button>
            </nav> */}