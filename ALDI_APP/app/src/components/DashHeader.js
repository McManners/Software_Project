import { Link, useNavigate } from 'react-router-dom';
import './dashboard.css';
import useAuth from '../simple/useAuth';
import useLogout from '../simple/useLogout';

const DashHeader = () => {
    const navigate = useNavigate();
    const { auth } = useAuth();
    const logout = useLogout();

    const signOut = async () => {
        await logout();
        navigate('/login');
    }

    const content = (
        <div className='dashboard-header'>
            <div>
                <h1>ALDI</h1>
                <h1>{auth.first_name}</h1>
                <nav>
                    <button type="button" onClick={() => navigate('./')}>Home</button>
                    <button type="button" onClick={() => navigate('./pending')}>Pending</button>
                    <button type="button" onClick={() => navigate('./complete')}>Complete</button>
                    <button type="button" onClick={() => navigate('./create')}>Create</button>
                    <button type="button" onClick={() => navigate('./manager')}>Manager</button>
                    <button type="button" onClick={signOut}>Logout</button>
                </nav>
            </div>
        </div>
    )
    
    return content;
}
export default DashHeader;