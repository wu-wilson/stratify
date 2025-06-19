import { useState } from "react";
import { tabs } from "./constants";
import { type Tab } from "../../components/tabs/types";
import Sidebar from "./sidebar/Sidebar";
import Tabs from "../../components/tabs/Tabs";
import styles from "./Dashboard.module.scss";

const Dashboard = () => {
  const [tab, setTab] = useState<Tab>(tabs[0]);

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.view}>
        <Tabs
          tabWidth="7rem"
          tabs={tabs}
          selectedTab={tab}
          setSelectedTab={setTab}
        />
      </div>
    </div>
  );
};

export default Dashboard;
