import React from "react";
import { Redirect } from "react-router-dom";

export const isAuthenticated = () => {
  console.log("Calling isAuthenticated");
  const userToken = sessionStorage.getItem("user-token");
  console.log("Printing userToken: ", userToken);
  return userToken ? true : false;
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
