// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useLocation } from 'react-router-dom';

const DashFooter = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();

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
            {/* <FontAwesomeIcon icon={faHouse} /> */}
            </button>
        )
    }
    const content = (
        <footer style={{backgroundColor: "red" }} className="dash-footer">
            {goHomeButton}
            <p>Current User:</p>
            <p>Status:</p>
            <h1>footies</h1>
        </footer>
    )

    return content;
}
export default DashFooter;