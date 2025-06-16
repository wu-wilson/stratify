import { useState } from "react";
import { type View } from "./types";
import Root from "./views/root/Root";
import Name from "./views/name/Name";
import styles from "./Settings.module.scss";

const Settings = () => {
  const [view, setView] = useState<View>("root");

  return (
    <div className={styles.container}>
      {view === "root" && <Root setView={setView} />}
      {view === "name" && <Name setView={setView} />}
    </div>
  );
};

export default Settings;
