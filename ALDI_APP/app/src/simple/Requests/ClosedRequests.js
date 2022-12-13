import React from 'react';
import { useNavigate } from 'react-router-dom';
import './closedrequests.css';

const ClosedRequests = () => {
    const navigate = useNavigate();

    return (
        
        <div className='complete-item'>
            <div className='complete-item-data'>
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
            <div className='complete-textbox'>
                It is my birthday.
            </div>
        </div>
    )
}

export default ClosedRequests;