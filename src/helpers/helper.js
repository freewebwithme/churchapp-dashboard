import React from "react";
import { Redirect } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

export const isAuthenticated = () => {
  console.log("Calling isAuthenticated");
  const userToken = sessionStorage.getItem("user-token");
  console.log("Printing userToken: ", userToken);
  return userToken ? true : false;
};

export const isAdmin = () => {
  const savedUser = getUserFromSession();
  return savedUser.admin;
};

export const getUserFromSession = () => {
  const savedUser = sessionStorage.getItem("user");
  if (savedUser) {
    return JSON.parse(savedUser);
  } else {
    return <Redirect to="/sign-in" />;
  }
};

export const setUserToSession = (user) => {
  sessionStorage.setItem("user", JSON.stringify(user));
};

export const removeUserFromSession = () => {
  sessionStorage.removeItem("user");
  sessionStorage.removeItem("user-token");
};

// Sort array by order
export const sortArray = (array) => {
  array.sort((a, b) => a.order - b.order);
  return array;
};

export const getFileExtension = (file) => {
  let extensions = ["jpg", "jpeg", "png"];
  let extension = file.name.split(".").pop();
  if (extensions.indexOf(extension) === -1) {
    return null;
  } else {
    return extension;
  }
};

export const isNumber = (n) => {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

export const displayErrorMessageForGraphQL = (message) => {
  let errorMessages = message.split(": ");
  if (errorMessages.length >= 3) {
    return errorMessages[1] + ": " + errorMessages[2];
  }
  return errorMessages[1];
};

export const hasChurch = (user) => {
  return user.church ? true : false;
};

export const validateLength = (prop, minLength, maxLength) => {
  if (prop.length < minLength || prop.length > maxLength) {
    return false;
  } else {
    return true;
  }
};

export function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://www.churchapp.dev/">
        ChurchApp
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// This function is used to call default or saved value from object
// to display in the form
export const initPropValue = (obj, prop) => {
  if (obj === null || obj === undefined) {
    return "";
  } else if (obj[prop] === null) {
    return "";
  } else {
    return obj[prop];
  }
};

export const validateEmail = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};
