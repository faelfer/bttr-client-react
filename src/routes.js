import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import { isAuthenticated } from "./services/auth";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import ForgotPassword from "./pages/ForgotPassword";
import App from "./pages/App";
import CardDetails from "./pages/CardDetails";
import Tasks from "./pages/Tasks";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={SignIn} />
      <Route path="/sign-up" component={SignUp} />
      <Route path="/forgot-password" component={ForgotPassword} />
      <PrivateRoute path="/app" component={App} />
      <PrivateRoute path="/card-details/:cardId" component={CardDetails} />
      {/* <PrivateRoute path="/tasks" component={Tasks} /> */}
      <Route path="*" component={() => <h1 style={{color:"#f4f5f7"}}>Page not found</h1>} />
    </Switch>
  </BrowserRouter>
);

export default Routes;