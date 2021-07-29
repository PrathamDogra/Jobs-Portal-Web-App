import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = useSelector(
    (state) => state.authReducer.isAuthenticated
  );
  const [auth, setAuth] = useState(isAuthenticated);
  useEffect(() => {
    if (isAuthenticated) {
      setAuth(isAuthenticated);
    } else {
      setAuth(isAuthenticated);
    }
  }, [isAuthenticated]);

  return (
    <Route
      {...rest}
      render={(props) =>
        auth === true ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

export default PrivateRoute;
