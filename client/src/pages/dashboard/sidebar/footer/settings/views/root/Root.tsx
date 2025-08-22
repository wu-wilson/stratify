import { useTimeFormat } from "../../../../../../../hooks/useTimeFormat";
import { useAuth } from "../../../../../../../hooks/useAuth";
import { useTheme } from "../../../../../../../hooks/useTheme";
import { getTimezone } from "../../../../../../../util";
import { getTruncatedDisplayName } from "./util";
import { type View } from "../../types";
import { type Dispatch, type SetStateAction } from "react";
import Copy from "../../../../../../../components/copy/Copy";
import Toggle from "../../../../../../../components/toggle/Toggle";
import ThemeToggle from "../../../../../../../components/toggle/theme-toggle/ThemeToggle";
import styles from "./Root.module.scss";

const Root = ({ setView }: { setView: Dispatch<SetStateAction<View>> }) => {
  const { auto, setAuto } = useTheme();
  const { user, displayName } = useAuth();
  const { format, setFormat } = useTimeFormat();

  const toggleTimeFormat = (checked: boolean) => {
    if (checked) {
      setFormat("24hr");
    } else {
      setFormat("12hr");
    }
  };

  const timezone = getTimezone(true);

  const truncatedDisplayName = getTruncatedDisplayName(displayName);

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
            {truncatedDisplayName}
            <span className={styles.chevron}>&gt;</span>
          </span>
        </div>
      </div>
      <div className={styles.section}>
        <div className={styles.row}>
          Use 24hr Time
          <Toggle
            id="settings-time-24hr-toggle"
            checked={format === "24hr"}
            setChecked={toggleTimeFormat as Dispatch<SetStateAction<boolean>>}
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
