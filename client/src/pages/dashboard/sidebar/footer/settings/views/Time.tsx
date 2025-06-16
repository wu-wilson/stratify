import { useEffect, useState } from "react";
import { type View } from "../types";
import { getTimezone } from "../../../../../../util";
import { type Moment } from "moment-timezone";
import { useTime } from "../../../../../../contexts/time/TimeProvider";
import moment from "moment-timezone";
import Toggle from "../../../../../../components/toggle/Toggle";
import styles from "./Views.module.scss";

const Time = ({ setView }: { setView: (view: View) => void }) => {
  const { format, setFormat } = useTime();

  const toggleTimeFormat = (checked: boolean) => {
    if (checked) {
      setFormat("24hr");
    } else {
      setFormat("12hr");
    }
  };

  const formatTime = (m: Moment): string => {
    if (format === "12hr") {
      return m.format("MMM DD YYYY, h:mm A");
    } else {
      return m.format("MMM DD YYYY, H:mm A");
    }
  };

  const [time, setTime] = useState<string>(formatTime(moment()));

  useEffect(() => {
    setTime(formatTime(moment()));

    const interval = setInterval(() => {
      setTime(formatTime(moment()));
    }, 1000);

    return () => clearInterval(interval);
  }, [format]);

  const timezone = `${getTimezone()} (${getTimezone(true)})`;

  return (
    <div className={styles.container}>
      <span className={styles.title}>Date & Time</span>
      <span className={styles.back} onClick={() => setView("root")}>
        &lt; Settings
      </span>
      <section>
        <div className={styles.row}>
          Use 24hr Time
          <Toggle
            id="settings-time-24hr-toggle"
            checked={format === "24hr"}
            setChecked={toggleTimeFormat}
          />
        </div>
        <div className={styles.row}>
          Time <span>{time}</span>
        </div>
        <div className={styles.row}>
          Timezone <span>{timezone}</span>
        </div>
      </section>
    </div>
  );
};

export default Time;
