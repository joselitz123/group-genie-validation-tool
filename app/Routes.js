import React from 'react';
import { Switch, Route } from 'react-router';
import routes from './constants/routes';
import App from './containers/App';
import HomePage from './containers/HomePage';
import TotalAccessViewPage from './containers/TotalAccessViewPage';
import ValidationSetupPage from './containers/ValidationSetupPage';

export default () => (
  <App>
    <Switch>
      <Route path={routes.VALIDATION_SETUP} component={ValidationSetupPage} />
      <Route exact={true} path={routes.HOME} component={HomePage} />      
      <Route path={routes.FULL_VIEW_ACCESS+"/:user_id"} component={TotalAccessViewPage} />
    </Switch>
  </App>
);
