import { useContext, useDebugValue } from "react";
import AuthContext from "../context/AuthProvider";

const useAuth = () => {
    const { auth } = useContext(AuthContext);
    useDebugValue(auth, auth => auth?.lesson ? console.log("Logged In") : console.log("Logged Out"))
    return useContext(AuthContext);
}

export default useAuth;