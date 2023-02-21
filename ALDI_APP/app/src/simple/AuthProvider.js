import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    // const [remember, setRemember] = useState(JSON.parse(localStorage.getItem("remember")) || true);
    const [remember, setRemember] = useState(true);
    const [auth, setAuth] = useState({});

    return (
        <AuthContext.Provider value={{ auth, setAuth, remember, setRemember }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;