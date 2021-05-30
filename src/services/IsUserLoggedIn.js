import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

export default function IsUserLoggedIn({
  user,
  loggedInPath,
  children,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        user == null ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: loggedInPath,
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

IsUserLoggedIn.propTypes = {
  user: PropTypes.object,
  loggedInPath: PropTypes.string.isRequired,
  children: PropTypes.object.isRequired,
};
