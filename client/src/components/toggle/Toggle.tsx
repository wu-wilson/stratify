import { type IconType } from "react-icons";
import styles from "./Toggle.module.scss";

const Toggle = ({
  checked,
  onToggle,
  icons,
}: {
  checked: boolean;
  onToggle: () => any;
  icons?: { checked: IconType; unchecked: IconType };
}) => {
  return (
    <label className={styles["switch"]}>
      <input type="checkbox" onChange={onToggle} checked={checked} />
      <span className={styles["slider"]}></span>
      <span className={styles["icon-container"]}>
        {icons?.checked && icons?.unchecked ? (
          checked ? (
            <icons.checked className={styles["icon"]} />
          ) : (
            <icons.unchecked className={styles["icon"]} />
          )
        ) : null}
      </span>
    </label>
  );
};

export default Toggle;
