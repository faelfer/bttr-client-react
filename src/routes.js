import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import { isAuthenticated } from "./services/auth";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import SkillDetails from "./pages/SkillDetails";
import SkillCreate from "./pages/SkillCreate";

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
      <PrivateRoute path="/home" component={Home} />
      <PrivateRoute path="/abiliity/:abiliityId" component={SkillDetails} />
      <PrivateRoute path="/abiliity" component={SkillCreate} />
      <Route 
        path="*" 
        component={() => (
          <h1 style={{ display: "flex", justifyContent: "center", color:"#f4f5f7" }}>
            Página não foi encontrada
          </h1>
        )} 
      />
    </Switch>
  </BrowserRouter>
);

export default Routes;