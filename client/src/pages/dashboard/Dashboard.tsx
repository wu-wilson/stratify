import { useProjects } from "../../hooks/useProjects";
import { useQueryParams } from "../../hooks/query-params/useQueryParams";
import Sidebar from "./sidebar/Sidebar";
import ProjectViews from "./project-views/ProjectViews";
import NoAccess from "./no-access/NoAccess";
import NoProjects from "./no-projects/NoProjects";
import styles from "./Dashboard.module.scss";

const Dashboard = () => {
  const { projects } = useProjects();
  const { getParam } = useQueryParams();

  const selectedProjectId = getParam("project");
  const hasAccess = projects?.some((p) => p.id === selectedProjectId);

  return (
    <div id="dashboard" className={styles.container}>
      <Sidebar />
      {hasAccess ? (
        <ProjectViews />
      ) : selectedProjectId ? (
        <NoAccess />
      ) : (
        <NoProjects />
      )}
    </div>
  );
};

export default Dashboard;
