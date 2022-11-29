import { Link, useNavigate } from 'react-router-dom';

const RequestDashHeader = () => {
    const navigate = useNavigate();

    const content = (
        <header style={{ backgroundColor: "blue" }}>
            <div>
                <h1>headies</h1>
                <Link to="/request/dashboard">
                    <h1>ALDI</h1>
                </Link>
                <nav>
                    <button type="button" onClick={() => navigate('/request/dashboard')}>Request Dashboard</button>
                    <button type="button" onClick={() => navigate('/request/dashboard/manager')}>Request Manager</button>
                    <button type="button" onClick={() => navigate('/request/dashboard/create')}>Create</button>
                    <button type="button" onClick={() => navigate('/request/dashboard/create/calendar')}>Create Calendar</button>
                    <button type="button" onClick={() => navigate('/request/dashboard')}>Filler</button>
                        
                </nav>
            </div>
        </header>
    )
    
    return content;
}
export default RequestDashHeader;