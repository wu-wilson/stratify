import { FiLayers } from "react-icons/fi";
import { type EmRemPx } from "../../types";
import styles from "./Logo.module.scss";

const Logo = ({
  fontSize = "0.95rem",
  iconSize = "1.4rem",
  spacing = "0.3rem",
  text = true,
}: {
  fontSize?: EmRemPx;
  iconSize?: EmRemPx;
  spacing?: EmRemPx;
  text?: boolean;
}) => {
  return (
    <div className={styles.container} style={{ fontSize }}>
      <FiLayers className={styles.icon} size={iconSize} />
      {text && (
        <span className={styles.text} style={{ marginLeft: spacing }}>
          Stratify
        </span>
      )}
    </div>
  );
};

export default Logo;
