import { useEffect, useState } from "react";
import { useAuth } from "../../../../../contexts/auth/AuthProvider";
import { useTime } from "../../../../../contexts/time/TimeProvider";
import { useTheme } from "../../../../../contexts/theme/ThemeProvider";
import { getTimezone } from "../../../../../util";
import { FaMoon, FaSun } from "react-icons/fa";
import { updateProfile } from "firebase/auth";
import { type View } from "./types";
import Copy from "../../../../../components/copy/Copy";
import Error from "../../../../../components/error/Error";
import Spinner from "../../../../../components/spinner/Spinner";
import Toggle from "../../../../../components/toggle/Toggle";
import styles from "./Settings.module.scss";

const Settings = () => {
  const { user } = useAuth();
  const { format, setFormat } = useTime();
  const { darkMode, setDarkMode, auto, setAuto } = useTheme();

  const toggleTimeFormat = (checked: boolean) => {
    if (checked) {
      setFormat("24hr");
    } else {
      setFormat("12hr");
    }
  };

  const timezone = getTimezone(true);

  const [view, setView] = useState<View>("root");
  const [name, setName] = useState<string>(user?.displayName ?? "");
  const [error, setError] = useState<string | null>(null);
  const [updatingName, setUpdatingName] = useState<boolean>(false);

  const updateName = async () => {
    if (!user) return;
    try {
      await updateProfile(user, { displayName: name });
      setError(null);
    } catch (err) {
      setError("Failed to update display name.");
    } finally {
      setUpdatingName(false);
    }
  };

  useEffect(() => {
    if (updatingName) {
      updateName();
    }
  }, [updatingName]);

  if (view === "name") {
    if (updatingName) {
      return (
        <div className={styles.container}>
          <Spinner size={50} text={"Updating..."} />
        </div>
      );
    }
    if (error) {
      return (
        <div className={styles.container}>
          <Error errorMsg={error} />
        </div>
      );
    }
    return (
      <div className={styles.container}>
        <span className={styles.title}>Display Name</span>
        <span className={styles.back} onClick={() => setView("root")}>
          &lt; Settings
        </span>
        <input
          className={styles.input}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Display name"
          autoFocus
        />
        <div className={styles.save}>
          <button onClick={() => setUpdatingName(true)}>Save</button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <span className={styles.title}>Settings</span>
      <span className={styles.subtitle}>Account</span>
      <div className={styles.group}>
        <div className={styles.row}>
          UID <Copy text={user!.uid} />
        </div>
        <div
          className={`${styles.row} ${styles.actionable}`}
          onClick={() => setView("name")}
        >
          Display Name
          <span>
            {user!.displayName} <span className={styles.chevron}>&gt;</span>
          </span>
        </div>
      </div>
      <span className={styles.subtitle}>Date & Time</span>
      <div className={styles.group}>
        <div className={styles.row}>
          Use 24hr Time
          <Toggle
            id="settings-time-24hr-toggle"
            checked={format === "24hr"}
            setChecked={toggleTimeFormat}
          />
        </div>
        <div className={styles.row}>
          Timezone <span>{timezone}</span>
        </div>
      </div>
      <span className={styles.subtitle}>Appearance</span>
      <div className={styles.group}>
        <div className={styles.row}>
          Set Theme Automatically
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
      </div>
    </div>
  );
};

export default Settings;
