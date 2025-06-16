import { type View } from "../types";
import styles from "./Views.module.scss";

const Root = ({ setView }: { setView: (view: View) => void }) => {
  const labels: Partial<Record<View, string>> = {
    personal: "Personal Information",
    time: "Date & Time",
    appearance: "Appearance",
  };

  return (
    <div className={styles.container}>
      <span className={styles.title}>Settings</span>
      <span className={styles.back} />
      <section>
        {Object.entries(labels).map(([view, label]) => (
          <div
            key={view}
            className={`${styles.row} ${styles.actionable}`}
            onClick={() => setView(view as View)}
          >
            {label}
            <span className={styles.chevron}>&gt;</span>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Root;
