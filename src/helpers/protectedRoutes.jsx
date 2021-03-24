import { Redirect, useLocation } from "react-router-dom";

import { useAuth } from "../context/user";

const ProtectedRoute = ({ children }) => {
  const { auth } = useAuth();

  const location = useLocation();

  return !auth.user ? (
    <Redirect
      to={{
        pathname: "/login",
        state: { url: location.pathname },
      }}
    />
  ) : (
    <>{children}</>
  );
};

export default ProtectedRoute;
