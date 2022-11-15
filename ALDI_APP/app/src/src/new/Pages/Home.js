import React from 'react';
import { Link } from 'react-router-dom';
import "../CSS/Styles.css";
import Navbar from '../Components/Navbar';

const Home = () => {

    return (
        <div>
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
                            <Link to="/requesttest">
                            <div className="card">
                                <img src="https://cdn-icons-png.flaticon.com/512/2117/2117251.png" className="card-picture" />
                                <br/>
                                <h4>        Request Time Off     </h4>
                            </div>
                            </Link>
                            <Link to="/statstest">
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
        </div>
    );
}

export default Home;