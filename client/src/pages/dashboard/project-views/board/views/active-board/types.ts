import { type StatusEntity } from "../../../../../../services/statuses/types";
import { type TaskEntity } from "../../../../../../services/tasks/types";

export const Draggable = {
  STATUS: "status",
  TASK: "task",
} as const;

export function isStatusEntity(obj: any): obj is StatusEntity {
  return (
    obj &&
    typeof obj === "object" &&
    typeof obj.id === "string" &&
    typeof obj.name === "string" &&
    typeof obj.position === "number" &&
    typeof obj.created_on === "string"
  );
}

export function isTaskEntity(obj: any): obj is TaskEntity {
  return (
    obj &&
    typeof obj === "object" &&
    typeof obj.id === "string" &&
    typeof obj.status_id === "string" &&
    typeof obj.created_by === "string" &&
    (typeof obj.assigned_to === "string" || obj.assigned_to === null) &&
    typeof obj.title === "string" &&
    (typeof obj.description === "string" || obj.description === null) &&
    typeof obj.position === "number" &&
    typeof obj.created_on === "string"
  );
}
