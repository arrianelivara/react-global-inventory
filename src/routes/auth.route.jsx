import React from "react";
import { Navigate } from "react-router-dom";

const AuthRoute = () => {
  return (
    <Navigate to={{ pathname: "/auth" }} />
  );
};

export default AuthRoute;
