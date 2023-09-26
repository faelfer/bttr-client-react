import React from "react";
import { createBrowserRouter } from "react-router-dom";
import { useSelector } from "react-redux";

import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import ForgotPassword from "./pages/ForgotPassword";
import Profile from "./pages/Profile";
import RedefinePassword from "./pages/RedefinePassword";
import Home from "./pages/Home";
import TimeHistoric from "./pages/TimeHistoric";
import TimeForm from "./pages/TimeForm";
import SkillForm from "./pages/SkillForm";
import SkillStatistic from "./pages/SkillStatistic";
import NotFound from "./pages/NotFound";

import { selectToken } from "./services/user/reducer";

interface RequireAuthProps {
  children: React.ReactNode;
}

function RequireAuth(props: RequireAuthProps): React.ReactNode {
  const token = useSelector(selectToken);

  if (token === null) {
    return <SignIn />;
  }

  return props.children;
}

const routes = createBrowserRouter([
  {
    path: "/",
    element: <SignIn />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/profile",
    element: (
      <RequireAuth>
        <Profile />
      </RequireAuth>
    ),
  },
  {
    path: "/redefine-password",
    element: (
      <RequireAuth>
        <RedefinePassword />
      </RequireAuth>
    ),
  },
  {
    path: "/home",
    element: (
      <RequireAuth>
        <Home />
      </RequireAuth>
    ),
  },
  {
    path: "/skills/create",
    element: (
      <RequireAuth>
        <SkillForm />
      </RequireAuth>
    ),
  },
  {
    path: "/skills/:skillId/update",
    element: (
      <RequireAuth>
        <SkillForm />
      </RequireAuth>
    ),
  },
  {
    path: "/skills/:skillId/statistic",
    element: (
      <RequireAuth>
        <SkillStatistic />
      </RequireAuth>
    ),
  },
  {
    path: "/times",
    element: (
      <RequireAuth>
        <TimeHistoric />
      </RequireAuth>
    ),
  },
  {
    path: "/times/create",
    element: (
      <RequireAuth>
        <TimeForm />
      </RequireAuth>
    ),
  },
  {
    path: "/times/:timeId/update",
    element: (
      <RequireAuth>
        <TimeForm />
      </RequireAuth>
    ),
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default routes;
