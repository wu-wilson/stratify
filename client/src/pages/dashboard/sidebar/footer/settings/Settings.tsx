import { useEffect, useRef, useState } from "react";
import { type View } from "./types";
import Root from "./views/root/Root";
import Name from "./views/name/Name";
import styles from "./Settings.module.scss";

const Settings = () => {
  const [view, setView] = useState<View>("root");

  const [height, setHeight] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (view === "root" && ref.current) {
      const height = ref.current.offsetHeight;
      setHeight(height);
    }
  }, [view]);

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
