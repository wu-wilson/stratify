import { type EmRemPx } from "../../types";
import { type Tab } from "./types";
import styles from "./Tabs.module.scss";

const Tabs = ({
  tabWidth,
  tabs,
  selectedTab,
  onClick,
}: {
  tabWidth: EmRemPx;
  tabs: Tab[];
  selectedTab: string;
  onClick: (tab: Tab) => void;
}) => {
  const selectedIndex = tabs.findIndex(
    (tab) => tab.label.toLowerCase() === selectedTab.toLowerCase()
  );

  return (
    <div className={styles.container}>
      {tabs.map((tab) => (
        <div
          key={tab.label}
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
