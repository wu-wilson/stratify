import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/auth/AuthProvider";
import Spinner from "../../components/spinner/Spinner";
import styles from "./Login.module.scss";

const Login = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  if (!user && loading) {
    return <Spinner size={50} text="Authenticating..." />;
  }
  return <div className={styles["container"]}>Login</div>;
};

export default Login;
