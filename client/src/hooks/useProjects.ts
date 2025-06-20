import { useContext } from "react";
import { ProjectsContext } from "../contexts/projects/ProjectsProvider";
import { type ProjectsContextType } from "../contexts/projects/types";

export const useProjects = (): ProjectsContextType => {
  const context = useContext(ProjectsContext);
  if (!context) {
    throw new Error("useProjects must be used within a ProjectProvider");
  }
  return context;
};
