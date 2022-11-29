import React from 'react';
import './styles.css';
import { Link } from 'react-router-dom';

const OfficialStats = () => {

    return (
        <div>
            <div className="stats-page-body">
            <div className="stats-page">
                <div className="sidebar-picture">
                    <span className="extended-logo">
                        <img src="AL_BLR_LA_MC_RGB.png" height="60" width="130"/></span>
                </div>
                <div className="sidebar">
                    <br/>
                    <br/>
                    <br/> <br/>
                    <ul>
                        <li className="active">
                            <span>Home Page</span>
                        </li>
                        <li className="download-option">
                            <span>Print Stats Page</span>
                        </li>
                        <li className="request-option">
                            <span>Request Time Off</span>
                        </li>
                        <li className="log-off-option">
                            <span>Log Off</span>
                        </li>
                    </ul>
                </div>
                <div className="main-content">
                    <div className="stats-container">
                        <div className="container-stats-1">
                            <div className="title">Dashboard</div>
                            <div className="content-stats-page">
                                <div className="container-fluid">
                                    <div className="row">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
    )
}

export default OfficialStats;