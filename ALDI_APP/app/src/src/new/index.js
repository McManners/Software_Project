import React from "react";
import "./CSS/Styles.css";
import Navbar from "./Components/Navbar";
import { createRoot } from "react-dom/client";
import {
    createBrowserRouter,
    RouterProvider,
    Route,
    Link,
} from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: (
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
        ),
    },
    {
        path: "homepage",
        element: <div>
            <body className="homepage-body">
            <Navbar/>
            <br/>
            <main className="homepage-main">
                <div className="responsive-wrapper">
                    <div className="main-header">
                        <h1 className="welcome-user">Welcome Back, (USER)</h1>
                        <hr className="line1"/>
                        <div className="search">
                        </div>
                    </div>
                    <div className="container1">
                        <div className="header1">
                            <div className="calendar">
                                <button className="calendar-button">
                                    <img src="https://cdn-icons-png.flaticon.com/128/55/55281.png"
                                         className="calendar-picture" height="30px" width="30px"/>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="card-container">
                        <div className="card-row">
                            <Link to="/requestPTO">
                            <div className="card">
                                <img src="https://cdn-icons-png.flaticon.com/512/2117/2117251.png" className="card-picture" />
                                <br/>
                                <h4>        Request Time Off     </h4>
                            </div>
                            </Link>
                            <Link to="/statsPage">
                            <div className="card">
                                <img src="https://cdn-icons-png.flaticon.com/512/7174/7174337.png" className="card-picture" />
                                <br/>
                                <h4>View Time Off</h4>
                            </div>
                            </Link>
                            <div className="card">
                                <img src="https://cdn-icons-png.flaticon.com/512/2099/2099058.png" className="card-picture"/>
                                <br/>
                                <h4>Settings</h4>
                            </div>
                        </div>
                    </div>
                    <div className="content-small">
                        Notification's Go Here
                    </div>
                    </div>

            </main>
            </body>
        </div>,
    },
    {
        path: "statsPage",
        element: <div>
            <h3>Stats Page</h3>
        </div>
    },
    {
        path: "requestPTO",
        element: <div>
            <h3>PTO PAGE</h3>
        </div>
    },

]);

createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />
);