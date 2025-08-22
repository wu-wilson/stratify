import { type Dispatch, type SetStateAction } from "react";
import { type ProjectEntity } from "../../services/projects/types";

export type ProjectsContextType = {
  projects: ProjectEntity[] | null;
  setProjects: Dispatch<SetStateAction<ProjectEntity[] | null>>;
};
