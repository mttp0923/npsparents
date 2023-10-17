import { createContext, useState } from "react";

const AuthContext = createContext({});

/*
export function useAuth() {
    return useContext(AuthContext)
}
*/

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
//    const [session, setSession] = useState(false);

    /*
    const requestRefresh = async (params) => {
        const res = await axiosHttpRequest.post(BASE_URL, params, 
            { 
                headers: 
                { 
                    'Content-Type': 'application/json', 
                    'Authorization': `Bearer ${tokenLocal}` 
                },
            }
        )
        

//        if(res.data.rem == 'expired'){
//            logout({task: 'logoutUser' })
//        }
//        console.log(auth?.session + ' token: ' + auth?.token); 
//        console.log(res); 
    };

    const login = async (params) => {
        const response = await axiosInstance.post(BASE_URL, params, 
            { 
                headers: 
                { 
                    'Content-Type': 'application/json'
                },
            }
        )
        return response;
    }

    const logout = async (params) => {
        await axiosInstance.post(BASE_URL, params,
        { 
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${tokenLocal}` },
            withCredentials: true,
            crossorigin: true,
            mode: 'no-cors',
        })
    }

    async function checkStudOffEmail(params) {
        const response = await axios.post(BASE_URL + '/?task=checkAccount', params, 
            { 
                headers: { 'Content-Type': 'application/json' },
                withCredentials: false 
            }
        )
        return response;
    }
    */

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;