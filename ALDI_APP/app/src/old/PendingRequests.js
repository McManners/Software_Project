import React from 'react';
import { useNavigate } from 'react-router-dom';
import './css/request.css';

const PendingRequests = () => {
    const navigate = useNavigate();

    return (
        <div className='request-main'>
            <div className='request-container'>
                <div className='request-header-buttons'>
                    <button type='button' id='pending-button' className='request-current-button'>Pending</button>
                    <button style={{margin: '0 1px'}} type='button' id='completed-button' className='request-non-current-button' onClick={() => navigate('/request/completed')}>Completed</button>
                    <button type='button' id='create-button' className='request-non-current-button' onClick={() => navigate('/request/create')}>Create New</button>
                </div>
                <div className='request-pending'>
                    <div className='request-pending-item'>
                        Hey
                    </div>
                    <div className='request-pending-item'>
                        <div>
                            <div><span style={{fontWeight: 'bold'}}>Request ID:</span> 100001</div>
                            <div><span style={{fontWeight: 'bold'}}>Submit Date:</span> 10/09/1997</div>
                            <div><span style={{fontWeight: 'bold'}}>Type:</span> Vacation</div>
                        </div>
                        <div>
                            <div><span style={{fontWeight: 'bold'}}>Date From:</span> 10/08/2022</div>
                            <div><span style={{fontWeight: 'bold'}}>Date To:</span> 10/10/2022</div>
                            <div><span style={{fontWeight: 'bold'}}>Status:</span> Pending</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default PendingRequests;