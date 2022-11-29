import './officialdashheader.css';
import { useNavigate, useLocation } from 'react-router-dom';
import useLogout from '../simple/useLogout';

const OfficialDashheader = () => {
    const logout = useLogout();
    const navigate = useNavigate();

    const signOut = async () => {
        await logout();
        navigate('/official');
    }

    return (
        <header className='official-dash-header'>
            ALDI
            <div><button type='button' onClick={() => signOut()}>Logout</button></div>
        </header>
    )
}

export default OfficialDashheader;