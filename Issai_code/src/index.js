import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'chart.js';
import 'react-chartjs-2';

import "./Chart_project/CSS/StatsCss.css";
import "./Chart_project/CSS/ChartTestCss.css";
//import "./Chart_project/CSS/ChartTextCss.css";
import App from './App';

import Stats from "./Chart_project/Stats";
//import ChartText from "./Chart_project/ChartText";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Stats/>
    </React.StrictMode>
);
