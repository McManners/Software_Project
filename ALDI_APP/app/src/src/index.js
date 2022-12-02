import React from "react";
import "./CSS/Styles.css";
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
            <main className="homepage-main">
                <div className="responsive-wrapper">
                    <div className="main-header">
                        <h1 className="welcome-user">Welcome Back, (USER)</h1>
                        <hr className="line1"/>
                        <div className="search">
                        </div>
                    </div>

                </div>
            </main>
            </body>

        </div>,
    },
]);

createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />
);