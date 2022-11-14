import axios from "./axios";
import useAuth from "./useAuth";

const useLogout = () => {
    const { auth, setAuth } = useAuth();
    const logout = async () => {
        console.log(auth);
        await axios({
            method: "post",
            url: "http://localhost:3001/logout",
            withCredentials: true,
            data: {
                access_token: auth.access_token
            }
        })
        .catch(err => {
            console.log(err);
        })
        setAuth({});
            
    }

    return logout;
}

export default useLogout