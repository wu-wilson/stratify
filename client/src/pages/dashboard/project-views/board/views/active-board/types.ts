import { type StatusEntity } from "../../../../../../services/statuses/types";
import { type TaskEntity } from "../../../../../../services/tasks/types";

export const Draggable = {
  STATUS: "status",
  TASK: "task",
} as const;

type BaseDragItem = {
  id: string;
};

export type DragItem =
  | (BaseDragItem & { type: typeof Draggable.STATUS; data: StatusEntity })
  | (BaseDragItem & { type: typeof Draggable.TASK; data: TaskEntity });
