import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../Custom Hook/useAuth";

const PrivateRoute = () => {
  const token = localStorage.getItem("access_token");

  return token ? <Outlet /> : <Navigate to="/sign-in" />;
};

export default PrivateRoute;
