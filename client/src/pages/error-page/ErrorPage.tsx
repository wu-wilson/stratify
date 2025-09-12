import { useLocation, useNavigate } from "react-router-dom";
import { SUBTEXT } from "./constants";
import Error from "../../components/error/Error";
import styles from "./ErrorPage.module.scss";

const ErrorPage = () => {
  const location = useLocation();
  const errorMsg = (location.state as { message?: string })?.message;

  const navigate = useNavigate();

  const redirect = () => {
    navigate("/", { replace: true });
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Error errorMsg={errorMsg} subtext={SUBTEXT} />
        <button className={styles.home} onClick={redirect}>
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
