import { useState } from "react";
import { tabs } from "./constants";
import Sidebar from "./sidebar/Sidebar";
import Tabs from "../../components/tabs/Tabs";
import styles from "./Dashboard.module.scss";

const Dashboard = () => {
  const [tab, setTab] = useState<string>(tabs[0]);

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.view}>
        <Tabs
          tabWidth="5rem"
          tabs={tabs}
          selectedTab={tab}
          setSelectedTab={setTab}
        />
      </div>
    </div>
  );
};

export default Dashboard;
