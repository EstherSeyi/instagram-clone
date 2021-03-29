import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import * as ROUTES from "../constants/routes";

import Loading from "../components/loading";

import PrivateRoutes from "../helpers/protectedRoutes";
import { ModalProvider } from "../context/modal";
import { ActionProvider } from "../context/actions";

import Modal from "../components/modal";

const Dashboard = lazy(() => import("../pages/dashboard"));
const Login = lazy(() => import("../pages/login"));
const SignUp = lazy(() => import("../pages/signup"));
const Profile = lazy(() => import("../pages/profile"));
const NotFound = lazy(() => import("../pages/not-found"));

const Routes = () => {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <ActionProvider>
          <ModalProvider>
            <Modal />
            <Switch>
              <Route path={ROUTES.LOGIN} component={Login} />
              <Route path={ROUTES.SIGN_UP} component={SignUp} />
              <Route path={ROUTES.PROFILE} component={Profile} />

              <PrivateRoutes path={ROUTES.DASHBOARD} exact={true}>
                <Dashboard />
              </PrivateRoutes>

              <Route component={NotFound} />
            </Switch>
          </ModalProvider>
        </ActionProvider>
      </Suspense>
    </Router>
  );
};

export default Routes;
