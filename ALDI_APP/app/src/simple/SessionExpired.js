import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const SessionExpired = () => {
    const navigate = useNavigate();

    return (
        <div>
            Session expired. Please sign in again.<br/>
            <button type="button" onClick={() => navigate('/login')}>Go To Sign In Page</button>
        </div>
    )
}

export default SessionExpired;