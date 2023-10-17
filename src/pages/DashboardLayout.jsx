import { useEffect } from "react";
import { useLocation, useNavigate, Outlet } from "react-router-dom";

import HeaderNavigation from "../components/HeaderNavigation";
import useAuth from "../hooks/useAuth";

export default function DashboardLayout() {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/npsParents/login";

  const user = localStorage.getItem('user');

  useEffect(() => {
    if (!user || user === 'undefined') {
        navigate("/npsParents/login");
    }

    /*
    const timer = setTimeout(() => {
      setAuth({})
      navigate(from, { replace: true });
    }, 300000);
    return () => clearTimeout(timer);
    */

  },[]);

  return (
    <>
      <HeaderNavigation />
      <Outlet /> 

      {/* !persist ? <Outlet /> : isLoading ? <p>Loading...</p> : <Outlet /> */}
    </>
  );
}
