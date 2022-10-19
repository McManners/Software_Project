// client/src/App.js

import React, { useEffect, useRef, useContext } from "react";
// import logo from "./logo.svg";
// import "./App.css";
import { useSelector } from 'react-redux';
import { Navigate, Link, useNavigate, useLocation } from "react-router-dom";
import useAuth from "./useAuth";
import { setCredentials } from "../features/auth/authSlice";
import { UserContext } from "./UserContext";

const Login = () => {
    const [token, setToken] = useContext(UserContext);

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [errMsg, setErrMsg] = React.useState("");

    const credentials = useSelector((state) => state.credentials.value);

    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathName || "/dashboard";

    const emailRef = useRef();
    const errRef = useRef();

    // useEffect(() => {
    //     emailRef.current.focus();
    // })

    useEffect(() => {
        setErrMsg('');
    }, [email, password])

    const handleEmailChange = event => {
        setEmail(event.target.value)
    };
    const handlePasswordChange = event => {
    setPassword(event.target.value)
    };

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
        const url = 'http://localhost:3001/auth';
        // try {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ email, password })
            };
            let response = await fetch(url, requestOptions)
            // console.log('Submitted successfully');
            // console.log(response?.status);
            // .then((res) => res.json())
            console.log(response);
            console.log(response.status);
            if (response.ok) {
                let x = await response.json();
                console.log(x);
                const accessToken = x?.accessToken;
                //     // console.log(response?.data);
                    console.log("Token: " + token)
                    setAuth({ email, password, token });
                    
                    setEmail("");
                    setPassword("");

                    // dispatch(setCredentials({ email, accessToken }))
                    console.log(credentials);

                    console.log("dispatched");
                    navigate(from, { replace: true });
            }
            // .then((response) => {
            //     console.log(response.status);
            //     let e = await response.json();
            //     console.log(e.data);
                // console.log(response.json());
                // console.log(response.status);
                // console.log(response?.status);
                // if (data?.status === 200) {
                //     console.log("not 400 or 401!");
                //     const token = data?.accessToken;
                // //     // console.log(response?.data);
                //     console.log("Token: " + token)
                //     setAuth({ email, password, token });
                //     setEmail("");
                //     setPassword("");
                //     navigate(from, { replace: true });
                // } else {
                //     console.log(response?.status);
                //     if (response?.status === 400) {
                //         setErrMsg('Missing Username or Password');
                //     } else if (response?.status === 401) {
                //         setErrMsg('Unauthorized');
                //     } else {
                //         setErrMsg('Login Failed');
                //     }
                //     errRef.current.focus();
                // }
            // });
            // .catch((err) => {
            //     if (!err?.response) {
            //         setErrMsg('No Server Response');
            //     } else if (err.response?.status === 400) {
            //         setErrMsg('Missing Username or Password');
            //     } else if (err.response?.status === 401) {
            //         setErrMsg('Unauthorized');
            //     } else {
            //         setErrMsg('Login Failed');
            //     }
            //     errRef.current.focus();
            // });
        
            
        // } catch (err) {
        //     if (!err?.response) {
        //         setErrMsg('No Server Response');
        //     } else if (err.response?.status === 400) {
        //         setErrMsg('Missing Username or Password');
        //     } else if (err.response?.status === 401) {
        //         setErrMsg('Unauthorized');
        //     } else {
        //         setErrMsg('Login Failed');
        //     }
        //     errRef.current.focus();
        // }  
    }

  return (
    <div className="App">
      <header className="App-header">
        <div>
        <p ref={errRef} style={{color: "red",fontWeight: "bold"}}>{errMsg}</p>

            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor='email'>Email Address:</label><br />
                <input type='email' id='email-input' name='email-input' defaultValue="name@example.com" ref={emailRef} onChange={handleEmailChange} value={email}/><br /><br />
                <label htmlFor='password-input'>Password:</label><br /><br />
                <input type='password' id='password-input' name='password-input' onChange={handlePasswordChange} value={password} defaultValue="123456"/><br /><br />
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