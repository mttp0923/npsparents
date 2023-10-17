import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axiosHttpRequest from "../api/axios";

import useAuth from "../hooks/useAuth";
import ErrorMessage from "../components/Error";
import ValidMessage from "../components/Valid";

import loadingCircle from "../assets/loadingCircle.gif";

export default function PasswordPage() {
  const { auth, setAuth } = useAuth();

  const userCode = useRef();
  const userPass1 = useRef();
  const userPass2 = useRef();

  const [code, setCode] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/npsParents/login";

  useEffect(() => {
    if (!auth?.session) {
      navigate(from, { replace: true });
    }
  }, [auth.session]);

  /*
  useEffect(() => {
    userCode.current.focus();
  },[])
  */

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrMsg("Checking account... <img src='" + {loadingCircle} + "' alt='loading' />" );

    const loginData = { code: code, pass1: password1, pass2: password2 };

    if (password1 === password2) {
      try {
        const response = await axiosHttpRequest.post( "/parents/password.php", loginData,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${auth.accessToken}`,
            },
            withCredentials: false,
          }
        );

        if (response.data.rem == "success") {
          const userEmail = response.data.userEmail;
          const accessToken = response.data.access_token;

          setAuth({ userEmail, accessToken });
          setErrMsg( <ValidMessage message={ "Please login. Redirecting... <img src='" + {loadingCircle} + "' alt='loading' />" } /> )

          const timer = setTimeout(() => {
            navigate(from, { replace: true });
          }, 5000);
          return () => clearTimeout(timer);
        
        }

      } catch (error) {
        if (error.response.status === 401) {
          setErrMsg( <ErrorMessage message={"Password is not saved."} /> )
        }
      }

    } else {
      setPassword1("");
      setPassword2("");
      userPass1.current.focus();
      setErrMsg(<ErrorMessage message={"Passwords do not match."} />);
    }
  }

  return (
    <>
      {!auth?.session ? (
        <main>
          <p className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            Session has ended.
          </p>{" "}
        </main>
      ) : (
        <div className="flex min-h-full flex-1">
          <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
            <div className="mx-auto w-full max-w-sm lg:w-96">
              <div>
                <h2 className="mt-0 text-2xl font-bold leading-9 tracking-tight text-gray-900">
                  Provide a Password
                </h2>
              </div>

              <div className="mt-5"> Welcome{" "}
                <span className="font-semibold leading-6 text-indigo-600">
                  {auth.userEmail}
                </span> , check your email to get the code. Provide the code and
                password within 3 minutes. Otherwise, repeat the process again.
                {errMsg}
                <div>
                  {success ? (
                    <>
                      <form method="POST" className="h-48 space-y-6"></form>
                    </>
                  ) : (
                    <form
                      method="POST"
                      onSubmit={handleSubmit}
                      className="mt-5 space-y-6"
                    >
                      <div>
                        <label
                          htmlFor="code"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Code
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            required
                            className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            ref={userCode}
                            onChange={(e) => setCode(e.target.value)}
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="password1"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Password
                        </label>
                        <div className="mt-2">
                          <input
                            type="password"
                            required
                            className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            ref={userPass1}
                            onChange={(e) => setPassword1(e.target.value)}
                          />
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor="password2"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          {" "}
                          Confirm Password{" "}
                        </label>
                        <div className="mt-2">
                          <input
                            type="password"
                            required
                            onChange={(e) => setPassword2(e.target.value)}
                            ref={userPass2}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div>
                        <button
                          type="submit"
                          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          Save
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}