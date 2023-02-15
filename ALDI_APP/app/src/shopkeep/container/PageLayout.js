import { Outlet, useNavigate } from "react-router-dom";
import './pagelayout.css';
import FilterButton from './FilterButton'

const PageLayout = () => {
    const navigate = useNavigate();
    console.log(window.location.href);
    const PendingButton = () => {
        if (window.location.href === 'http://localhost:3000/dashboard/pending')
            return (<div className='request-button-current'>Pending</div>)
        return (<div className='request-button-non-current' onClick={() => navigate('/dashboard/pending')}>Pending</div>)
    }
    const ClosedButton = () => {
        if (window.location.href === 'http://localhost:3000/dashboard/closed')
            return (<div className='request-button-current'>Closed</div>)
        return (<div className='request-button-non-current' onClick={() => navigate('/dashboard/closed')}>Closed</div>)
    }
    const CreateButton = () => {
        if (window.location.href === 'http://localhost:3000/dashboard/create')
            return (<div className='request-button-current'>Create</div>)
        return (<div className='request-button-non-current' onClick={() => navigate('/dashboard/create')}>Create</div>)
    }
    const ManageButton = () => {
        if (window.location.href === 'http://localhost:3000/dashboard/manager')
            return (<div className='request-button-current'>Manage Requests</div>)
        return (<div className='request-button-non-current' onClick={() => navigate('/dashboard/manager')}>Manage Requests</div>)
    }
    return (
        // <div className='PageLayout_Main'>
        //     <div className='PageLayout_Header'>
        //         <div className='PageLayout_Header_Title'>Item List</div>
        //         <div className='PageLayout_Header_Button_Container'>
        //             <FilterButton />
        //         </div>
        //     </div>
        //     <div className='PageLayout_Container'>
        //         <div className='PageLayout_Body'>
        //             <Outlet />
        //         </div>
        //     </div>
        // </div>
        <Outlet />
    )
}

export default PageLayout;