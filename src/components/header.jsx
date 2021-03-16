import { Link, useHistory } from "react-router-dom";
import { useContext, useState, useEffect } from "react";

import { FirebaseContext } from "../context/firebase";
import { DASHBOARD, LOGIN, SIGN_UP, PROFILE } from "../constants/routes";

import logo from "../images/logo.png";
import avatar from "../images/avatars/raphael.jpg";

export default function Header() {
  const { firebase } = useContext(FirebaseContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        setIsLoggedIn(false);
      } else {
        setIsLoggedIn(true);
      }
    });
  }, [firebase]);

  return (
    <header className="py-3 border-b border-mecury2 bg-white mb-8">
      <div className="w-10/12 max-w-screen-lg mx-auto flex justify-between">
        <Link to={DASHBOARD} className="block focus:outline-none">
          <h1 className="w-40 ">
            <img src={logo} alt="Instagram" className="h-30" />
          </h1>
        </Link>
        {isLoggedIn ? (
          <Avatar />
        ) : (
          <div>
            <Link
              to={LOGIN}
              className="bg-azureRadiance py-1.5 px-2 mr-3 text-white font-bold rounded focus:opacity-30"
            >
              Log In
            </Link>
            <Link
              to={SIGN_UP}
              className="text-azureRadiance font-bold focus:opacity-30"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}

const Avatar = () => {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);
  const [clicked, setClicked] = useState(false);
  const handleClick = () => {
    setClicked((prevState) => !prevState);
  };

  const handleLogout = async () => {
    await firebase.auth().signOut();
    history.push(LOGIN);
  };

  return (
    <>
      <div className="relative">
        <img
          onClick={handleClick}
          src={avatar}
          alt="User Avatar"
          className={`block rounded-full h-30 cursor-pointer ${
            clicked ? "border border-dark" : ""
          }  p-0.5`}
        />
        <div
          className={`absolute bg-white w-48 -right-2.5 shadow ${
            !clicked ? "hidden" : ""
          }`}
        >
          <ul className="p-2.5 ">
            <li className="py-1">
              <Link to={PROFILE}>Profile</Link>
            </li>
            <li className="py-1">
              <Link to={PROFILE}>Saved</Link>
            </li>
            <li className="py-1">
              <Link to={PROFILE}>Settings</Link>
            </li>
            <li className="py-1 ">
              <Link to={PROFILE}>Switch Account</Link>
            </li>
          </ul>
          <ul className="border-t border-mecury">
            <li className="p-2.5 cursor-pointer" onClick={handleLogout}>
              Log Out
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
