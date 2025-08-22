import { useEffect, useState } from "react";
import { ICON_MAP } from "./constants";
import { type SnackbarType } from "./types";
import styles from "./Snackbar.module.scss";

const Snackbar = ({
  message,
  type = "info",
  onDismiss,
}: {
  message: string;
  type?: SnackbarType;
  onDismiss?: () => void;
}) => {
  const Icon = ICON_MAP[type];
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);

    const timer = setTimeout(() => {
      setVisible(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, [message]);

  const onTransitionEnd = () => {
    if (!visible && onDismiss) {
      onDismiss();
    }
  };

  return (
    <div
      className={`${styles.container} ${visible ? styles.show : styles.hide}`}
      onTransitionEnd={onTransitionEnd}
    >
      <div className={`${styles.progress} ${styles[type]}`} />
      <div className={styles.content}>
        <Icon className={`${styles.icon} ${styles[type]}`} />
        {message}
      </div>
      <span className={styles.dismiss} onClick={() => setVisible(false)}>
        Dismiss
      </span>
    </div>
  );
};

export default Snackbar;
