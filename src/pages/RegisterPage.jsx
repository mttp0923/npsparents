import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import ErrorMessage from "../components/Error";
import ValidMessage from "../components/Valid";
import { axiosHttpRequest } from "../api/axios";

import npsbuilding from '../assets/npsbuilding.jpeg';
import loadingCircle from "../assets/loadingCircle.gif";


export default function RegisterPage() {
  const { setAuth } = useAuth();

  const userRef = useRef();
  const errRef = useRef();

  const [studID, setStudID] = useState("");
  const [email, setEmail] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/npsParents/password";

  useEffect(() => {
    userRef.current.focus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginData = { task: "checkAccount", studID: studID, offEmail: email };

    setErrMsg("Checking account... <img src='" + {loadingCircle} + "' alt='loading' />");

    try {
      const response = await axiosHttpRequest.post("/parents/", loginData, {
        headers: { "Content-Type": "application/json" },
      });

//      console.log(response);
      
      if (response.data.rem === "success") {

        const session = true;
        const userID = response.data.userID;
        const userEmail = response.data.userEmail;
        const accessToken = response.data.access_token;

        setAuth({ userID, userEmail, session, accessToken });

        setErrMsg(
          <ValidMessage
            message={
              "Found. Please check your email to get the code. Redirecting..."
            }
          />
        );

        const timer = setTimeout(() => {
          navigate(from, { replace: true });
        }, 5000);
        return () => clearTimeout(timer);

      } else {

        setStudID("");
        setEmail("");
        userRef.current.focus();

        setErrMsg(
          <ErrorMessage message={"Student ID and/or Email do not exist."} />
        );

      }
    } catch (error) {

      if (error.response.status === 401) {
        setErrMsg(
          <ErrorMessage
            message={"Your account does not exist in the database."}
          />
        );

        const timer = setTimeout(() => {
          setErrMsg(<ErrorMessage message={"You may try again."} />);
        }, 5000);
        return () => clearTimeout(timer);
      }
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1">
        <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <h2 className="mt-0 text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Check & Generate Password
              </h2>
              <p className="mt-2 text-sm leading-6 text-gray-500">
                A code will be sent to your email after checking your account.
                If your email is not registered yet, please contact the
                Registrar. Go back to{" "}
                <Link
                  to="/npsParents/login"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Login?
                </Link>
              </p>
            </div>

            <div className="mt-5">
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
                        htmlFor="studentID"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Student ID
                      </label>
                      <div className="mt-2">
                        <input
                          id="studentID"
                          name="studentID"
                          type="text"
                          required
                          className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          ref={userRef}
                          onChange={(e) => setStudID(e.target.value)}
                          value={studID}
                        />
                      </div>
                    </div>
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
                          onChange={(e) => setEmail(e.target.value)}
                          value={email}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div>
                      <button
                        type="submit"
                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Send Code and Generate Password
                      </button>
                    </div>
                  </form>
                )}
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