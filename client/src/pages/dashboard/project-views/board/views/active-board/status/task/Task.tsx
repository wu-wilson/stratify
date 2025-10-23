import { useSortable } from "@dnd-kit/sortable";
import { Draggable } from "../../types";
import { CSS } from "@dnd-kit/utilities";
import { type TaskEntity } from "../../../../../../../../services/tasks/types";
import styles from "./Task.module.scss";

const Task = ({ task }: { task: TaskEntity }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: { type: Draggable.TASK, metadata: task },
  });

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={`${styles.container} ${isDragging && styles.ghost}`}
    >
      {task.title}
    </div>
  );
};

export default Task;
