import { type View } from "../types";
import { useTheme } from "../../../../../../contexts/theme/ThemeProvider";
import { FaMoon, FaSun } from "react-icons/fa";
import Toggle from "../../../../../../components/toggle/Toggle";
import styles from "./Views.module.scss";

const Appearance = ({ setView }: { setView: (view: View) => void }) => {
  const { darkMode, setDarkMode, auto, setAuto } = useTheme();

  return (
    <div className={styles.container}>
      <span className={styles.title}>Appearance</span>
      <span className={styles.back} onClick={() => setView("root")}>
        &lt; Settings
      </span>
      <section>
        <div className={styles.row}>
          Set Automatically
          <Toggle
            id="settings-theme-auto-toggle"
            checked={auto}
            setChecked={setAuto}
          />
        </div>
        <div className={styles.row}>
          Theme
          <Toggle
            id="settings-theme-toggle"
            checked={darkMode ? darkMode : false}
            setChecked={setDarkMode}
            icons={{ checked: FaMoon, unchecked: FaSun }}
            disabled={auto}
          />
        </div>
      </section>
    </div>
  );
};

export default Appearance;
