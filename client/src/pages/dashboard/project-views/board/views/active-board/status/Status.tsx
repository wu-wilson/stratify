import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useMemo, useState } from "react";
import { CSS } from "@dnd-kit/utilities";
import { Draggable } from "../types";
import { useKanban } from "../../../../../../../hooks/useKanban";
import { useAuth } from "../../../../../../../hooks/useAuth";
import { useMembers } from "../../../../../../../hooks/useMembers";
import { useIsOwner } from "../../../../../../../hooks/useIsOwner";
import { IoTrashSharp } from "react-icons/io5";
import { type StatusEntity } from "../../../../../../../services/statuses/types";
import Modal from "../../../../../../../components/modal/Modal";
import DeleteStatus from "../../../modals/delete-status/DeleteStatus";
import CreateTask from "../../../modals/create-task/CreateTask";
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
  const { user } = useAuth();
  const { members } = useMembers();

  const isOwner = useIsOwner(user, members);

  const sortedTasks = useMemo(
    () =>
      kanban!.tasks
        .filter((t) => t.status_id === status.id)
        .sort((a, b) => a.position - b.position),
    [kanban!.tasks, status.id]
  );

  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [openCreateTaskModal, setOpenCreateTaskModal] =
    useState<boolean>(false);

  const isModalOpen = openDeleteModal || openCreateTaskModal;

  return (
    <div
      ref={setNodeRef}
      {...(!isModalOpen ? attributes : {})}
      {...(!isModalOpen ? listeners : {})}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={`${styles.container} ${isDragging && styles.ghost}`}
    >
      {openDeleteModal && (
        <Modal close={() => setOpenDeleteModal(false)}>
          <DeleteStatus
            status={status}
            closeModal={() => setOpenDeleteModal(false)}
          />
        </Modal>
      )}
      {openCreateTaskModal && (
        <Modal close={() => setOpenCreateTaskModal(false)}>
          <CreateTask
            statusId={status.id}
            closeModal={() => setOpenCreateTaskModal(false)}
          />
        </Modal>
      )}
      <div className={styles.header}>
        <span className={styles.title}>{status.name}</span>
        {isOwner && (
          <IoTrashSharp
            className={styles.trash}
            onClick={() => setOpenDeleteModal(true)}
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
        onClick={() => setOpenCreateTaskModal(true)}
      >
        Add Task
      </div>
    </div>
  );
};

export default Status;
