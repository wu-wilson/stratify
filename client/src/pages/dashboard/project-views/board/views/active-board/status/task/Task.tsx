import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { Draggable } from "../../types";
import { IoTrashSharp } from "react-icons/io5";
import { CSS } from "@dnd-kit/utilities";
import { useAuth } from "../../../../../../../../hooks/useAuth";
import { useMembers } from "../../../../../../../../hooks/useMembers";
import { useIsOwner } from "../../../../../../../../hooks/useIsOwner";
import { type TaskEntity } from "../../../../../../../../services/tasks/types";
import Modal from "../../../../../../../../components/modal/Modal";
import DeleteTask from "../../../../modals/delete-task/DeleteTask";
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

  const { user } = useAuth();
  const { members } = useMembers();
  const isOwner = useIsOwner(user, members);

  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);

  const assignee =
    members!.find((m) => m.id === task.assigned_to)?.name || "Unassigned";

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={`${styles.container} ${isDragging && styles.ghost}`}
    >
      {openDeleteModal && (
        <Modal close={() => setOpenDeleteModal(false)}>
          <DeleteTask
            task={task}
            closeModal={() => setOpenDeleteModal(false)}
          />
        </Modal>
      )}
      <div className={styles.header}>
        <span className={styles.title}>{task.title}</span>
        <span className={styles.assignee}>{assignee}</span>
      </div>
      <div className={styles.footer}>
        {isOwner && (
          <IoTrashSharp
            className={styles.trash}
            onClick={() => setOpenDeleteModal(true)}
          />
        )}
      </div>
    </div>
  );
};

export default Task;
