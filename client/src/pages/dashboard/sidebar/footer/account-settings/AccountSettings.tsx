import { useTheme } from "../../../../../contexts/theme/ThemeProvider";
import { FaSun, FaMoon } from "react-icons/fa";
import Toggle from "../../../../../components/toggle/Toggle";
import styles from "./AccountSettings.module.scss";

const AccountSettings = ({}: {}) => {
  const { darkMode, setDarkMode } = useTheme();

  return (
    <div className={styles["container"]}>
      <div className={styles["title"]}>Account Settings</div>
      <Toggle
        checked={darkMode ? darkMode : false}
        setChecked={setDarkMode}
        icons={{ checked: FaMoon, unchecked: FaSun }}
      />
    </div>
  );
};

export default AccountSettings;
