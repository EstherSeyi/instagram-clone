import { Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Loading from "../components/loading";
import NotFound from "../components/not-found";

const Routes = () => (
  <Router>
    <Suspense fallback={<Loading />}>
      <Switch>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Suspense>
  </Router>
);

export default Routes;
