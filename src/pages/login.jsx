import { useEffect, useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";

import { FirebaseContext } from "../context/firebase";
import { DASHBOARD, SIGN_UP } from "../constants/routes";

import Input from "../components/input";
import Button from "../components/button";

import heroImage from "../images/iphone-with-profile.jpg";
import logo from "../images/logo.png";

export default function Login() {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);
  const [state, setState] = useState({
    email: "",
    password: "",
    error: "",
  });
  const [loading, setLoading] = useState(false);

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
      error: "",
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      await firebase
        .auth()
        .signInWithEmailAndPassword(state.email, state.password);
      history.push(DASHBOARD);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setState((prevState) => ({
        ...prevState,
        error: error.message,
      }));
    }
  };

  const isValid = state.email !== "" && state.password !== "";

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
              value={state.password}
              onChange={handleChange}
            />
            <Button isValid={isValid} loading={loading}>
              Log In
            </Button>
          </form>
          {state.error && (
            <p className="text-10 my-2 text-red text-center">{state.error}</p>
          )}
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
