import React from "react";
import {Navigate} from "react-router-dom";
function SIgnIn() {
    return (
        <body className="sign-in-page">
            <div className="sign-in-container">
                <form action="#">
                    <h3>Sign In</h3>
                    <span>Employee ID</span>
                    <input type="EmployeeID" placeholder="Employee ID"/>
                    <span>Password</span>
                    <input type="password" placeholder="Password"/>
                    <button>Continue</button>
                </form>
            </div>
            <div className="container-alt">
                <div className="overlay">
                    <img className="imgLogo2"
                         src="https://miro.medium.com/max/828/1*JLM_9XM6yqsWaMfMTSTEAg.jpeg"/>
                </div>
            </div>
        </body>
    )
}
export default SIgnIn;