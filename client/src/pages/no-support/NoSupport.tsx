import { PiDeviceMobileSlashDuotone } from "react-icons/pi";
import styles from "./NoSupport.module.scss";

const NoSupport = () => {
  return (
    <div className={styles.container}>
      <span className={styles.title}>
        No Support
        <PiDeviceMobileSlashDuotone className={styles.icon} />
      </span>
      <span className={styles.subtext}>
        Sorry, we aren't available on small screens yet. Support coming soon!
      </span>
    </div>
  );
};

export default NoSupport;
