import { ProjectsProvider } from "../../contexts/projects/ProjectsProvider";
import Sidebar from "./sidebar/Sidebar";
import styles from "./Dashboard.module.scss";

const Dashboard = () => {
  return (
    <ProjectsProvider>
      <div className={styles.container}>
        <Sidebar />
      </div>
    </ProjectsProvider>
  );
};

export default Dashboard;
