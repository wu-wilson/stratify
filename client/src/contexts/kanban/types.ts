import { type Dispatch, type SetStateAction } from "react";
import { type StatusEntity } from "../../services/statuses/types";
import { type TaggingEntity } from "../../services/taggings/types";
import { type TagEntity } from "../../services/tags/types";
import { type TaskEntity } from "../../services/tasks/types";

export type KanbanState = {
  statuses: StatusEntity[];
  taggings: TaggingEntity[];
  tags: TagEntity[];
  tasks: TaskEntity[];
};

type BaseKanbanContext = {
  setKanban: Dispatch<SetStateAction<KanbanState | null>>;
  kanban: KanbanState | null;
  error: string | null;
};

export type KanbanContextType =
  | (BaseKanbanContext & {
      loading: true;
      kanban: null;
    })
  | (BaseKanbanContext & {
      loading: false;
      kanban: KanbanState;
    });
