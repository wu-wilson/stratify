import { TbShieldLockFilled } from "react-icons/tb";
import { SUBTEXT } from "./constants";
import styles from "./NoAccess.module.scss";

const NoAccess = () => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <TbShieldLockFilled className={styles.icon} />
        Access Denied
      </div>
      <span className={styles.subtext}>{SUBTEXT}</span>
    </div>
  );
};

export default NoAccess;
