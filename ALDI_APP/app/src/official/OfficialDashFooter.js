import { useNavigate, useLocation } from 'react-router-dom';
import useLogout from '../simple/useLogout';
import './officialdashfooter.css';

const OfficialDashFooter = () => {
    const logout = useLogout();
    const navigate = useNavigate();

    const signOut = async () => {
        await logout();
        navigate('/official');
    }
    return (
        <footer className='official-dash-header'>
            <button type='button' onClick={() => signOut()}>Logout</button>
        </footer>
    )
}

export default OfficialDashFooter;