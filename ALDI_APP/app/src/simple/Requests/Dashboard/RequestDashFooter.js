import { useNavigate, useLocation } from 'react-router-dom';

const RequestDashFooter = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const onGoHomeClicked = () => navigate('request/dashboard');

    let goHomeButton = null;
    if (pathname !== 'request/dashboard') {
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

    const content = (
        <footer style={{backgroundColor: "red" }} className="dash-footer">
            {goHomeButton}
            <button type="button">Logout</button>
            <p>Current User:</p>
            <p>Status:</p>
            <h1>footies</h1>
        </footer>
    )

    return content;
}
export default RequestDashFooter;