import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const useRedirectAuth = () => {
  const { token } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    function redirectToAuthRoute() {
      if (token !== null) {
        navigate("/home", { replace: true });
      }
    }
    redirectToAuthRoute();
  }, [location]);
};

export default useRedirectAuth;
