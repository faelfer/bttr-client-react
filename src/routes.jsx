import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import { isAuthenticated } from './services/auth';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import ForgotPassword from './pages/ForgotPassword';
import Home from './pages/Home';
import TimeHistoric from './pages/TimeHistoric';
import TimeForm from './pages/TimeForm';
import SkillForm from './pages/SkillForm';
import SkillStatistic from './pages/SkillStatistic';
import Profile from './pages/Profile';
import RedefinePassword from './pages/RedefinePassword';

function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) => (isAuthenticated() ? (
        children
      ) : (
        <Redirect
          to={{
            pathname: '/',
            state: { from: location },
          }}
        />
      ))}
    />
  );
}

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={SignIn} />
        <Route path="/sign-up" component={SignUp} />
        <Route path="/forgot-password" component={ForgotPassword} />
        <PrivateRoute path="/home" component={Home} />
        <PrivateRoute path="/skills/create" component={SkillForm} />
        <PrivateRoute path="/skills/:skillId/update" component={SkillForm} />
        <PrivateRoute path="/skills/:skillId/statistic" component={SkillStatistic} />
        <PrivateRoute path="/times" component={TimeHistoric} />
        <PrivateRoute path="/times/create" component={TimeForm} />
        <PrivateRoute path="/times/:timeId/update" component={TimeForm} />
        <PrivateRoute path="/profile" component={Profile} />
        <PrivateRoute path="/redefine-password" component={RedefinePassword} />
        <Route
          path="*"
          component={() => (
            <h1 style={{ display: 'flex', justifyContent: 'center', color: '#f4f5f7' }}>
              Página não foi encontrada
            </h1>
          )}
        />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
