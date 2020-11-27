import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./styles/index.css";
import Loader from "./components/loader";
import AuthRoute from "./components/AuthRoute";

const ProfilePage = lazy(() => import("./pages/profile"));
const LoginPage = lazy(() => import("./pages/auth/Login"));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Suspense fallback={<Loader fullScreen />}>
          <Switch>
            <Route path="/auth/login" exact component={LoginPage} />
            <AuthRoute path="/:username" Component={ProfilePage} />
          </Switch>
        </Suspense>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("app-mount"),
);
