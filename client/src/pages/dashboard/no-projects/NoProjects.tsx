import { TITLE, SUBTEXT } from "./constants";
import NotFound from "../../../components/not-found/NotFound";
import styles from "./NoProjects.module.scss";

const NoProjects = () => {
  return (
    <div className={styles.container}>
      <NotFound title={TITLE} subtext={SUBTEXT} />
    </div>
  );
};

export default NoProjects;
