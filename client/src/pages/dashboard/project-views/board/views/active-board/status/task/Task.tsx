import { useMemo } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { Draggable } from "../../types";
import { IoTrashSharp } from "react-icons/io5";
import { CSS } from "@dnd-kit/utilities";
import { useMembers } from "../../../../../../../../hooks/useMembers";
import { useIsOwner } from "../../../../../../../../hooks/useIsOwner";
import { useModal } from "../../../../Board";
import { useKanban } from "../../../../../../../../hooks/useKanban";
import { type TaskEntity } from "../../../../../../../../services/tasks/types";
import { type TagEntity } from "../../../../../../../../services/tags/types";
import Tag from "../../../../../../../../components/tag/Tag";
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

  const { kanban } = useKanban();
  const { members } = useMembers();
  const isOwner = useIsOwner();

  const assignee =
    members!.find((m) => m.id === task.assigned_to)?.name || "Unassigned";

  const { modal, setModal } = useModal();

  const tags = useMemo(() => {
    const taggings = kanban!.taggings.filter((t) => t.task_id === task.id);
    const tags: TagEntity[] = [];
    taggings.forEach((tagging) => {
      const tag = kanban!.tags.find((tag) => tag.id === tagging.tag_id)!;
      tags.push(tag);
    });
    return tags;
  }, [task, kanban!.taggings, kanban!.tags]);

  return (
    <div
      ref={setNodeRef}
      {...(!modal ? attributes : {})}
      {...(!modal ? listeners : {})}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={`${styles.container} ${isDragging && styles.ghost}`}
    >
      <div className={styles.header}>
        <span className={styles.title}>{task.title}</span>
        <span className={styles.assignee}>{assignee}</span>
      </div>
      {tags.length > 0 && (
        <div className={styles.tags}>
          {tags.map((tag) => (
            <Tag key={tag.id} tag={tag} />
          ))}
        </div>
      )}
      <div className={styles.footer}>
        {isOwner && (
          <IoTrashSharp
            className={styles.trash}
            onClick={() => setModal({ type: "deleteTask", entity: task })}
          />
        )}
      </div>
    </div>
  );
};

export default Task;
