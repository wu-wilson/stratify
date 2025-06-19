import { type EmRemPx } from "../../types";
import styles from "./Tabs.module.scss";

const Tabs = ({
  tabWidth,
  tabs,
  selectedTab,
  setSelectedTab,
}: {
  tabWidth: EmRemPx;
  tabs: string[];
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
}) => {
  const selectedIndex = tabs.indexOf(selectedTab);

  return (
    <div className={styles.container}>
      {tabs.map((tab) => (
        <div
          key={tab}
          onClick={() => setSelectedTab(tab)}
          className={styles.tab}
          style={{ width: tabWidth }}
        >
          {tab}
        </div>
      ))}
      <div
        className={styles.selected}
        style={{
          width: tabWidth,
          left: `calc(${tabWidth} * ${selectedIndex})`,
        }}
      />
    </div>
  );
};

export default Tabs;
