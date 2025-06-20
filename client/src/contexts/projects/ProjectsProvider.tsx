import { createContext, useEffect, useState, type ReactNode } from "react";
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
  const navigate = useNavigate();

  const [selectedProject, setSelectedProject] = useState<ProjectEntity | null>(
    null
  );
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
      setSelectedProject(projectList[0] ?? null);
    } catch (error) {
      navigate("/error", {
        state: { message: "getProjects endpoint failed" },
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

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
    <ProjectsContext.Provider
      value={{ projects, setProjects, selectedProject, setSelectedProject }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};
