import { useNavigate } from "react-router-dom";
import styles from "./NotFound.module.scss";

const NotFound = () => {
  const navigate = useNavigate();

  const redirect = () => {
    navigate("/");
  };

  return (
    <div className={styles.container}>
      <span className={styles.title}>
        Not Found <span className={styles.highlight}>404</span>
      </span>
      <span className={styles.subtext}>
        Sorry, the page you're looking for does not exist or has been moved.
      </span>
      <button className={styles.home} onClick={redirect}>
        Go Home
      </button>
    </div>
  );
};

export default NotFound;
