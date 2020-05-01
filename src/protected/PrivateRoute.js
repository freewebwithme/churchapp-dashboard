import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "../helpers/helper.js";

console.log("isAuthenticated: ", isAuthenticated());
export function PrivateRoute({ children, ...props }) {
  return (
    <Route
      {...props}
      render={({ location }) =>
        isAuthenticated() ? children : <Redirect to="/sign-in" />
      }
    />
  );
}
