import { type EmRemPx } from "../../types";
import { type Tab } from "./types";
import styles from "./Tabs.module.scss";

const Tabs = ({
  tabWidth,
  tabs,
  selectedTab,
  setSelectedTab,
}: {
  tabWidth: EmRemPx;
  tabs: Tab[];
  selectedTab: Tab;
  setSelectedTab: (tab: Tab) => void;
}) => {
  const selectedIndex = tabs.findIndex(
    (tab) => tab.label === selectedTab.label
  );

  return (
    <div className={styles.container}>
      <div
        className={styles.selected}
        style={{
          width: tabWidth,
          left: `calc(${tabWidth} * ${selectedIndex})`,
        }}
      />
      {tabs.map((tab) => (
        <div
          key={tab.label}
          onClick={() => setSelectedTab(tab)}
          className={styles.tab}
          style={{ width: tabWidth }}
        >
          {tab.icon && <tab.icon className={styles.icon} />}
          {tab.label}
        </div>
      ))}
    </div>
  );
};

export default Tabs;
