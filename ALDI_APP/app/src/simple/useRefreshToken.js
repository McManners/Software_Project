import axios from './axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        // const response = await axios.get('/refresh', {
        //     withCredentials: true,
        //     headers: { 'Access-Control-Allow-Credentials': true }
        // });
        const response = await axios({
            method: 'GET',
            url: 'http://localhost:3001/refresh',
            withCredentials: true
        });
        console.log(response);
        setAuth(prev => {
            console.log(JSON.stringify(prev));
            console.log(response.data.access_token);
            return {
                ...prev,
                accessToken: response.data.access_token
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
//         console.log("refreshing...");
//         const response = await axios.get('/refresh',
//             { withCredentials: true }
//         );
//         setAuth(previous => {
//             console.log("prev state: " + previous);
//             console.log("setting new auth for " + response.email);
//             return { ...previous, accessToken: response.data.accessToken }
//         });
//         return response.data.accessToken;
//     }
//     console.log("hi");
//     return refresh;
// }

// export default useRefreshToken;