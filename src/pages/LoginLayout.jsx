import { useEffect } from "react";
import { useLocation, useNavigate, Outlet } from "react-router-dom";

import LoginHeader from '../components/LoginHeader';

export default function LoginLayout() {

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/npsParents/login";

  const user = localStorage.getItem('user');

  useEffect(() => {
    if (!user || user === 'undefined') {
        navigate("/npsParents/login");
    }
  },[]);

  return (
    <>
      <LoginHeader />
        <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">{<Outlet />}</div>
        </main>
    </>
  );
}