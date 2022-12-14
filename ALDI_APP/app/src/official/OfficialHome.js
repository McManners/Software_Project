import React from 'react';
import './styles.css';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../simple/useAuth';
import DateAndTime from './DateAndTime';
import './officialhome.css';

const OfficialHome = () => {
    console.log("hey from official home");
    const { auth } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleCardClick = (goto) => {

        console.log("card clicked: " + goto);
        navigate(`/official/${goto}`);
    }

    return (
        <div>
            <body className="homepage-body">
            <div className="homepage-container">
                <div className="homepage-content">
                    <div className="homepage-introduction">
                        <h2>Welcome Back, Username</h2>
                        <div className="test-container">
                            <div className="date-header">
                                <p className="date-p"><DateAndTime/></p>
                                <button className="calendar-button"><img src="https://cdn-icons-png.flaticon.com/512/3217/3217869.png" height={30} width={30} /> </button>
                            </div>
                        </div>
                        <br/><br/>                                               <br/><br/>
                        <div className="cards jsGridView">
                            <div className="card-wrapper">
                                <div className="card">
                                    <div className="card-header">
                                    </div>
                                    <div className="card-content-header">
                                        <p className="card-info-header">Request Time Off</p>
                                        <Link to="/statsPage">
                                            <img src="https://cdn-icons-png.flaticon.com/512/2370/2370264.png" height={50} width={50} className="card-picture" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="card-wrapper">
                                <div className="card">
                                    <div className="card-header">
                                    </div>
                                    <div className="card-content-header">
                                        <p className="card-info-header">View Time Off Balance</p>
                                        <Link to="/statsPage">
                                            <img src="https://cdn-icons-png.flaticon.com/512/2117/2117251.png" height={50} width={50} className="card-picture" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="card-wrapper">
                                <div className="card">
                                    <div className="card-header">
                                    </div>
                                    <div className="card-content-header">
                                        <p className="card-info-header"></p>
                                    </div>
                                </div>
                            </div>
                            <div className="card-wrapper">
                                <div className="card">
                                    <div className="card-header">
                                    </div>
                                    <div className="card-content-header">
                                        <p className="card-info-header"></p>
                                    </div>
                                </div>
                            </div>
                            <div className="card-wrapper">
                                <div className="card">
                                    <div className="card-header">
                                    </div>
                                    <div className="card-content-header">
                                        <p className="card-info-header"></p>
                                    </div>
                                </div>
                            </div>
                            <div className="card-wrapper">
                                <div className="card">
                                    <div className="card-header">
                                    </div>
                                    <div className="card-content-header">
                                        <p className="card-info-header"></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="notification-section">
                        <div className="notification-header">
                            <p>Your Notifications</p>
                        </div>
                        <div className="notifications">
                            <div className="notify-container">
                                <div className="notify-content">
                                    <div className="not-header">
                                        <div className="message-alert">New Message</div>
                                    </div>
                                    <p className="notification-content-message">
                                        Your requested day off for December, 21, 2022 to December, 30, 2022 was Declined. Reason: not enough vacation days.
                                    </p>
                                </div>
                            </div>
                            <div className="notify-container">
                                <div className="notify-content">
                                    <div className="not-header">
                                        <div className="message-alert">New Message</div>
                                    </div>
                                    <p className="notification-content-message">Your Requested Time Off for November, 23, 2022 was Accepted. Type: Sick Day.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </body>
        </div>
    )
}

export default OfficialHome;