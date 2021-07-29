import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import { routes, privateRoutes } from "./routes";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/userAction";
import PrivateRoute from "./components/private-route/PrivateRoute";
import AlertMessage from "./components/AlertMessage";

if (localStorage.jwtToken) {
 
  const token = localStorage.jwtToken;
  setAuthToken(token);
 
  const decoded = jwt_decode(token);
  
  store.dispatch(setCurrentUser(decoded));
  
  const currentTime = Date.now() / 1000; 
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
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
