import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ Children }) => {
  // if (localStorage.getItem("token")) {
  //   return Children;
  // } else {
  //   return <Navigate to="/login" />;
  // }
};

export default ProtectedRoutes;
