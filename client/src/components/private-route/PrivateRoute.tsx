import { useEffect, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/auth/AuthProvider";
import Spinner from "../spinner/Spinner";
import styles from "./PrivateRoute.module.scss";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!user && !loading) {
      navigate("/login", { replace: true });
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
