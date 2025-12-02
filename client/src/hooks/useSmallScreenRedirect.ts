import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const DISABLED = true;

export const useSmallScreenRedirect = (redirectPath = "/no-support") => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const redirect = (): void => {
      if (DISABLED) {
        return;
      }

      const small = window.innerWidth < 1200;
      const redirected = location.pathname === redirectPath;

      if (small && !redirected) {
        navigate(redirectPath, { replace: true, state: { from: location } });
      } else if (!small && redirected) {
        const previous = location.state?.from;
        navigate(previous || "/", { replace: true });
      }
    };

    redirect();

    window.addEventListener("resize", redirect);
    return () => window.removeEventListener("resize", redirect);
  }, [navigate, location.pathname, redirectPath]);
};
