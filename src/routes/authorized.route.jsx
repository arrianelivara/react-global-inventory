import React from "react";
import { Route, Navigate } from "react-router-dom";
import { Path } from "../paths"

const AuthorizedRoute = ({ component: Component, ...rest }) => {

  return (
    <Route
      {...rest}
      element={localStorage.getItem("accessToken") ? (
          <Component {...rest} />
        ) : (
          <Navigate
            to={{
              pathname: Path.AUTH
            }}
          />
        )
      }
    />
  );
};

export default AuthorizedRoute;
