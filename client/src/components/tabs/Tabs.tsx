import { type EmRemPx } from "../../types";
import { type Tab } from "./types";
import styles from "./Tabs.module.scss";

const Tabs = ({
  tabWidth,
  tabs,
  selected,
  onClick,
}: {
  tabWidth: EmRemPx;
  tabs: Tab[];
  selected: string;
  onClick: (tab: Tab) => void;
}) => {
  const selectedIndex = tabs.findIndex((tab) => tab.key === selected);

  return (
    <div className={styles.container}>
      {tabs.map((tab) => (
        <div
          key={tab.key}
          onClick={() => onClick(tab)}
          className={styles.tab}
          style={{ width: tabWidth }}
        >
          {tab.icon && <tab.icon className={styles.icon} />}
          {tab.label}
        </div>
      ))}
      {selectedIndex !== -1 && (
        <div
          className={styles.selected}
          style={{
            width: tabWidth,
            left: `calc(${tabWidth} * ${selectedIndex})`,
          }}
        />
      )}
    </div>
  );
};

export default Tabs;
