// client/src/App.js

import React, { useEffect, useRef, useContext } from "react";
import { Navigate, Link, useNavigate, useLocation } from "react-router-dom";
import useAuth from "./useAuth";
import './css/login.css';
import axios from 'axios';
import aldi_logo from './imgs/ASG_SER_MC_RGB.png';
import useRefreshToken from "./useRefreshToken";

const Login = () => {
    const { auth, setAuth, remember, setRemember } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    

    const [employeeID, setEmployeeID] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [errMsg, setErrMsg] = React.useState("");
    
    const from = location.state?.from?.pathName || "/dashboard";

    if (location.state?.from?.pathName === "/dashboard") {
        // TODO: notify user that they need to log in
    }
    const employee_idRef = useRef();
    const errRef = useRef();

    // useEffect(() => {
    //     emailRef.current.focus();
    // }, []);

    useEffect(() => {
        setErrMsg("");
        // dont want to show the error message after its been seen
    }, []);

    useEffect(() => {
        setErrMsg('');
    }, [employeeID, password])

    const handleEmployeeIDChange = event => {
        setEmployeeID(event.target.value)
    };
    const handlePasswordChange = event => {
        setPassword(event.target.value)
    };

    useEffect(() => {
        localStorage.setItem("remember", remember);
    }, [remember])

    const handleSubmit = async event => {
        event.preventDefault();

        axios({
            method: 'POST',
            url: 'http://localhost:3001/auth',
            data: {
                employee_id: employeeID,
                password: password
            },
            withCredentials: true
        })
        /*
            https://stackoverflow.com/questions/62964902/axios-post-extracting-data-from-response
        */
        .then(function(res) {
            const access_token = res.data?.access_token;
            const first_name = res.data?.first_name;
            const last_name = res.data?.last_name;
            const employee_type = res.data?.employee_type;
            setAuth({ employeeID, first_name, last_name, employee_type, access_token });
            setEmployeeID("");
            setPassword("");
            navigate(from, { replace: true });
        })
        .catch(err => {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing EmployeeID or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('No account exists for this employeeID');
            } else if (err.response?.status === 404) {
                setErrMsg(err.response.data.message);
            } else {
                setErrMsg('Login Failed');
            }
        });
        errRef.current.focus();
    }

  return (
    <div className="App">
        <div className='login-form'>
            <div id='form-page-container'>
                <div id='form-left'>
                    <div>
                        <img id='aldi_logo' src={aldi_logo}/><br/>
                        <h3 style={{margin: 0}}>Sign In</h3>
                        <div ref={errRef} style={{color: "red", fontWeight: "bold"}}>{errMsg}</div>
                    <form onSubmit={handleSubmit}>
                        <label id='employee_id-label' htmlFor='email'>Employee ID:</label><br />
                        {/*https://stackoverflow.com/questions/37609049/how-to-correctly-catch-change-focusout-event-on-text-input-in-react-js*/}

                        <input type='employee_id' id='employee_id-input' name='employee_id-input' ref={employee_idRef} /*onBlur={handleEmailChange} value={email}*/ onChange={handleEmployeeIDChange} value={employeeID} /><br />
                        <label id='password-label' htmlFor='password-input'>Password:</label><br />
                        <input type='password' id='password-input' name='password-input' onChange={handlePasswordChange} value={password}/><br />
                        <label htmlFor='remember-me-input'>Remember Me: </label>
                        <input type='checkbox' name='remember-me-input' id='remember-me-input'/><br />
                        <button type='submit' name='submit' id='login-button'>Submit</button>
                    </form>
                    <br />
                    <button type="button" onClick={() => navigate("/register")}>CreateAccount</button>
                    </div>
                    </div>
                <div id='form-right'>
                    <div id='aldi-building'>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}

export default Login;