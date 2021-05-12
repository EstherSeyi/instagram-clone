import { Redirect, useLocation } from "react-router-dom";

import { useAuth } from "../context/Auth";

const ProtectedRoute = ({ children }) => {
  const { state } = useAuth();

  const location = useLocation();

  return state.id ? (
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
