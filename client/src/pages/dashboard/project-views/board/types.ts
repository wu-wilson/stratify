import { type StatusEntity } from "../../../../services/statuses/types";
import { type TaskEntity } from "../../../../services/tasks/types";

export type ModalOptions =
  | {
      type: "deleteStatus";
      entity: StatusEntity;
    }
  | {
      type: "createStatus";
    }
  | {
      type: "deleteTask";
      entity: TaskEntity;
    }
  | {
      type: "createTask";
      entity: StatusEntity;
    };
