import { useEffect, useRef, useState } from "react";
import useAuth from "../hooks/useAuth";
import { Link, useNavigate, useLocation } from "react-router-dom";
import ErrorMessage from "../components/Error";
import ValidMessage from "../components/Valid";
import { axiosHttpRequest } from "../api/axios";

import npsbuilding from '../assets/npsbuilding.jpeg';

export default function LoginPage() {
  const { auth, setAuth, persist, setPersist } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/npsParents/";

  const userRef = useRef();
  const passRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState(auth?.userEmail || '');
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    !user ? userRef.current.focus() : passRef.current.focus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginData = { email: user, password: pwd };

    setErrMsg("Checking account...");

    try {
      const response = await axiosHttpRequest.post("parents/login.php", loginData );

      if (response.data.rem == "success") {
        const session = true;
        const userID = response.data.userID;
        const userEmail = response.data.userEmail;
        const accessToken = response.data.access_token;
        const refreshToken = response.data.refresh_token;

        setAuth({ session, userEmail, accessToken });

        localStorage.setItem('user', userID)
        localStorage.setItem('tokenLocal', accessToken)
        localStorage.setItem('refreshToken', refreshToken)

        setErrMsg(<ValidMessage message={"Successful. Redirecting..."} />);
        
        const timer = setTimeout(() => {
            navigate(from, { replace: true });
        }, 2000);
  
        return () => clearTimeout(timer);

      } else {
        setUser("");
        setPwd("");
        userRef.current.focus();

        setErrMsg(
          <ErrorMessage message={ response.data.rem + " If you have an account in the NPS system, you may generate a password instead."}
          />
        );

        const timer = setTimeout(() => {
          setErrMsg(<ErrorMessage message={"Please login again."} />);
        }, 3000);

        return () => clearTimeout(timer);
      }
    } catch (error) {
      setErrMsg(<ErrorMessage message={error.response.statusText} />);
    }
    
  };

  const togglePersist = () => {
    setPersist((prev) => !prev);
  };

  useEffect(() => {
    localStorage.setItem("persist", persist);
  }, [persist]);

  return (
    <>
      <div className="flex min-h-full flex-1">
        <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <h2 className="mt-0 text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Sign in to your account
              </h2>
              <p className="mt-2 text-sm leading-6 text-gray-500">
                No account yet?{" "}
                <Link
                  to="/npsParents/register"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Generate a password.
                </Link>
              </p>
            </div>

            <div className="mt-5">
              {errMsg}
              <div>
                <form
                  action="#"
                  method="POST"
                  onSubmit={handleSubmit}
                  className="mt-5 space-y-6"
                >
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Email address
                    </label>
                    <div className="mt-2">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        ref={userRef}
                        onChange={(e) => setUser(e.target.value)}
                        value={user}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Password
                    </label>
                    <div className="mt-2">
                      <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        ref={passRef}
                        onChange={(e) => setPwd(e.target.value)}
                        value={pwd}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        onChange={togglePersist}
                        checked={persist}
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <label
                        htmlFor="remember-me"
                        className="ml-3 block text-sm leading-6 text-gray-900"
                      >
                        Remember me
                      </label>
                    </div>

                    <div className="text-sm leading-6">
                      <Link
                        to="/npsParents/register"
                        className="font-semibold text-indigo-600 hover:text-indigo-500"
                      >
                        Forgot password? Generate.
                      </Link>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-sm leading-6"></div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Sign in
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="relative hidden w-0 flex-1 lg:block">
          <img
            className="absolute inset-0 h-300 w-full object-cover"
            src={npsbuilding} 
            alt=""
          />
        </div>
      </div>
    </>
  );
}
