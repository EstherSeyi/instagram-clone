import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import heroImage from "../images/iphone-with-profile.jpg";
import logo from "../images/logo.png";

export default function Login() {
  const [state, setState] = useState({
    email: "",
    password: "",
    error: {},
  });

  useEffect(() => {
    document.title = "Login - Instagram";

    return () => {
      document.title = "Instagram";
    };
  }, []);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const isValid = state.email !== "" && state.password !== "";

  return (
    <div className="container flex justify-center items-center mx-auto h-screen ">
      <div className="hidden md:block h-618 mr-8">
        <img
          src={heroImage}
          alt="iPhone with Instagram app"
          className="h-full"
        />
      </div>
      <div className="w-full max-w-350">
        <div className="border border-mecury2 bg-white pt-2.5 pb-5 mb-4">
          <h1 className="block mx-auto w-40 mb-3 mt-5">
            <img src={logo} alt="Instagram" />
          </h1>
          <form method="POST" className="w-10/12 mx-auto mt-6 text-14">
            <input
              placeholder="Email address"
              aria-label="Enter your email address"
              name="email"
              type="email"
              onChange={handleChange}
              value={state.email}
              className="w-full bg-alabaster border border-mecury rounded-sm pt-2 pr-0 pb-1.5 pl-2 placeholder-quickSilver mb-2 focus:outline-none focus:border-quickSilver"
            />
            <input
              aria-label="Enter your password"
              placeholder="Password"
              name="password"
              type="password"
              value={state.password}
              onChange={handleChange}
              className="w-full bg-alabaster border border-mecury rounded-sm pt-2 pr-0 pb-1.5 pl-2 placeholder-quickSilver mb-2 focus:outline-none focus:border-quickSilver"
            />
            <button
              type="submit"
              disabled={!isValid}
              className={`bg-azureRadiance w-full text-white rounded py-1   mt-6 ${
                !isValid ? "opacity-30 cursor-not-allowed" : ""
              }`}
            >
              Log In
            </button>
          </form>
        </div>

        <div className="border border-mecury2 py-1 text-center">
          <p className="m-3.5 text-14">
            Don't have an account?{" "}
            <Link to="/signup" className="font-bold text-azureRadiance">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
