import { useNavigate } from "react-router-dom";
import { RiArrowLeftDoubleFill, RiHome2Line } from "react-icons/ri";
import styles from "./NotFound.module.scss";

const NotFound = () => {
  const navigate = useNavigate();

  const redirect = () => {
    navigate("/");
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <span className={styles.title}>404</span>
        <span className={styles.subtitle}>Not Found</span>
        <span className={styles.subtext}>
          Sorry, the page you're looking for does not exist or has been moved.
        </span>
        <button className={styles.home} onClick={redirect}>
          <RiArrowLeftDoubleFill /> Home
          <RiHome2Line className={styles.icon} />
        </button>
      </div>
    </div>
  );
};

export default NotFound;
