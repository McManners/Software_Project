import React from "react";
import { Link } from "react-router-dom";
import "../CSS/Styles.css";
import Navbar from '../Components/Navbar';

const LoginTest = () => {
    
    return (
        <div>
            <body className="sign-in-page">
                <div className="container">
                    <div className="form-container sign-in-container">
                        <form action="#">
                            <img src="./Images/ASG_SER_MC_RGB.png"/>
                            <h3>Sign In</h3>
                            <span>Employee ID</span>
                            <input type="EmployeeID" placeholder="Employee ID"/>
                            <span>Password</span>
                            <input type="password" placeholder="Password"/>
                            <Link to="/homepage">
                                <button className="continue-button">Continue</button>
                            </Link>
                        </form>
                    </div>
                    <div className="overlay-container">
                        <div className="picture-align">
                            <img className="imgLogo2" src="https://miro.medium.com/max/828/1*JLM_9XM6yqsWaMfMTSTEAg.jpeg"/>
                        </div>
                    </div>
                </div>
            </body>
        </div>
    )
}
export default LoginTest;