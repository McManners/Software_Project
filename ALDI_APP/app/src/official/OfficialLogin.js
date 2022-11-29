import React, { useState, useEffect, useRef } from 'react';
import './styles.css';
import useAuth from '../simple/useAuth';
import axios from 'axios';
import { useNavigate, useLocation, Link } from 'react-router-dom';

const OfficialLogin = () => {
    const { auth, setAuth, remember, setRemember } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    console.log("hey from official login")

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [errMsg, setErrMsg] = React.useState("");
    

    
    
    
    const from = location.state?.from?.pathName || "/official/dashboard";

    if (location.state?.from?.pathName === "/official/dashboard") {
        // TODO: notify user that they need to log in
        console.log("from official home")
    }
    const emailRef = useRef();
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
    }, [email, password])

    const handleEmailChange = event => {
        setEmail(event.target.value)
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
                email: email,
                password: password
            },
            withCredentials: true
        })
        /*
            https://stackoverflow.com/questions/62964902/axios-post-extracting-data-from-response
        */
        .then(function(res) {
            console.log("auth response is good");
            const access_token = res?.data?.access_token;
            console.log(access_token);
            const employee_type = res?.data?.employee_type;
            const first_name = res?.data?.first_name;
            const last_name = res?.data?.last_name;
            setAuth({ first_name, last_name, employee_type, access_token });
            setEmail("");
            setPassword("");
            navigate(from, { replace: true });
        })
        .catch(err => {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('No account matches this email');
            } else if (err.response?.status === 404) {
                setErrMsg(err.response.data.message);
            } else {
                setErrMsg('Login Failed');
            }
        });
        errRef.current.focus();
    }

    return (
        <div>
            <div className="sign-in-page">
                <div className="container">
                    <div className="form-container sign-in-container">
                    <div ref={errRef} style={{color: "red", fontWeight: "bold"}}>{errMsg}</div>
                        <form onSubmit={handleSubmit}>
                            <label id='email-label' htmlFor='email'>Employee Email:</label><br />
                            {/*https://stackoverflow.com/questions/37609049/how-to-correctly-catch-change-focusout-event-on-text-input-in-react-js*/}

                            <input type='email' id='email-input' name='email-input' ref={emailRef} /*onBlur={handleEmailChange} value={email}*/ onChange={handleEmailChange} value={email} /><br />
                            <label id='password-label' htmlFor='password-input'>Password:</label><br />
                            <input type='password' id='password-input' name='password-input' onChange={handlePasswordChange} value={password}/><br />
                            <label htmlFor='remember-me-input'>Remember Me: </label>
                            <input type='checkbox' name='remember-me-input' id='remember-me-input'/><br />
                            <button type='submit' name='submit' id='login-button'>Submit</button>
                        </form>
                    </div>
                    <div className="overlay-container">
                        <div className="picture-align">
                            <img className="imgLogo2" src="https://miro.medium.com/max/828/1*JLM_9XM6yqsWaMfMTSTEAg.jpeg"/>
                        </div>
                    </div>
                </div>
                </div>
        </div>
    )
}

export default OfficialLogin;