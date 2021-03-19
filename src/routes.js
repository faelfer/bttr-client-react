import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import { isAuthenticated } from "./services/auth";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import TimeTable from "./pages/TimeTable";
import AbiliityForm from "./pages/AbiliityForm";

function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated() ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={SignIn} />
      <Route path="/sign-up" component={SignUp} />
      <Route path="/forgot-password" component={ForgotPassword} />
      <PrivateRoute path="/home" component={Home} />
      <PrivateRoute path="/abiliity" component={AbiliityForm} />
      <PrivateRoute path="/abiliity-detail/:abiliityId" component={AbiliityForm} />
      <PrivateRoute path="/time-table" component={TimeTable} />
      <PrivateRoute path="/time-table-by-abiliity/:abiliityId" component={TimeTable} />
      {/* <PrivateRoute path="/time" component={TimeForm} />
      <PrivateRoute path="/time/:timeId" component={TimeForm} /> */}
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