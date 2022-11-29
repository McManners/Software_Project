import { Outlet, useLocation, useNavigate } from 'react-router-dom';

const OfficialPublic = () => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <div>
            <h1>Public</h1>
            <button type='button' onClick={() => navigate('./login')}>Login</button>
        </div>
    )
}
export default OfficialPublic;