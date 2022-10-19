import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './simple/AuthProvider';
import { UserProvider } from "./simple/UserContext"

import { Provider } from 'react-redux';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
)