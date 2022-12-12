import { useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../simple/useAuth';
import useLogout from '../simple/useLogout';

const DashFooter = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const logout = useLogout();

    const onGoHomeClicked = () => navigate('/dashboard');

    let goHomeButton = null;
    if (pathname !== '/dashboard') {
        // only appear if not at root page of dash. home button shouldnt appear there, but everywhere else
        goHomeButton = (
            <button
                className="dash-footer__button icon-button"
                title="home"
                onClick={onGoHomeClicked}
            >
            {/* <FontAwesomeIcon icon={faHouse} /> */}Go Home
            </button>
        )
    }
    const signOut = async () => {
        await logout();
        navigate('/login');
    }

    const content = (
        <footer style={{backgroundColor: "red" }} className="dash-footer">
            {goHomeButton}
            <button type="button" onClick={signOut}>Logout</button>
        </footer>
    )

    return content;
}
export default DashFooter;