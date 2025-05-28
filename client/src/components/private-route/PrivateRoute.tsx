import { useEffect, useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/auth/AuthProvider";
import { isUserRegistered } from "../../services/accounts";
import Spinner from "../spinner/Spinner";
import styles from "./PrivateRoute.module.scss";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [registered, setRegistered] = useState<boolean | null>(null);

  useEffect(() => {
    if ((!user && !loading) || registered === false) {
      navigate("/login", { replace: true });
    }
  }, [user, loading, registered]);

  const setRegistrationStatus = async (uid: string) => {
    const userRegistered = await isUserRegistered(uid);
    setRegistered(userRegistered);
  };

  useEffect(() => {
    if (user && !loading) {
      setRegistrationStatus(user.uid);
    }
  }, [user, loading]);

  if (loading || registered === null) {
    return (
      <div className={styles["container"]}>
        <Spinner size={50} text="Authenticating..." />
      </div>
    );
  }

  return <>{children}</>;
};

export default PrivateRoute;
