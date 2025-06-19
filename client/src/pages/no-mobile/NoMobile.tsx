import { PiDeviceMobileSlashDuotone } from "react-icons/pi";
import styles from "./NoMobile.module.scss";

const NoMobile = () => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <span className={styles.title}>
          No Mobile Support
          <PiDeviceMobileSlashDuotone className={styles.icon} />
        </span>
        <span className={styles.subtext}>
          Sorry, we aren't available on mobile yet. Support coming soon!
        </span>
      </div>
    </div>
  );
};

export default NoMobile;
