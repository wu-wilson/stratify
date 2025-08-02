import { useState } from "react";
import { useElementHeight } from "../../../../../hooks/useElementHeight";
import { type View } from "./types";
import Root from "./views/root/Root";
import Name from "./views/name/Name";
import styles from "./Settings.module.scss";

const Settings = () => {
  const { ref, height } = useElementHeight<HTMLDivElement>();
  const [view, setView] = useState<View>("root");

  return (
    <div
      className={styles.container}
      ref={ref}
      style={{ height: height ? `${height}px` : undefined }}
    >
      {view === "root" && <Root setView={setView} />}
      {view === "name" && <Name setView={setView} />}
    </div>
  );
};

export default Settings;
