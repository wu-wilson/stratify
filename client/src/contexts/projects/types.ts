import type { ProjectEntity } from "../../services/projects/types";

export type ProjectsContextType = {
  projects: ProjectEntity[] | null;
  setProjects: (projects: ProjectEntity[] | null) => void;
  selectedProject: ProjectEntity | null;
  setSelectedProject: (project: ProjectEntity | null) => void;
};
