import { Outlet } from "react-router-dom";
import './managercontainer.css';

const ManagerContainer = () => {
    
    return (
        <div className='manager-request-main'>
            <div className='manager-request-container'>
                <div className='manager-request-body'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default ManagerContainer;