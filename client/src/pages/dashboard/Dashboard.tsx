import { useState } from "react";
import Sidebar from "./sidebar/Sidebar";
import Spinner from "../../components/spinner/Spinner";
import styles from "./Dashboard.module.scss";

const Dashboard = () => {
  const [loading, setLoading] = useState<boolean>(true);

  const [projectId, setProjectId] = useState<string | null>(null);

  if (loading) {
    return (
      <div className={styles["container"]}>
        <Spinner size={50} text={"Loading your projects..."} />
      </div>
    );
  }

  return (
    <div className={styles["container"]}>
      <Sidebar projectId={projectId} setProjectId={setProjectId} />
    </div>
  );
};

export default Dashboard;
