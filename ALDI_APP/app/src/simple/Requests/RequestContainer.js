import { Outlet, useNavigate } from "react-router-dom";
import './requestcontainer.css';

const RequestContainer = () => {
    const navigate = useNavigate();
    console.log(window.location.href);
    const PendingButton = () => {
        if (window.location.href === 'http://localhost:3000/dashboard/pending')
            return (<span className='request-button-current'>Pending</span>)
        return (<span className='request-button-non-current' onClick={() => navigate('/dashboard/pending')}>Pending</span>)
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
    return (
        <div className='request-main'>
            <div className='request-container'>
                <PendingButton />
                <ClosedButton />
                <CreateButton />
                {window.location.href === 'http://localhost:3000/dashboard/pending' ?
                <div className='manager-request-body'>
                    <Outlet />
                </div>
                :
                <div className='request-body'>
                    <Outlet />
                </div>}
            </div>
        </div>
    )
}

export default RequestContainer;