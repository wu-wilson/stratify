import {
  DndContext,
  DragOverlay,
  PointerSensor,
  rectIntersection,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragOverEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import {
  horizontalListSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";
import {
  restrictToFirstScrollableAncestor,
  restrictToHorizontalAxis,
  restrictToParentElement,
} from "@dnd-kit/modifiers";
import { useKanban } from "../../../../../../hooks/useKanban";
import { useQueryParams } from "../../../../../../hooks/query-params/useQueryParams";
import { useSnackbar } from "../../../../../../hooks/useSnackbar";
import { useMemo, useState } from "react";
import { isStatusEntity, isTaskEntity } from "./types";
import { reorderStatus } from "../../../../../../services/statuses/statuses.service";
import { reorderTask } from "../../../../../../services/tasks/tasks.service";
import {
  type ReorderTaskPayload,
  type TaskEntity,
} from "../../../../../../services/tasks/types";
import {
  type StatusEntity,
  type ReorderStatusPayload,
} from "../../../../../../services/statuses/types";
import Modal from "../../../../../../components/modal/Modal";
import CreateStatus from "../../modals/create-status/CreateStatus";
import Status from "./status/Status";
import Task from "./status/task/Task";
import styles from "./ActiveBoard.module.scss";

const ActiveBoard = () => {
  const { kanban, setKanban } = useKanban();
  const { getParam } = useQueryParams();
  const { pushMessage } = useSnackbar();

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 3 } })
  );

  const sortedStatuses = useMemo(() => {
    return kanban!.statuses.sort((a, b) => a.position - b.position);
  }, [kanban!.statuses]);

  const [activeItem, setActiveItem] = useState<
    StatusEntity | TaskEntity | null
  >(null);
  const [originalActiveItemPosition, setOriginalActiveItemPosition] = useState<
    number | null
  >(null);

  const onDragStart = (event: DragStartEvent) => {
    const { active } = event;

    const isStatus = isStatusEntity(active.data.current?.metadata);
    const isTask = isTaskEntity(active.data.current?.metadata);

    if (isStatus || isTask) {
      setActiveItem(active.data.current!.metadata);

      if (!originalActiveItemPosition && isTask) {
        setOriginalActiveItemPosition(active.data.current?.metadata.position);
      }
    }
  };

  const updateStatusPosition = async (newIndex: number) => {
    const status = activeItem as StatusEntity;

    if (status.position === newIndex) {
      return;
    }

    try {
      const project = getParam("project")!;

      const reorderStatusPayload: ReorderStatusPayload = {
        old_index: status.position,
        new_index: newIndex,
        project_id: project,
        status_id: status.id,
      };

      await reorderStatus(reorderStatusPayload);
      pushMessage({
        type: "info",
        message: "Successfully reordered status.",
      });
    } catch (err) {
      pushMessage({
        type: "error",
        message: "Failed to reorder status. Please refresh and try again.",
      });
    }
  };

  const updateTaskPosition = async (newStatusId: string, newIndex: number) => {
    const task = activeItem as TaskEntity;

    if (task.status_id === newStatusId && task.position === newIndex) {
      return;
    }

    try {
      const reorderTaskPayload: ReorderTaskPayload = {
        old_index: originalActiveItemPosition!,
        new_index: newIndex,
        old_status_id: task.status_id,
        new_status_id: newStatusId,
        task_id: task.id,
      };

      await reorderTask(reorderTaskPayload);
      pushMessage({
        type: "info",
        message: "Successfully reordered task.",
      });
    } catch (err) {
      pushMessage({
        type: "error",
        message: "Failed to reorder task. Please refresh and try again.",
      });
    }
  };

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (isStatusEntity(activeItem)) {
      const newIndex = over
        ? over.data.current!.sortable.index
        : sortedStatuses.length - 1;

      updateStatusPosition(newIndex);

      setKanban((prev) => {
        const statuses = prev!.statuses
          .filter((s) => s.id !== active.id)
          .sort((a, b) => a.position - b.position);
        const reordered = [
          ...statuses.slice(0, newIndex),
          { ...activeItem, position: newIndex },
          ...statuses.slice(newIndex),
        ].map((s, idx) => ({ ...s, position: idx }));

        return {
          ...prev!,
          statuses: reordered,
        };
      });
    } else if (isTaskEntity(activeItem)) {
      let position: number;
      let status_id: string;

      if (isStatusEntity(over!.data.current!.metadata)) {
        position = kanban!.tasks.filter(
          (t) => t.status_id === over!.id && t.id !== active.id
        ).length;
        status_id = over!.id as string;
      } else {
        position = over!.data.current!.sortable.index;
        status_id = over!.data.current!.metadata.status_id;
      }

      updateTaskPosition(status_id, position);

      setKanban((prev) => {
        const tasks = prev!.tasks
          .filter((t) => t.status_id === status_id && t.id !== active.id)
          .sort((a, b) => a.position - b.position);

        const reordered = [
          ...tasks.slice(0, position),
          { ...activeItem, status_id, position },
          ...tasks.slice(position),
        ].map((t, idx) => ({ ...t, position: idx }));

        const untouched = prev!.tasks.filter((t) => t.status_id !== status_id);

        const updated = [...reordered, ...untouched];

        return {
          ...prev!,
          tasks: updated,
        };
      });
    }

    setActiveItem(null);
    setOriginalActiveItemPosition(null);
  };

  const onDragOver = (event: DragOverEvent) => {
    const { active, over } = event;

    if (isTaskEntity(activeItem) && over) {
      setKanban((prev) => {
        const reordered = prev!.tasks
          .filter(
            (t) =>
              t.status_id === active.data.current!.metadata.status_id &&
              t.id !== active.id
          )
          .sort((a, b) => a.position - b.position)
          .map((t, idx) => ({ ...t, position: idx }));

        const untouched = prev!.tasks.filter(
          (t) => t.status_id !== active.data.current!.metadata.status_id
        );

        const updated = [
          ...reordered,
          ...untouched,
          {
            ...activeItem,
            status_id: isStatusEntity(over.data.current?.metadata)
              ? over.id
              : over.data.current!.metadata.status_id,
            position: isStatusEntity(over.data.current?.metadata)
              ? prev!.tasks.filter((t) => t.status_id === (over.id as string))
                  .length
              : originalActiveItemPosition!,
          },
        ];

        return {
          ...prev!,
          tasks: updated,
        };
      });
    } else if (isStatusEntity(activeItem) && !over) {
      setKanban((prev) => {
        const reordered = prev!.statuses
          .filter((s) => s.id !== active.id)
          .sort((a, b) => a.position - b.position)
          .map((s, idx) => ({ ...s, position: idx }));

        return {
          ...prev!,
          statuses: [
            ...reordered,
            { ...activeItem, position: reordered.length },
          ],
        };
      });
    }
  };

  const [openModal, setOpenModal] = useState<boolean>(false);

  return (
    <div className={styles.container}>
      {openModal && (
        <Modal close={() => setOpenModal(false)}>
          <CreateStatus closeModal={() => setOpenModal(false)} />
        </Modal>
      )}
      <span className={styles.header}>Kanban Board</span>
      <div className={styles.dragWrapper}>
        <DndContext
          sensors={sensors}
          collisionDetection={rectIntersection}
          modifiers={
            isStatusEntity(activeItem)
              ? [restrictToHorizontalAxis, restrictToParentElement]
              : [restrictToFirstScrollableAncestor]
          }
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          onDragOver={onDragOver}
        >
          <SortableContext
            items={sortedStatuses.map((status) => status.id)}
            strategy={horizontalListSortingStrategy}
          >
            <div className={styles.dragContainer}>
              {sortedStatuses.map((status) => (
                <Status status={status} key={status.id} />
              ))}
              <button
                className={styles.addStatus}
                onClick={() => setOpenModal(true)}
              >
                Add Status
              </button>
            </div>
          </SortableContext>
          <DragOverlay>
            {isStatusEntity(activeItem) && <Status status={activeItem} />}
            {isTaskEntity(activeItem) && <Task task={activeItem} />}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  );
};

export default ActiveBoard;
