import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'chart.js'
//import App from './App';
import Dchart from "./project/Dchart";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Dchart/>
  </React.StrictMode>
);

