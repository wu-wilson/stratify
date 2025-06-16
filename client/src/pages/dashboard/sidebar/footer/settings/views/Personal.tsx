import Copy from "../../../../../../components/copy/Copy";
import { useAuth } from "../../../../../../contexts/auth/AuthProvider";
import { type View } from "../types";
import styles from "./Views.module.scss";

const Personal = ({ setView }: { setView: (view: View) => void }) => {
  const { user } = useAuth();

  return (
    <div className={styles.container}>
      <span className={styles.title}>Personal Information</span>
      <span className={styles.back} onClick={() => setView("root")}>
        &lt; Settings
      </span>
      <section>
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
      </section>
    </div>
  );
};

export default Personal;
