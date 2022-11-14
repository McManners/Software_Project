import { Link } from 'react-router-dom';

const DashHeader = () => {
    const content = (
        <header style={{ backgroundColor: "orange" }}>
            <div>
                <h1>headies</h1>
                <Link to="/dashboard">
                    <h1>ALDI</h1>
                </Link>
                <nav>
                    {/* add nav buttons later */}
                </nav>
            </div>
        </header>
    )
    
    return content;
}
export default DashHeader;