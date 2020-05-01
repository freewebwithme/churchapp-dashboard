import React from "react";
import ReactDOM from "react-dom";
import "typeface-roboto";
import App from "./App";
import { ApolloProvider } from "react-apollo";
import client from "./client";

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
