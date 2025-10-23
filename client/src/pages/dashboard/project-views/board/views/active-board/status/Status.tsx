import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Draggable } from "../types";
import { useKanban } from "../../../../../../../hooks/useKanban";
import { useMemo } from "react";
import { type StatusEntity } from "../../../../../../../services/statuses/types";
import Task from "./task/Task";
import styles from "./Status.module.scss";

const Status = ({ status }: { status: StatusEntity }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: status.id,
    data: { type: Draggable.STATUS, metadata: status },
  });

  const { kanban } = useKanban();

  const sortedTasks = useMemo(
    () =>
      kanban!.tasks
        .filter((t) => t.status_id === status.id)
        .sort((a, b) => a.position - b.position),
    [kanban!.tasks, status.id]
  );

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={`${styles.container} ${isDragging && styles.ghost}`}
    >
      <span className={styles.title}>{status.name}</span>
      <SortableContext
        items={sortedTasks.map((task) => task.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className={styles.dragContainer}>
          {sortedTasks.map((task) => (
            <Task task={task} key={task.id} />
          ))}
        </div>
      </SortableContext>
    </div>
  );
};

export default Status;
