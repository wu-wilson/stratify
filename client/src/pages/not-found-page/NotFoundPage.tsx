import { useNavigate } from "react-router-dom";
import { SUBTEXT, TITLE } from "./constants";
import NotFound from "../../components/not-found/NotFound";
import styles from "./NotFoundPage.module.scss";

const NotFoundPage = () => {
  const navigate = useNavigate();

  const redirect = () => {
    navigate("/");
  };

  return (
    <div className={styles.container}>
      <NotFound
        title={TITLE}
        subtext={SUBTEXT}
        button={{ label: "Go to Home", onClick: redirect }}
      />
    </div>
  );
};

export default NotFoundPage;
