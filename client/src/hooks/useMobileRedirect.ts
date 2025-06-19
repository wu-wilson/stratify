import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const useMobileRedirect = (redirectPath = "/no-mobile") => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const redirect = () => {
      const mobile = window.innerWidth < 1200;
      const redirected = location.pathname === redirectPath;

      if (mobile && !redirected) {
        navigate(redirectPath, { replace: true });
      } else if (!mobile && redirected) {
        navigate("/", { replace: true });
      }
    };

    redirect();

    window.addEventListener("resize", redirect);
    return () => window.removeEventListener("resize", redirect);
  }, [navigate, location.pathname, redirectPath]);
};
