import React from 'react';
import {
  Route,
  Redirect
} from "react-router-dom";


const PrivateRoute = ({ component: Component, authenticated, currentUser, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      authenticated ? (
        currentUser ? (
          currentUser.authorities[0].authority === "ADMIN" ? (
            <Component {...rest} {...props} />
          ) : (
              <Redirect
                to={{
                  pathname: '/',
                  state: { from: props.location }
                }}
              />
            )
        ) : null
      ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { from: props.location }
            }}
          />
        )
    }
  />
);

export default PrivateRoute