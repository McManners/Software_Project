import React, { useState, useRef, useEffect } from 'react';
import axios from './axios';
import { Navigate, useLocation } from 'react-router-dom';

const Register = () => {
    const location = useLocation();

    const [email, setEmail] = useState("");
    const [employee_id, setEmployee_ID] = useState("");
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
                employee_id: employee_id,
                password: password
            },
            withCredentials: true
        })
        /*
            https://stackoverflow.com/questions/62964902/axios-post-extracting-data-from-response
        */
        // .then(function(res) {
        //     console.log("auth response is good");
        //     console.log(res.data);
        //     const accessToken = res.data.accessToken;
        //     setAuth({ email, password, accessToken });
        //     setEmail("");
        //     setPassword("");
        //     navigate(from, { replace: true });
        // })
        .then(res => {
            console.log(res);
        }
        )
        .catch(err => {
            if (!err?.response) {
                setErrMsg('No Server Response');
            }
            setErrMsg(err.response.data.message);
        });
        errRef.current.focus();

        // const response = await axios.post('http://localhost:3001/register',
        // JSON.stringify({ email, password, employee_id }),
        // // { email: email, password: password, employee_id: "1" },
        // {
        //     headers: { 'Content-Type': 'application/json' },
        //     withCredentials: false
        // }
        // );
        // console.log(JSON.stringify(response?.data));
        // } catch (err) {
        //     console.log(err);
        // }
    }

    const handleEmailChange = event => { setEmail(event.target.value); }
    
    const handleEmployee_IDChange = event => { setEmployee_ID(event.target.value); }
    const handlePasswordChange = event => { setPassword(event.target.value); }
    const handleConfirm_PasswordChange = event => { setConfirm_Password(event.target.value); }

    return (
        <div className="App">
            <header className="App-header">
                <div>
                    <h1>Create Account</h1>
                    <div ref={errRef} style={{color: "red", fontWeight: "bold"}}>{errMsg}</div>
                    <form onSubmit={createAccount}>
                        <label htmlFor="email">Email</label><br/>
                        <input type="textbox" id="email" value={email} onChange={handleEmailChange} /><br/>
                        <label htmlFor="employee_id">Employee ID</label><br/>
                        <input type="textbox" id="employee_id" onChange={handleEmployee_IDChange} /><br/>
                        <label htmlFor="password">Password</label><br/>
                        <input type="password" id="password" onChange={handlePasswordChange} /><br/>
                        <label htmlFor="confirm_password">Confirm Password</label><br/>
                        <input type="password" id="confirm_password" onChange={handleConfirm_PasswordChange} />
                        <br/><br/>
                        <button type='submit' name='submit' id='submit'>Create Account</button>
                    </form>
                </div>
            </header>
        </div>
    )
}

export default Register;