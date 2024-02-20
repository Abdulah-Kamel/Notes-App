import React from "react";
import { Navigate } from "react-router-dom";

const AuthRoutes = ({ children }) => {
  if (!localStorage.getItem("token")) {
    return children;
  } else {
    return <Navigate to="/" />;
  }
};

export default AuthRoutes;
