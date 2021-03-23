import { Link, useHistory } from "react-router-dom";
import { useState } from "react";

import { DASHBOARD, LOGIN, SIGN_UP, PROFILE } from "../constants/routes";
import { useAuth } from "../context/user";
import useUser from "../hooks/useUser";

import logo from "../images/logo.png";

import Profile from "./icons/profile";
import Bookmark from "./icons/bookmark";
import Setting from "./icons/setting";
import Chat from "./icons/chat";
import Home from "./icons/home";

export default function Header() {
  const { auth } = useAuth();

  return (
    <header className="py-3 border-b border-mecury2 bg-white mb-8">
      <div className="w-10/12 max-w-screen-lg mx-auto flex justify-between">
        <Link to={DASHBOARD} className="block focus:outline-none">
          <h1 className="w-40 ">
            <img src={logo} alt="Instagram" className="h-30" />
          </h1>
        </Link>
        {auth.isLoggedIn ? (
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
  const { logout, auth } = useAuth();
  const { user } = useUser();
  const [clicked, setClicked] = useState(false);
  const handleClick = () => {
    setClicked((prevState) => !prevState);
  };

  const handleLogout = async () => {
    await logout(history);
  };

  return (
    <>
      <div className="flex">
        <Link to={DASHBOARD} arial-label="Home" className="hidden sm:block">
          <Home />
        </Link>
        <Link to={DASHBOARD} arial-label="Home" className="hidden sm:block">
          <Chat />
        </Link>
        <div className="relative">
          <img
            onClick={handleClick}
            src={`${
              auth.user.photoURL ??
              `${process.env.PUBLIC_URL}/assets/images/avatars/${user.username}.jpg`
            }`}
            alt={`${user.username} avatar`}
            className={`block rounded-full h-8 w-8 cursor-pointer ${
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
                <Profile /> <Link to={`/p/${user.username}`}>Profile</Link>
              </li>
              <li className="py-1">
                <Bookmark />
                <Link to={PROFILE}>Saved</Link>
              </li>
              <li className="py-1">
                <Setting />
                <Link to={PROFILE}>Settings</Link>
              </li>
            </ul>
            <ul className="border-t border-mecury">
              <li className="p-2.5 cursor-pointer" onClick={handleLogout}>
                Log Out
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
