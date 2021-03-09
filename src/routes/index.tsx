import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import * as ROUTES from "../constants/routes";

import Loading from "../components/loading";

const Dashboard = lazy(() => import("../pages/dashboard"));
const Login = lazy(() => import("../pages/login"));
const SignUp = lazy(() => import("../pages/signup"));
const Profile = lazy(() => import("../pages/profile"));
const NotFound = lazy(() => import("../pages/not-found"));

const Routes = () => (
  <Router>
    <Suspense fallback={<Loading />}>
      <Switch>
        <Route path={ROUTES.LOGIN} component={Login} />
        <Route path={ROUTES.SIGN_UP} component={SignUp} />
        <Route path={ROUTES.PROFILE} component={Profile} />
        <Route path={ROUTES.DASHBOARD} component={Dashboard} exact />
        <Route path={ROUTES.NOT_FOUND} component={NotFound} />
      </Switch>
    </Suspense>
  </Router>
);

export default Routes;
