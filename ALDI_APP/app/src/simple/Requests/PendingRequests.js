import React from 'react';
import { useNavigate } from 'react-router-dom';
import './pendingrequest.css';

const PendingRequests = () => {
    const navigate = useNavigate();

    return (
        <div id='pending-request-main'>
            <div id='pending-request-container'>
                <div id='pending-button' className='pending-button-current'>Pending</div>
                <div id='complete-button' className='pending-button-non-current' onClick={() => navigate('/request/complete')}>Complete</div>
                <div id='create-new-button' className='pending-button-non-current' onClick={() => navigate('/request/create')}>Create New</div>
                        
                <div id='pending-request-body'>
                    <div className='pending-request-item'>
                        <div className='pending-request-item-data'>
                            <div>
                                <div><span className='bold'>Request ID:</span> 100001</div>
                                <div><span className='bold'>Submit Date:</span> 10/09/1997</div>
                                <div><span className='bold'>Type:</span> Vacation</div>
                            </div>
                            <div>
                                <div><span className='bold'>Date From:</span> 10/08/2022</div>
                                <div><span className='bold'>Date To:</span> 10/10/2022</div>
                                <div><span className='bold'>Status:</span> Pending</div>
                            </div>
                        </div>
                        <div className='bold'>Request Note:</div>
                        <div className='pending-textbox'>
                            It is my birthday.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PendingRequests;