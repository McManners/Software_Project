import './officialdashheader.css';
import { useNavigate, useLocation } from 'react-router-dom';
import useLogout from '../simple/useLogout';

const OfficialDashheader = () => {
    const logout = useLogout();
    const navigate = useNavigate();

    const signOut = async () => {
        await logout();
        navigate('/official/login');
    }

    return (
        <div>
            <nav>
                <div className="navbar-wrapper">
                <a href="./">
                    <img src={require('./AL_BLR_LA_MC_RGB.png')} className="logo"/>
                </a>
                    <ul className="navbar-home-links">
                        <li>
                            <a href="#">My Actions</a>
                            <ul className="dropdown-menu-items">
                                <li><a href="./">Dashboard</a></li>
                                <li><a href="./create">View Alerts</a> </li>
                            </ul>
                        </li>
                        <li><a href="#" className="options" onClick={() => signOut()} >Log out</a></li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default OfficialDashheader;