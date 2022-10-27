// client/src/App.js

import React, { useEffect, useRef, useContext } from "react";
// import logo from "./logo.svg";
// import "./App.css";
// import { useSelector } from 'react-redux';
import { Navigate, Link, useNavigate, useLocation } from "react-router-dom";
import useAuth from "./useAuth";

import axios from 'axios';


const Login = () => {
    // const [token, setToken] = useContext(UserContext);
    const { setAuth, remember, setRemember } = useAuth();

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [errMsg, setErrMsg] = React.useState("");

    // const credentials = useSelector((state) => state.credentials.value);

    

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathName || "/dashboard";

    // const emailRef = useRef();
    // const errRef = useRef();

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

    const handleRefresh = event => {
        event.preventDefault();
        const url = 'http://localhost:3001/refresh';
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };
        fetch(url, requestOptions)
        .then(response => console.log(response))
        .catch (error => console.log("Refresh Error: " + error))
    };
    const handleLogout = event => {
        event.preventDefault();
        const url = 'http://localhost:3001/logout';
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };
        fetch(url, requestOptions)
        .then(response => console.log(response))
        .then(() => {
            console.log("logging out auth");
            setAuth({});
            navigate('/');
        })
        .catch(err => console.log("Logout error: " + err));
    }
    const handleSubmit = async event => {
        event.preventDefault();

        axios({
            method: 'post',
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
            console.log(res.data);
            const accessToken = res.data.accessToken;
            setAuth({ email, password, accessToken });
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
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
        });
        // errRef.current.focus();
    }

  return (
    <div className="App">
      <header className="App-header">
        <div>
        <p /*ref={errRef}*/ style={{color: "red",fontWeight: "bold"}}>{errMsg}</p>

            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor='email'>Email Address:</label><br />
                <input type='email' id='email-input' name='email-input' /*ref={emailRef}*/ onChange={handleEmailChange} value={email}/><br /><br />
                <label htmlFor='password-input'>Password:</label><br /><br />
                <input type='password' id='password-input' name='password-input' onChange={handlePasswordChange} value={password}/><br /><br />
                <label htmlFor='remember-me-input'>Remember Me: </label>
                <input type='checkbox' name='remember-me-input' id='remember-me-input'/><br /><br />
                <button type='submit' name='submit' id='submit'>Submit</button>
            </form>
            <br /><br />
            <button type='button' onClick={handleRefresh}>Refresh Token</button>
            <button type='button' onClick={handleLogout}>Logout</button>
        </div>
      </header>
    </div>
  );
}

export default Login;