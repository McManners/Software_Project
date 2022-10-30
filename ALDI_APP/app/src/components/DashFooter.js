import { useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../simple/useAuth';
import axios from 'axios';

const DashFooter = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { setAuth } = useAuth();

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

    const logout = async () => {
        axios({
            method: 'GET',
            url: 'http://localhost:3001/logout',
            withCredentials: true
            })
        .catch(err => {
            console.log(err);
        });
        setAuth({});
        navigate('/');
    }

    const content = (
        <footer style={{backgroundColor: "red" }} className="dash-footer">
            {goHomeButton}
            <button type="button" onClick={logout}>Logout</button>
            <p>Current User:</p>
            <p>Status:</p>
            <h1>footies</h1>
        </footer>
    )

    return content;
}
export default DashFooter;