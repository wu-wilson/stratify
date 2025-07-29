import { TbFolderOpen } from "react-icons/tb";
import { SUBTEXT } from "./constants";
import styles from "./NoProjects.module.scss";

const NoProjects = () => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <TbFolderOpen className={styles.icon} />
        No Projects Found
      </div>
      <span className={styles.subtext}>{SUBTEXT}</span>
    </div>
  );
};

export default NoProjects;
