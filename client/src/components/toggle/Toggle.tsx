import type { ToggleIcons } from "./types";
import styles from "./Toggle.module.scss";

const Toggle = ({
  id,
  checked,
  setChecked,
  icons,
  disabled = false,
}: {
  id: string;
  checked: boolean;
  setChecked: (checked: boolean) => void;
  icons?: ToggleIcons;
  disabled?: boolean;
}) => {
  const toggleChecked = () => {
    if (!disabled) {
      setChecked(!checked);
    }
  };

  return (
    <label
      className={`${styles.container} ${checked ? styles.checked : null} ${
        disabled ? styles.disabled : null
      }`}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={toggleChecked}
        disabled={disabled}
        id={id}
      />
      <span className={styles.slider}>
        <div className={styles.knob}>
          {icons &&
            (checked ? (
              <icons.checked className={styles.icon} />
            ) : (
              <icons.unchecked className={styles.icon} />
            ))}
        </div>
      </span>
    </label>
  );
};

export default Toggle;
