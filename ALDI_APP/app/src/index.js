import React from "react"
import "./index.css"
import App from "./App";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './simple/AuthProvider';

import { createRoot } from 'react-dom/client';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/*" element={<App />} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    </React.StrictMode>
)