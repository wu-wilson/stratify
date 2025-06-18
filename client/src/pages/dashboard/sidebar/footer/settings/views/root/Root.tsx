import { useTime } from "../../../../../../../contexts/time-format/TimeFormatProvider";
import { useAuth } from "../../../../../../../contexts/auth/AuthProvider";
import { useTheme } from "../../../../../../../contexts/theme/ThemeProvider";
import { getTimezone } from "../../../../../../../util";
import { getDisplayName } from "./util";
import { type View } from "../../types";
import Copy from "../../../../../../../components/copy/Copy";
import Toggle from "../../../../../../../components/toggle/Toggle";
import ThemeToggle from "../../../../../../../components/toggle/theme/ThemeToggle";
import styles from "./Root.module.scss";

const Root = ({ setView }: { setView: (view: View) => void }) => {
  const { auto, setAuto } = useTheme();
  const { user } = useAuth();
  const { format, setFormat } = useTime();

  const toggleTimeFormat = (checked: boolean) => {
    if (checked) {
      setFormat("24hr");
    } else {
      setFormat("12hr");
    }
  };

  const timezone = getTimezone(true);

  const displayName = getDisplayName(user);

  return (
    <>
      <span className={styles.title}>Settings</span>
      <div className={styles.section}>
        <div className={styles.row}>
          UID <Copy text={user!.uid} maxTextLength={20} />
        </div>
        <div
          className={`${styles.row} ${styles.actionable}`}
          onClick={() => setView("name")}
        >
          Display Name
          <span>
            {displayName} <span className={styles.chevron}>&gt;</span>
          </span>
        </div>
      </div>
      <div className={styles.section}>
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
      <div className={styles.section}>
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
          <ThemeToggle id="settings-theme-toggle" disabled={auto} />
        </div>
      </div>
    </>
  );
};

export default Root;
