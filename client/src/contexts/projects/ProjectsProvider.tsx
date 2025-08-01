import { createContext, useEffect, useState, type ReactNode } from "react";
import { useQueryParams } from "../../hooks/query-params/useQueryParams";
import { useTheme } from "../../hooks/useTheme";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { getProjects } from "../../services/projects/projects.service";
import { type ProjectEntity } from "../../services/projects/types";
import { type ProjectsContextType } from "./types";
import Spinner from "../../components/spinner/Spinner";
import styles from "./ProjectsProvider.module.scss";

export const ProjectsContext = createContext<ProjectsContextType | undefined>(
  undefined
);

export const ProjectsProvider = ({ children }: { children: ReactNode }) => {
  const { darkMode } = useTheme();
  const { user } = useAuth();
  const { getParam, setParam } = useQueryParams();
  const navigate = useNavigate();

  const [projects, setProjects] = useState<ProjectEntity[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchProjects = async () => {
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
    } catch (error) {
      navigate("/error", {
        state: { message: "getProjects endpoint failed" },
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (projects === null) {
      fetchProjects();
    }
  }, []);

  useEffect(() => {
    if (!projects || projects.length === 0) {
      return;
    }
    const selectedProjectId = getParam("project");
    if (!selectedProjectId) {
      setParam({ project: projects[0].id });
    }
  }, [projects]);

  if (loading) {
    return (
      <div className={darkMode ? "dark-mode" : "light-mode"}>
        <div className={styles.container}>
          <Spinner size={50} text={"Fetching projects..."} />
        </div>
      </div>
    );
  }

  return (
    <ProjectsContext.Provider value={{ projects, setProjects }}>
      {children}
    </ProjectsContext.Provider>
  );
};
