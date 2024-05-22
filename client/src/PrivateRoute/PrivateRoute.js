import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../Custom Hook/useAuth";

const PrivateRoute = () => {
  // const isAuthenticated = useAuth();
  const token = localStorage.getItem("access_token");
  console.log("check", token);

  return token ? <Outlet /> : <Navigate to="/sign-in" />;
};

export default PrivateRoute;
