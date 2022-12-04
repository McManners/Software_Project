import React, { useState, useRef, useEffect } from 'react';
import axios from './axios';
import { Navigate, useLocation } from 'react-router-dom';

const Register = () => {
    const location = useLocation();

    const [email, setEmail] = useState("");
    const [eid, setEmployee_ID] = useState("");
    const [password, setPassword] = useState("");
    const [confirm_password, setConfirm_Password] = useState("");

    const errRef = useRef();
    const [errMsg, setErrMsg] = useState("");

    useEffect(() => {
        setErrMsg("");
        // dont want to show the error message after its been seen
    }, []);

    // TODO: verify password on submit, maybe even on change...
    // TODO: err ref for failed response account exists for this user
    // TODO: "success, click here to log in"...
    

    const createAccount = async event => {
        event.preventDefault();

        axios({
            method: 'post',
            url: 'http://localhost:3001/register',
            data: {
                email: email,
                eid: eid,
                password: password
            },
            withCredentials: true
        })
        .catch(err => {
            if (!err?.response) {
                setErrMsg('No Server Response');
            }
            setErrMsg(err.response.data.message);
            console.log(err.response.data.message);
        });
        errRef.current.focus();

        
    }

    const handleEmailChange = event => { setEmail(event.target.value); }
    
    const handleEmployee_IDChange = event => { setEmployee_ID(event.target.value); }
    const handlePasswordChange = event => { setPassword(event.target.value); }
    const handleConfirm_PasswordChange = event => { setConfirm_Password(event.target.value); }

    return (
        <div>
            <body className="sign-in-page">
            <div className="official-login-container">
                <div className="left-side-login-picture">
                </div>
            <form className="login-form-styles" onSubmit={createAccount}>
                <div ref={errRef} style={{color: "red", fontWeight: "bold"}}>{errMsg}</div>
                <h4 className="login-page-header">Create Account</h4>
                    <label htmlFor="email">Email</label><br/>
                    <input type="textbox" id="email" value={email} onChange={handleEmailChange} /><br/>
                    <label htmlFor="eid">Employee ID</label><br/>
                    <input type="textbox" id="eid" onChange={handleEmployee_IDChange} /><br/>
                    <label htmlFor="password">Password</label><br/>
                    <input type="password" id="password" onChange={handlePasswordChange} /><br/>
                    <label htmlFor="confirm_password">Confirm Password</label><br/>
                    <input type="password" id="confirm_password" onChange={handleConfirm_PasswordChange} />
                <br/>
                    <button type='submit' className="continue-button" name='submit' id='submit'>Create Account</button>
                <p>Already a member? Click <a href="./login" className="discrete">here.</a> to return to login</p>
            </form>
            </div>
            </body>
        </div>
        // <div className="App">
        //     <header className="App-header">
        //         <div>
        //             <h1>Create Account</h1>
        //             <div ref={errRef} style={{color: "red", fontWeight: "bold"}}>{errMsg}</div>
        //             <form onSubmit={createAccount}>
        //                 <label htmlFor="email">Email</label><br/>
        //                 <input type="textbox" id="email" value={email} onChange={handleEmailChange} /><br/>
        //                 <label htmlFor="eid">Employee ID</label><br/>
        //                 <input type="textbox" id="eid" onChange={handleEmployee_IDChange} /><br/>
        //                 <label htmlFor="password">Password</label><br/>
        //                 <input type="password" id="password" onChange={handlePasswordChange} /><br/>
        //                 <label htmlFor="confirm_password">Confirm Password</label><br/>
        //                 <input type="password" id="confirm_password" onChange={handleConfirm_PasswordChange} />
        //                 <br/><br/>
        //                 <button type='submit' name='submit' id='submit'>Create Account</button>
        //             </form>
        //         </div>
        //     </header>
        // </div>
    )
}

export default Register;