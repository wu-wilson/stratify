import Sidebar from "./sidebar/Sidebar";
import styles from "./Dashboard.module.scss";

const Dashboard = () => {
  return (
    <div className={styles.container}>
      <Sidebar />
    </div>
  );
};

export default Dashboard;
