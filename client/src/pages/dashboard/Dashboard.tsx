import { useState } from "react";
import Sidebar from "./sidebar/Sidebar";
import styles from "./Dashboard.module.scss";

const Dashboard = () => {
  const [projectId, setProjectId] = useState<number | null>(null);

  return (
    <div className={styles["container"]}>
      <Sidebar projectId={projectId} setProjectId={setProjectId} />
    </div>
  );
};

export default Dashboard;
