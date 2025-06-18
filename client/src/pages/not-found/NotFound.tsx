import { useNavigate } from "react-router-dom";
import { RiArrowLeftDoubleFill, RiHome2Line } from "react-icons/ri";
import { TbError404 } from "react-icons/tb";
import styles from "./NotFound.module.scss";

const NotFound = () => {
  const navigate = useNavigate();

  const redirect = () => {
    navigate("/");
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <span className={styles.title}>
          <TbError404 className={styles.icon} /> Not Found
        </span>
        <span className={styles.subtext}>
          Sorry, we couldn't find the page you're looking for.
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
