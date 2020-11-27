import * as React from "react";
import { connect } from "react-redux";
import { Redirect, Route, RouteComponentProps, useLocation } from "react-router-dom";
import State from "../interfaces/State";
import Loader from "./loader";
import { checkAuth } from "../redux/actions/auth";

interface Props {
  Component: any;
  isAuth: boolean;
  loading: boolean;
  path: string;
  checkAuth: () => void;
}

const AuthRoute: React.FC<Props> = ({ Component, isAuth, loading, path, checkAuth }) => {
  const location = useLocation();

  React.useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (loading) {
    return <Loader fullScreen />;
  }

  return (
    <Route
      path={path}
      exact
      render={(props: RouteComponentProps) =>
        !loading && isAuth ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/login", state: { requestedPath: location.pathname } }} />
        )
      }
    />
  );
};

const mapToProps = (state: State) => ({
  isAuth: state.auth.isAuth,
  loading: state.auth.loading,
});

export default connect(mapToProps, { checkAuth })(AuthRoute);
