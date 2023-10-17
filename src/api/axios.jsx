import axios from 'axios';

// export const BASE_URL = "http://localhost:8080/npsOnline";
// export const BASE_URL = "https://npsonline.ph/npsOnline";
export const BASE_URL = "https://frnz.ph/npsOnline";

const withNewToken = (token) => {
    localStorage.setItem('tokenLocal', token)
}

export const noNewToken = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("tokenLocal");
    localStorage.removeItem('refreshToken');
}

export const axiosHttpRequest = axios.create({
    baseURL: BASE_URL,
});

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('tokenLocal');

        if(token) {
            console.log('requesting with Bearer...');
            config.headers["Authorization"] = `Bearer ${token}` ;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

axiosInstance.interceptors.response.use(
    (res) => {
        return res;
    },
    async (err) => {
        if(err.response.status === 401){ //it means the token is expired, then request for a new token
            //refresh the token
            console.log('requesting refresh...')

            const rs = await axiosInstance.post('/parents/refreshToken.php')
            return withNewToken(rs.data.access_token)
        }
        else if (err.response.status === 400){  //it means the refresh_token is expired
            return noNewToken();
        }
        return Promise.reject(err);
    }
)

export default axiosInstance;