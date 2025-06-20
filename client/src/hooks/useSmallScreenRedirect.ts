import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const useSmallScreenRedirect = (redirectPath = "/no-support") => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const redirect = () => {
      const small = window.innerWidth < 1200;
      const redirected = location.pathname === redirectPath;

      if (small && !redirected) {
        navigate(redirectPath, { replace: true });
      } else if (!small && redirected) {
        navigate("/", { replace: true });
      }
    };

    redirect();

    window.addEventListener("resize", redirect);
    return () => window.removeEventListener("resize", redirect);
  }, [navigate, location.pathname, redirectPath]);
};
