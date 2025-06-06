import { FiLayers } from "react-icons/fi";
import styles from "./Logo.module.scss";

const Logo = ({
  scale = 1,
  text = true,
}: {
  scale?: number;
  text?: boolean;
}) => {
  const fontSize = `${1 * scale}rem`;
  const iconSize = `${1.4 * scale}rem`;
  const spacing = `${0.3 * scale}rem`;

  return (
    <div className={styles["container"]} style={{ fontSize }}>
      <FiLayers className={styles["icon"]} size={iconSize} />
      {text && (
        <span className={styles["text"]} style={{ marginLeft: spacing }}>
          Stratify
        </span>
      )}
    </div>
  );
};

export default Logo;
