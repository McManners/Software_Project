import { Outlet, useNavigate } from "react-router-dom";
import './requestcontainer.css';
import { GrCircleAlert } from 'react-icons/gr';
import { IconContext } from 'react-icons/lib';

const RequestContainer = () => {
    const navigate = useNavigate();
    console.log(window.location.href);
    const PendingButton = () => {
        if (window.location.href === 'http://localhost:3000/dashboard/pending')
            return (<span className='request-button-current'>Pending</span>)
        return (<span className='request-button-non-current' onClick={() => navigate('/dashboard/pending')}>
            <IconContext.Provider value={{ style: { verticalAlign: 'middle' },  size: '1.3em' }}>
                <GrCircleAlert className='pending-request-notification'/>
            </IconContext.Provider>
                Pending</span>)
    }
    const ClosedButton = () => {
        if (window.location.href === 'http://localhost:3000/dashboard/closed')
            return (<span className='request-button-current'>Closed</span>)
        return (<span className='request-button-non-current' onClick={() => navigate('/dashboard/closed')}>Closed</span>)
    }
    const CreateButton = () => {
        if (window.location.href === 'http://localhost:3000/dashboard/create')
            return (<span className='request-button-current'>Create</span>)
        return (<span className='request-button-non-current' onClick={() => navigate('/dashboard/create')}>Create</span>)
    }
    const ManageButton = () => {
        if (window.location.href === 'http://localhost:3000/dashboard/manager')
            return (<span className='request-button-current'>Manage Requests</span>)
        return (<span className='request-button-non-current' onClick={() => navigate('/dashboard/manager')}>Manage Requests</span>)
    }
    return (
        <div className='request-main'>
            <div className='request-container'>
                <PendingButton />
                <ClosedButton />
                <CreateButton />
                <ManageButton />
                {/* {window.location.href === 'http://localhost:3000/dashboard/pending' ?
                <div className='manager-request-body'>
                    <Outlet />
                </div>
                : */}
                <div className='request-body'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default RequestContainer;