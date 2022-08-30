import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

const MyRouter = ({ component: Component, isClosed, ...rest }) => {
  const isLoggedIn = false;

  if (isClosed && !isLoggedIn) {
    return (
      <Redirect
        to={{ pathname: "/login", state: { prevPath: rest.location.pathname } }}
      />
    );
  }

  return <Route {...rest} component={Component} />;
};

export default MyRouter;

MyRouter.defaultProps = {
  isClosed: false,
};

MyRouter.propTypes = {
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
  isClosed: PropTypes.bool,
};
