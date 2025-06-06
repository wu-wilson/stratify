import { RiHome2Line, RiArrowLeftDoubleFill } from "react-icons/ri";
import { useLocation, useNavigate } from "react-router-dom";
import { SUBTEXT } from "./util";
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
    <div className={styles["container"]}>
      <div className={styles["card"]}>
        <Error errorMsg={errorMsg} subtext={SUBTEXT} />
        <button className={styles["home-btn"]} onClick={redirect}>
          <RiArrowLeftDoubleFill /> Home
          <RiHome2Line className={styles["icon"]} />
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
