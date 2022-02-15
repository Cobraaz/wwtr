import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const AdminRoute = ({ component: Component, ...rest }) => {
  const auth = useSelector((state) => state.auth);
  const { token, user } = auth;

  return (
    <Route
      {...rest}
      render={(props) =>
        !token || !user || user.role.toLowerCase() !== "admin" ? (
          <Redirect to="/authentication/login" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default AdminRoute;
