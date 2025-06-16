import { useState, type FC } from "react";
import { type View, type Props } from "./types";
import Root from "./views/Root";
import Personal from "./views/Personal";
import Time from "./views/Time";
import Appearance from "./views/Appearance";
import Name from "./views/Name";
import styles from "./Settings.module.scss";

const Settings = () => {
  const [view, setView] = useState<View>("root");

  const viewMapping: Record<View, FC<Props>> = {
    root: Root,
    personal: Personal,
    time: Time,
    appearance: Appearance,
    name: Name,
  };

  const View = viewMapping[view];

  return (
    <div className={styles.container}>
      <View setView={setView} />
    </div>
  );
};

export default Settings;
