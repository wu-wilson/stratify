import { useProjects } from "../../hooks/useProjects";
import { useQueryParams } from "../../hooks/query-params/useQueryParams";
import Sidebar from "./sidebar/Sidebar";
import ProjectViews from "./project-views/ProjectViews";
import NoAccess from "./no-access/NoAccess";
import styles from "./Dashboard.module.scss";

const Dashboard = () => {
  const { projects } = useProjects();
  const { getParam } = useQueryParams();

  const selectedProjectId = getParam("project");
  const hasAccess = projects?.some((p) => p.id === selectedProjectId);
  const hasProjects = projects && projects.length > 0;

  return (
    <div className={styles.container}>
      <Sidebar />
      {!hasProjects && !selectedProjectId ? (
        <></>
      ) : hasAccess ? (
        <ProjectViews />
      ) : (
        <NoAccess />
      )}
    </div>
  );
};

export default Dashboard;
