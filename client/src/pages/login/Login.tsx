import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useEffect } from "react";
import { providers } from "./config";
import { useQueryParams } from "../../hooks/query-params/useQueryParams";
import { signInWithRedirect, type AuthProvider } from "firebase/auth";
import { auth } from "../../contexts/auth/config";
import Spinner from "../../components/spinner/Spinner";
import styles from "./Login.module.scss";

const Login = () => {
  const navigate = useNavigate();
  const { getParam } = useQueryParams();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (user && !loading) {
      const redirectTo = getParam("redirect") || "/";
      navigate(redirectTo, { replace: true });
    }
  }, [user, loading]);

  const login = async (provider: AuthProvider) => {
    try {
      await signInWithRedirect(auth, provider);
    } catch (error) {
      navigate("/error", {
        state: { message: "Firebase authentication endpoint failed" },
      });
    }
  };

  if (user && !loading) {
    return (
      <div className={styles.container}>
        <Spinner size={50} text="Redirecting..." />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <span className={styles.title}>
          Welcome to <span>Stratify</span>
        </span>
        <span className={styles.subtext}>
          Organize your work, one layer at a time.
        </span>
        {providers.map((provider) => (
          <button
            key={provider.label}
            onClick={() => login(provider.provider)}
            className={styles.loginButton}
          >
            <provider.icon
              className={`${styles.icon} ${styles[provider.class]}`}
            />
            <span className={styles.label}>Continue with {provider.label}</span>
          </button>
        ))}
        <span className={styles.footer}>
          Stratify will never post on your behalf or access your private data.
        </span>
      </div>
    </div>
  );
};

export default Login;
