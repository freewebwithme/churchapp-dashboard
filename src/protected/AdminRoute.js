import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated, isAdmin } from "../helpers/helper.js";

export function AdminRoute({ children, ...props }) {
  return (
    <Route
      {...props}
      render={({ location }) =>
        isAuthenticated() && isAdmin() ? children : <Redirect to="/sign-in" />
      }
    />
  );
}
