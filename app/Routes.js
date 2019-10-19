import React from "react";
import { Switch, Route } from "react-router";
import routes from "./constants/routes";
import App from "./containers/App";
import HomePage from "./containers/HomePage";
import ValidationSetupPage from "./containers/ValidationSetupPage";

export default () => (
  <App>
    <Switch>
      <Route path={routes.VALIDATION_SETUP} component={ValidationSetupPage} />
      <Route exact={true} path={routes.HOME} component={HomePage} />
    </Switch>
  </App>
);
