import { Outlet, useNavigate } from "react-router-dom";
import './requestcontainer.css';

const RequestContainer = () => {
    const navigate = useNavigate();
    console.log(window.location.href);
    const PendingButton = () => {
        if (window.location.href === 'http://localhost:3000/dashboard/pending')
            return (<div className='request-button-current'>Pending</div>)
        return (<div className='request-button-non-current' onClick={() => navigate('/dashboard/pending')}>Pending</div>)
    }
    const CompleteButton = () => {
        if (window.location.href === 'http://localhost:3000/dashboard/complete')
            return (<div className='request-button-current'>Completed</div>)
        return (<div className='request-button-non-current' onClick={() => navigate('/dashboard/complete')}>Complete</div>)
    }
    const CreateButton = () => {
        if (window.location.href === 'http://localhost:3000/dashboard/create')
            return (<div className='request-button-current'>Create</div>)
        return (<div className='request-button-non-current' onClick={() => navigate('/dashboard/create')}>Create</div>)
    }
    return (
        <div className='request-main'>
            <div className='request-container'>
                <PendingButton />
                <CompleteButton />
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