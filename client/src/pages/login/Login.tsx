import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../contexts/auth/AuthProvider";
import Spinner from "../../components/spinner/Spinner";
import styles from "./Login.module.scss";

const Login = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [registered, setRegistered] = useState<boolean | null>(null);

  if (!user && loading) {
    return <Spinner size={50} text="Authenticating..." />;
  }
  if (user && !loading && registered === null) {
    return <Spinner size={50} text="Registering..." />;
  }
  return <div className={styles["container"]}>Login</div>;
};

export default Login;
