import { useContext, useDebugValue } from "react";
import AuthContext from "./AuthProvider";

const useAuth = () => {
    const { auth } = useContext(AuthContext);
    console.log(auth);
    console.log("auth: " + auth.email);
    useDebugValue(auth, auth => auth?.email ? "Logged In" : "Logged Out")
    return useContext(AuthContext);
}

export default useAuth;