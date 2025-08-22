import { useEffect, useState } from "react";
import { ICON_MAP } from "./constants";
import { type SnackbarType } from "./types";
import styles from "./Snackbar.module.scss";

const Snackbar = ({
  message,
  type = "info",
  duration = 5000,
  onDismiss,
}: {
  message: string;
  type?: SnackbarType;
  duration?: number;
  onDismiss?: () => void;
}) => {
  const Icon = ICON_MAP[type];
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);

    const timer = setTimeout(() => {
      setVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [message, duration]);

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
