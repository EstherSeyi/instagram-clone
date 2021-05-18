import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

import Button from "../components/button";
import Input from "../components/input";

import { LOGIN } from "../constants/routes";
import { useAuth } from "../context/Auth";

import logo from "../images/logo.png";

export default function SignUp() {
  const history = useHistory();
  const { register, clearError, state: registerState } = useAuth();
  const [state, setState] = useState({
    username: "",
    fullName: "",
    email: "",
    password: "",
    error: "",
  });

  useEffect(() => {
    document.title = "Signup - Instagram";

    return () => {
      document.title = "Instagram";
    };
  }, []);

  const handleChange = ({ target }) => {
    const { value, name } = target;
    clearError();
    setState((prevState) => ({
      ...prevState,
      error: "",
    }));

    setState((prevState) => {
      if (name === "email" || name === "username") {
        return {
          ...prevState,
          [name]: value.toLowerCase().replace(/\s/g, ""),
        };
      } else {
        return {
          ...prevState,
          [name]: value,
        };
      }
    });
  };

  const isValid =
    state.email !== "" &&
    state.password !== "" &&
    state.fullName !== "" &&
    state.username !== "";

  const handleSignup = async (event) => {
    event.preventDefault();
    const { error, ...rest } = state;
    await register({ ...rest }, history);
  };

  return (
    <section className="w-screen h-screen bg-creamish flex justify-center sm:items-center">
      <div className="sm:bg-alabaster  container max-w-400 mt-2.5 py-8 ">
        <div className="sm:bg-white max-w-350 mx-auto py-4 px-2.5 mb-4 sm:border border-mecury">
          <h1 className="block mx-auto w-40 mb-3 mt-5">
            <img src={logo} alt="Instagram" />
          </h1>
          <form
            method="POST"
            className="w-10/12 mx-auto mt-6 text-14"
            onSubmit={handleSignup}
          >
            <Input
              placeholder="Username"
              ariaLabel="Enter a username of your choice"
              name="username"
              type="text"
              onChange={handleChange}
              value={state.username}
            />
            <Input
              placeholder="Full name"
              ariaLabel="Enter your full name"
              name="fullName"
              type="text"
              onChange={handleChange}
              value={state.fullName}
            />
            <Input
              placeholder="Email address"
              ariaLabel="Enter your email address"
              name="email"
              type="text"
              onChange={handleChange}
              value={state.email}
            />
            <Input
              ariaLabel="Enter your password"
              placeholder="Password"
              name="password"
              type="password"
              onChange={handleChange}
              value={state.password}
            />

            <Button isValid={isValid} loading={registerState.isLoading}>
              Sign Up
            </Button>
          </form>

          {state.error ? (
            <p className="text-10 my-2 text-red text-center px-4">
              {state.error}
            </p>
          ) : registerState.error ? (
            <p className="text-10 my-2 text-red text-center px-4">
              {registerState.error}
            </p>
          ) : null}
        </div>
        <div className="sm:border border-mecury2 sm:bg-white py-1 text-center max-w-350 mx-auto">
          <p className="m-3.5 text-14">
            Have an account?{" "}
            <Link to={LOGIN} className="font-bold text-azureRadiance">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
