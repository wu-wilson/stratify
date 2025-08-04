import { useEffect, type ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Spinner from "../spinner/Spinner";
import styles from "./PrivateRoute.module.scss";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!user && !loading) {
      const redirectPath = encodeURIComponent(
        location.pathname + location.search
      );
      navigate(`/login?redirect=${redirectPath}`, { replace: true });
    }
  }, [user, loading]);

  if (loading) {
    return (
      <div className={styles.container}>
        <Spinner size={50} text="Authenticating..." />
      </div>
    );
  }

  return <>{children}</>;
};

export default PrivateRoute;
