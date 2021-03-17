import { createContext, useContext, useReducer, useEffect } from "react";

import { FirebaseContext } from "./firebase";
import Loader from "../components/loading";

import { userReducer } from "./reducers/user";
import {
  setLoading,
  setLoggedIn,
  clearAuthError,
  setAuthError,
  setLoggedOut,
} from "./actions/user";
import { doesUsernameExist } from "../services/firebase";
import { DASHBOARD, LOGIN } from "../constants/routes";

const initialState = {
  isLoggedIn: false,
  user: null,
  isLoading: false,
  error: "",
  authenticating: true,
};

const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const { firebase } = useContext(FirebaseContext);
  const [state, dispatch] = useReducer(userReducer, initialState);

  useEffect(() => {
    const checkAuthStatus = firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        localStorage.removeItem("authUser");
        return dispatch(setLoggedOut());
      } else {
        localStorage.setItem("authUser", JSON.stringify(user));
        dispatch(setLoggedIn(user));
      }
    });

    return () => checkAuthStatus();
  }, [firebase]);

  if (state.authenticating) {
    return <Loader />;
  }

  const login = async (state, history) => {
    try {
      dispatch(setLoading(true));
      await firebase
        .auth()
        .signInWithEmailAndPassword(state.email, state.password);
      dispatch(setLoading(false));
      history.push(DASHBOARD);
      dispatch(setLoggedIn({}));
    } catch (error) {
      dispatch(setLoading(false));
      dispatch(setAuthError(error.message));
    }
  };

  const register = async (state, history) => {
    try {
      dispatch(setLoading(true));
      const usernameExists = await doesUsernameExist(state.username);

      if (usernameExists.length) {
        dispatch(setLoading(false));
        dispatch(setAuthError("Username already exists!"));
        return;
      }

      const result = await firebase
        .auth()
        .createUserWithEmailAndPassword(state.email, state.password);
      await result.user.updateProfile({
        displayName: state.username,
      });

      firebase.firestore().collection("users").add({
        userId: result.user.uid,
        displayName: state.username.toLocaleLowerCase(),
        username: state.username,
        fullName: state.fullname,
        emailAddress: state.email.toLocaleLowerCase(),
        following: [],
        followers: [],
        dateCreated: Date.now(),
      });

      dispatch(setLoading(false));

      history.push(DASHBOARD);
    } catch (error) {
      dispatch(setLoading(false));
      dispatch(setAuthError(error.message));
    }
  };

  const logout = async (history) => {
    await firebase.auth().signOut();
    history.push(LOGIN);
  };

  const clearError = () => {
    dispatch(clearAuthError());
  };

  return (
    <UserContext.Provider
      value={{ auth: state, login, logout, clearError, register }}
    >
      {children}
    </UserContext.Provider>
  );
};

/**
 * useAuth hook
 * @returns Function
 */
const useAuth = () => useContext(UserContext);
export { UserProvider, useAuth };
