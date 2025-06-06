import { useState } from "react";
import Sidebar from "./sidebar/Sidebar";
import styles from "./Dashboard.module.scss";

const Dashboard = () => {
  const [project, setProject] = useState<number | null>(null);

  return (
    <div className={styles["container"]}>
      <Sidebar project={project} setProject={setProject} />
    </div>
  );
};

export default Dashboard;
