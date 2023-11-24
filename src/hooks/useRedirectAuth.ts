import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import { type RootState } from "../services/createStore";

const useRedirectAuth = (): void => {
  const { token } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const redirectToAuthRoute = (): void => {
      if (token !== null) {
        navigate("/home", { replace: true });
      }
    };
    redirectToAuthRoute();
  }, [location]);
};

export default useRedirectAuth;
