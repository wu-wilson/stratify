import { useState } from "react";
import { useTheme } from "../../../../../contexts/theme/ThemeProvider";
import { FaSun, FaMoon } from "react-icons/fa";
import { timezone, fallback, formatCreationTime } from "./util";
import { useAuth } from "../../../../../contexts/auth/AuthProvider";
import Copy from "../../../../../components/copy/Copy";
import Edit from "../../../../../components/edit/Edit";
import Toggle from "../../../../../components/toggle/Toggle";
import styles from "./Settings.module.scss";

const Settings = ({}: {}) => {
  const { darkMode, setDarkMode } = useTheme();
  const { user } = useAuth();

  const createdOn = user?.metadata.creationTime
    ? formatCreationTime(user.metadata.creationTime)
    : fallback;

  const [name, setName] = useState<string>(user?.displayName || fallback);

  return (
    <div className={styles.container}>
      <span className={styles.title}>Settings</span>
      <section className={styles.section}>
        <div className={styles.row}>
          UID
          {user?.uid ? <Copy text={user.uid} /> : <span>{fallback}</span>}
        </div>
        <div className={styles.row}>
          Name
          <div style={{ width: "10rem" }}>
            <Edit text={name} setText={setName} />
          </div>
        </div>
        <div className={styles.row}>
          Created
          <span>{createdOn}</span>
        </div>
        <div className={styles.row}>
          Timezone
          <span>{timezone}</span>
        </div>
      </section>
      <section className={styles.section}>
        <div className={styles.row}>
          Appearance
          <Toggle
            id="account-settings-theme"
            checked={darkMode ? darkMode : false}
            setChecked={setDarkMode}
            icons={{ checked: FaMoon, unchecked: FaSun }}
          />
        </div>
      </section>
    </div>
  );
};

export default Settings;
