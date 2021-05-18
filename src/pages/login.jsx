import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import { SIGN_UP } from "../constants/routes";
import { useAuth } from "../context/Auth";

import Input from "../components/input";
import Button from "../components/button";

import heroImage from "../images/iphone-with-profile.jpg";
import logo from "../images/logo.png";

export default function Login() {
  const history = useHistory();
  const { state: auth, login, clearError } = useAuth();
  const [state, setState] = useState({
    username: "",
    password: "",
    error: "",
  });

  useEffect(() => {
    document.title = "Login - Instagram";

    return () => {
      document.title = "Instagram";
    };
  }, []);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    clearError();
    setState((prevState) => ({
      ...prevState,
      error: "",
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await login(
      {
        password: state.password,
        username: state.username,
      },
      history
    );
  };

  const isValid = state.password !== "" && state.username !== "";

  return (
    <section className="container flex justify-center items-center mx-auto h-screen ">
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

          <form
            method="POST"
            className="w-10/12 mx-auto mt-6 text-14"
            onSubmit={handleSubmit}
          >
            <Input
              placeholder="Username"
              ariaLabel="Enter your username"
              name="username"
              type="text"
              onChange={handleChange}
              value={state.username}
            />
            <Input
              ariaLabel="Enter your password"
              placeholder="Password"
              name="password"
              type="password"
              value={state.password}
              onChange={handleChange}
            />
            <Button isValid={isValid} loading={auth.isLoading}>
              Log In
            </Button>
          </form>
          {state.error ? (
            <p className="text-10 my-2 text-red text-center px-4">
              {state.error}
            </p>
          ) : auth.error ? (
            <p className="text-10 my-2 text-red text-center px-4">
              {auth.error}
            </p>
          ) : null}
        </div>

        <div className="border border-mecury2 py-1 text-center">
          <p className="m-3.5 text-14">
            Don't have an account?{" "}
            <Link to={SIGN_UP} className="font-bold text-azureRadiance">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
