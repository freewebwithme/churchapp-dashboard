import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";

import "assets/scss/material-dashboard-pro-react.scss?v=1.8.0";
import "assets/vendor/nucleo/css/nucleo.css";
import "assets/vendor/font-awesome/css/font-awesome.min.css";
import "assets/scss/argon-design-system-react.scss?v1.1.";
import "assets/css/fonts.css";

import SignIn from "./layouts/SignIn";
import SignUp from "./layouts/SignUp";
import Landing from "./layouts/Landing";
import Dashboard from "./layouts/Admin";
import { PrivateRoute } from "./protected/PrivateRoute";

const hist = createBrowserHistory();
function App() {
  return (
    <BrowserRouter history={hist}>
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/sign-in" exact component={SignIn} />
        <Route path="/sign-up" exact component={SignUp} />
        <PrivateRoute path="/dashboard">
          <Dashboard />
        </PrivateRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
