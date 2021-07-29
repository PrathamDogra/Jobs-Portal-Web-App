import React, { useEffect, Suspense } from "react";
import { Provider } from "react-redux";
import store from "./store";
import { routes, privateRoutes } from "./routes";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/userAction";
import PrivateRoute from "./components/private-route/PrivateRoute";
import AlertMessage from "./components/AlertMessage";

// import CircularProgress from "@material-ui/core/CircularProgress";

if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());

    // Redirect to login
    window.location.href = "/";
  }
}

function App() {
  return (
    <>
      <AlertMessage />
      <Provider store={store}>
        <Router>
          {routes.map((route, index) => {
            return (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                component={route.component}
              />
            );
          })}

          <Switch>
            {privateRoutes.map((route, index) => {
              return (
                <PrivateRoute
                  key={index}
                  exact
                  path={route.path}
                  component={route.component}
                />
              );
            })}
          </Switch>
        </Router>
      </Provider>
    </>
  );
}

export default App;
