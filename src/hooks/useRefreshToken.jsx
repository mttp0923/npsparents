import axios from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = async () => {
    const { setAuth } = useAuth();

//    const refresh = async () => {
        const response = await axios.post("http://localhost:8080/parents/", {task:'validateToken'}, {
            withCredentials: false
        });
        /*
        setAuth(
            {
                rem: response.data.rem + 'hehe',
                accessToken: response.data.access_token
            }
        );
//        return response.data.access_token;
        */
//    }
    return response;
};

export default useRefreshToken;
