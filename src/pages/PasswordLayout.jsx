import { useEffect } from "react";
import { Outlet } from 'react-router-dom';
import LoginHeader from '../components/LoginHeader';
import { useNavigate, useLocation } from "react-router-dom";

import  useAuth from "../hooks/useAuth";

export default function PasswordLayout() {
    const { auth, setAuth } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/npsParents/login";

    useEffect(() => {
        if(!auth?.session){
            navigate(from, { replace: true })
        }

        const timer = setTimeout(() => {
            setAuth({})
            navigate(from, { replace: true }); 
          }, 180000);
          return () => clearTimeout(timer);

    }, [auth.session])

  return (
    <>
      <LoginHeader />
        <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">{<Outlet />}</div>
        </main>
    </>
  );
}