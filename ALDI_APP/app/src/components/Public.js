// public facing page... no auth
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../simple/axios';
import useAuth from '../simple/useAuth';
import useLogout from '../simple/useLogout';
import useRefreshToken from '../simple/useRefreshToken';

const Public = () => {

    const [status, setStatus] = useState(false);
    const navigate = useNavigate();
    const logout = useLogout();
    const refresh = useRefreshToken();
    const signOut = async () => {
        await logout();
    }
    
    axios({
        method: "GET",
        url: "http://localhost:3001/status",
        withCredentials: true
    })
    .then(res => {
        refresh();
        navigate('/dashboard');
    })
    .catch(err => {
        signOut();
    })

    return (
        <div>
            <h1>Public</h1>
            <Link to="/login">Login</Link>
        </div>
    )
}
export default Public;