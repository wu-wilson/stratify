import { type TaskEntity } from "../../../../../../services/tasks/types";

export const validateTaskTitle = (
  title: string,
  tasks: TaskEntity[]
): { valid: boolean; msg: string | null } => {
  const cleanedTitle = title.toLowerCase().trim();

  if (cleanedTitle.length === 0) {
    return { valid: false, msg: "Field cannot be empty" };
  }

  for (const t of tasks) {
    if (cleanedTitle === t.title.toLowerCase().trim()) {
      return { valid: false, msg: "Task title is already in use" };
    }
  }

  return { valid: true, msg: null };
};
