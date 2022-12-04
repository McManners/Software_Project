import { Link, useNavigate } from 'react-router-dom';
import './dashboard.css';

const DashHeader = () => {
    const navigate = useNavigate();

    const content = (
        <div className='dashboard-header'>
            <div>
                <h1>ALDI</h1>
                <nav>
                    <button type="button" onClick={() => navigate('./dashboard')}>Home</button>
                    <button type="button" onClick={() => navigate('/dashboard/pending')}>Pending</button>
                    <button type="button" onClick={() => navigate('./dashboard/complete')}>Complete</button>
                    <button type="button" onClick={() => navigate('./create')}>Create</button>
                    <button type="button" onClick={() => navigate('./dashboard/manager')}>Manager</button>
                        
                </nav>
            </div>
        </div>
    )
    
    return content;
}
export default DashHeader;