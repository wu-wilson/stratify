import { useState } from "react";
import { type View } from "../types";
import { useAuth } from "../../../../../../contexts/auth/AuthProvider";
import styles from "./Views.module.scss";

const Name = ({ setView }: { setView: (view: View) => void }) => {
  const { user } = useAuth();

  const [displayName, setDisplayName] = useState<string>(
    user?.displayName || ""
  );

  return (
    <div className={styles.container}>
      <span className={styles.title}>Display Name</span>
      <span className={styles.back} onClick={() => setView("personal")}>
        &lt; Personal Information
      </span>
      <section>
        <div className={styles.row}></div>
      </section>
    </div>
  );
};

export default Name;
