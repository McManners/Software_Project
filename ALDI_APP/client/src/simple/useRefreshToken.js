import axios from './axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        const response = await axios.get('/refresh', {
            withCredentials: true
        });
        setAuth(prev => {
            console.log(JSON.stringify(prev));
            console.log(response.data.accessToken);
            return {
                ...prev,
                accessToken: response.data.accessToken
            }
        });
        return response.data.accessToken;
    }
    return refresh;
};

export default useRefreshToken;

// import useAuth from "./useAuth";
// import axios from "./axios";

// const useRefreshToken = async () => {
//     const { setAuth } = useAuth();

//     const refresh = async () => {
//         const response = await axios.get('http://localhost:3001/refresh', {
//             withCredentials: true
//         });
//         setAuth(previous => {
//             console.log("prev state: " + previous);
//             console.log("setting new auth for " + response.email);
//             return { ...previous, accessToken: response.data.accessToken }
//         });
//         return response.data.accessToken;
//     }
//     return refresh;
// }

// export default useRefreshToken;