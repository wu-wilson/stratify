import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useMemo } from "react";
import { CSS } from "@dnd-kit/utilities";
import { Draggable } from "../types";
import { useKanban } from "../../../../../../../hooks/useKanban";
import { useIsOwner } from "../../../../../../../hooks/useIsOwner";
import { IoTrashSharp } from "react-icons/io5";
import { useMembers } from "../../../../../../../hooks/useMembers";
import { useModal } from "../../../Board";
import { useSearch } from "../../../../../../../hooks/useSearch";
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

  const { search } = useSearch();
  const { kanban } = useKanban();
  const { members } = useMembers();
  const isOwner = useIsOwner();

  const sortedTasks = useMemo(() => {
    const tagMap = new Map(kanban!.tags.map((t) => [t.id, t.name]));
    const memberMap = new Map(members!.map((m) => [m.id, m.name]));

    return kanban!.tasks
      .filter((task) => task.status_id === status.id)
      .filter((task) => {
        const tags = kanban!.taggings
          .filter((t) => t.task_id === task.id)
          .map((t) => tagMap.get(t.tag_id)!);

        const assignee = task.assigned_to
          ? memberMap.get(task.assigned_to)!
          : "Unassigned";

        const searchFields = [task.title, assignee, ...tags];

        return searchFields.some((field) =>
          field.toLowerCase().includes(search)
        );
      })
      .sort((a, b) => a.position - b.position);
  }, [
    kanban!.tasks,
    kanban!.taggings,
    kanban!.tags,
    members,
    status.id,
    search,
  ]);

  const { modal, setModal } = useModal();

  return (
    <div
      ref={setNodeRef}
      {...(!modal ? attributes : {})}
      {...(!modal ? listeners : {})}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={`${styles.container} ${isDragging && styles.ghost}`}
    >
      <div className={styles.header}>
        <span className={styles.title}>{status.name}</span>
        {isOwner && (
          <IoTrashSharp
            className={styles.trash}
            onClick={() => setModal({ type: "deleteStatus", entity: status })}
          />
        )}
      </div>
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
      <div
        className={styles.addTask}
        onClick={() => setModal({ type: "createTask", entity: status })}
      >
        Add Task
      </div>
    </div>
  );
};

export default Status;
