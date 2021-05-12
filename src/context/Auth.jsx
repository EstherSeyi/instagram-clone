import { createContext, useEffect, useReducer, useContext } from "react";
import jwt from "jsonwebtoken";

import Loader from "../components/loading";

import request from "../lib/request";
import { getToken } from "../utils/storage";
import { DASHBOARD, LOGIN } from "../constants/routes";
import { userReducer } from "./reducers/user";
import {
  setLoading,
  setLoggedIn,
  clearAuthError,
  setAuthError,
  setLoggedOut,
  setUser,
} from "./actions/user";

const initialState = {
  isLoggedIn: false,
  user: null,
  isLoading: false,
  error: "",
  authenticating: true,
};

const AuthContext = createContext();

function AuthProvider(props) {
  const [state, dispatch] = useReducer(userReducer, initialState);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      return dispatch({ type: "LOGGED_OUT" });
    }

    const decoded = jwt.decode(
      token,
      process.env.REACT_APP_ACCESS_TOKEN_SECRET ?? ""
    );

    dispatch(setLoggedIn({ id: decoded.id, username: decoded.username }));
  }, []);

  if (state.authenticating) {
    return <Loader />;
  }

  const login = async (credentials, history) => {
    try {
      dispatch(setLoading(true));
      const { data } = await request.post("v1/login", credentials);
      localStorage.setItem("token", data.token);
      dispatch(setLoading(false));
      const decoded = jwt.decode(
        data.token,
        process.env.REACT_APP_ACCESS_TOKEN_SECRET ?? ""
      );

      dispatch(setLoggedIn({ id: decoded.id, username: decoded.username }));

      history.push(DASHBOARD);
    } catch (error) {
      dispatch(setLoading(false));
      let err;
      if (error.response) {
        err = error.response.data.message;
      } else if (error.request) {
        err = "Problem with request.";
      } else {
        err = error.message;
      }

      dispatch(setAuthError(err));
    }
  };

  const register = async (state, history) => {
    try {
      dispatch(setLoading(true));
      const { data } = await request.post("v1/register", state);
      localStorage.setItem("token", data.token);
      dispatch(setLoading(false));

      const decoded = jwt.decode(
        data.token,
        process.env.REACT_APP_ACCESS_TOKEN_SECRET ?? ""
      );

      dispatch(setLoggedIn({ id: decoded.id, username: decoded.username }));
      history.push(DASHBOARD);
    } catch (error) {
      dispatch(setLoading(false));
      dispatch(setAuthError(error.message));
    }
  };

  const logout = (history) => {
    try {
      localStorage.removeItem("token");
      dispatch(setLoggedOut());
      history.push(LOGIN);
    } catch (error) {
      dispatch(setAuthError(error.message));
    }
  };

  const clearError = () => {
    dispatch(clearAuthError());
  };

  const addUser = (data) => {
    dispatch(setUser(data));
  };

  return (
    <AuthContext.Provider
      value={{ state, login, logout, clearError, register, addUser }}
      {...props}
    />
  );
}

/**
 * useAuth hook
 * @returns Function
 */
const useAuth = () => useContext(AuthContext);
export { AuthProvider, useAuth };
