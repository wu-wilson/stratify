import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/auth/AuthProvider";
import { useNavigate } from "react-router-dom";
import { getProjects } from "../../services/projects/projects.service";
import { type ProjectEntity } from "../../services/projects/types";
import Spinner from "../../components/spinner/Spinner";
import Sidebar from "./sidebar/Sidebar";
import styles from "./Dashboard.module.scss";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [project, setProject] = useState<ProjectEntity | null>(null);
  const [projects, setProjects] = useState<ProjectEntity[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const initProjects = async () => {
    if (!user) {
      navigate("/error", {
        state: {
          message: "Unable to load projects, no user is defined",
        },
      });
      return;
    }

    try {
      const projectList = await getProjects(user.uid);
      setProjects(projectList);
      setProject(projectList[0] ?? null);
    } catch (error) {
      navigate("/error", {
        state: { message: "getProjects endpoint failed" },
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    initProjects();
  }, []);

  if (loading) {
    return (
      <div className={styles.container}>
        <Spinner size={50} text={"Retrieving your projects..."} />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Sidebar
        projects={projects ?? []}
        setProjects={setProjects}
        project={project}
        setProject={setProject}
      />
    </div>
  );
};

export default Dashboard;
