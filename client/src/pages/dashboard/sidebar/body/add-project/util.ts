import type { ProjectEntity } from "../../../../../services/projects/types";

export const validateProjectName = (
  name: string,
  projects: ProjectEntity[]
): { valid: boolean; msg: string | null } => {
  const trimmedName = name.trim();
  if (trimmedName === "") {
    return { valid: false, msg: "Field cannot be empty" };
  }
  const nameAlreadyExists = projects.find((p) => p.name === trimmedName);
  if (nameAlreadyExists) {
    return { valid: false, msg: "Project name is already in use" };
  }
  return { valid: true, msg: null };
};
