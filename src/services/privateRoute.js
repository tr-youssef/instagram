import { Route, Redirect } from "react-router-dom";
import * as ROUTES from "../constants/routes";
import PropTypes from "prop-types";

export default function PrivateRoute({ user, children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        user !== null ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: ROUTES.LOGIN,
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

PrivateRoute.propTypes = {
  user: PropTypes.object,
  children: PropTypes.object.isRequired,
};
