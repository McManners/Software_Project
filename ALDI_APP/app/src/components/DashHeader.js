import { Link, useNavigate } from 'react-router-dom';

const DashHeader = () => {
    const navigate = useNavigate();

    const content = (
        <header style={{ backgroundColor: "orange" }}>
            <div>
                <h1>headies</h1>
                <Link to="/dashboard">
                    <h1>ALDI</h1>
                </Link>
                <nav>
                    <button type="button" onClick={() => navigate('./dashboard')}>Home</button>
                    <button type="button" onClick={() => navigate('./request/pending')}>Requests</button>
                    <button type="button" onClick={() => navigate('./dashboard')}>Filler</button>
                    <button type="button" onClick={() => navigate('./dashboard')}>Filler</button>
                    <button type="button" onClick={() => navigate('./dashboard')}>Filler</button>
                        
                </nav>
            </div>
        </header>
    )
    
    return content;
}
export default DashHeader;