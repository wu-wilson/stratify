import { useState } from "react";
import { tabs } from "./constants";
import { type Tab } from "../../../components/tabs/types";
import Tabs from "../../../components/tabs/Tabs";
import Overview from "./overview/Overview";
import People from "./people/People";
import Statuses from "./statuses/Statuses";
import styles from "./Views.module.scss";

const Views = () => {
  const [tab, setTab] = useState<Tab>(tabs[0]);

  return (
    <div className={styles.container}>
      <div className={styles.tabs}>
        <Tabs
          tabWidth="7rem"
          tabs={tabs}
          selectedTab={tab}
          setSelectedTab={setTab}
        />
      </div>
      {tab.label === "Overview" && <Overview />}
      {tab.label === "Statuses" && <Statuses />}
      {tab.label === "People" && <People />}
    </div>
  );
};

export default Views;
