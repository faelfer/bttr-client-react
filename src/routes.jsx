/* eslint-disable react/prop-types */
import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

import { isAuthenticated } from './services/auth';

import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import ForgotPassword from './pages/ForgotPassword';
import Profile from './pages/Profile';
import RedefinePassword from './pages/RedefinePassword';
import Home from './pages/Home';
import TimeHistoric from './pages/TimeHistoric';
import TimeForm from './pages/TimeForm';
import SkillForm from './pages/SkillForm';
import SkillStatistic from './pages/SkillStatistic';
import NotFound from './pages/NotFound';

function RequireAuth({ children }) {
  const isAuthUser = isAuthenticated();
  // console.log('RequireAuth | token: ', token);

  if (!isAuthUser) {
    // console.log('RequireAuth | if | token: ', token);
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/" replace />;
  }

  return children;
}

const routes = createBrowserRouter([
  {
    path: '/',
    element: <SignIn />,
  },
  {
    path: '/sign-up',
    element: <SignUp />,
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword />,
  },
  {
    path: '/profile',
    element: (
      <RequireAuth>
        <Profile />
      </RequireAuth>
    ),
  },
  {
    path: '/redefine-password',
    element: (
      <RequireAuth>
        <RedefinePassword />
      </RequireAuth>
    ),
  },
  {
    path: '/home',
    element: (
      <RequireAuth>
        <Home />
      </RequireAuth>
    ),
  },
  {
    path: '/skills/create',
    element: (
      <RequireAuth>
        <SkillForm />
      </RequireAuth>
    ),
  },
  {
    path: '/skills/:skillId/update',
    element: (
      <RequireAuth>
        <SkillForm />
      </RequireAuth>
    ),
  },
  {
    path: '/skills/:skillId/statistic',
    element: (
      <RequireAuth>
        <SkillStatistic />
      </RequireAuth>
    ),
  },
  {
    path: '/times',
    element: (
      <RequireAuth>
        <TimeHistoric />
      </RequireAuth>
    ),
  },
  {
    path: '/times/create',
    element: (
      <RequireAuth>
        <TimeForm />
      </RequireAuth>
    ),
  },
  {
    path: '/times/:timeId/update',
    element: (
      <RequireAuth>
        <TimeForm />
      </RequireAuth>
    ),
  },
  {
    path: '*',
    element: (
      <NotFound />
    ),
  },
]);

export default routes;
