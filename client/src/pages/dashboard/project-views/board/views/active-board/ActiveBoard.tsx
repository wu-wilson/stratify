import {
  DndContext,
  DragOverlay,
  PointerSensor,
  rectIntersection,
  useSensor,
  useSensors,
  type DragOverEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import {
  horizontalListSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";
import { useKanban } from "../../../../../../hooks/useKanban";
import { useEffect, useMemo, useState } from "react";
import { Draggable, type DragItem } from "./types";
import { type TaskEntity } from "../../../../../../services/tasks/types";
import Status from "./status/Status";
import Task from "./status/task/Task";
import styles from "./ActiveBoard.module.scss";
import {
  restrictToFirstScrollableAncestor,
  restrictToHorizontalAxis,
  restrictToParentElement,
} from "@dnd-kit/modifiers";

const ActiveBoard = () => {
  const { kanban, setKanban } = useKanban();

  const sensors = useSensors(useSensor(PointerSensor));

  const sortedStatuses = useMemo(() => {
    return kanban!.statuses.sort((a, b) => a.position - b.position);
  }, [kanban!.statuses]);

  const [activeItem, setActiveItem] = useState<DragItem | null>(null);
  const [dragOverItem, setDragOverItem] = useState<DragItem | null>(null);

  const onDragStart = (event: DragStartEvent) => {
    const { active } = event;

    const activeItem = {
      id: active.id,
      type: active.data.current?.type,
      data:
        active.data.current?.type === Draggable.STATUS
          ? active.data.current?.status
          : active.data.current?.task,
    } as DragItem;

    setActiveItem(activeItem);
  };

  const onDragEnd = (event: DragStartEvent) => {
    setActiveItem(null);
    setDragOverItem(null);

    console.log("Drag ended", event);
  };

  const onDragOver = (event: DragOverEvent) => {
    const { over } = event;
    if (!over) {
      return;
    }

    const dragOverItem = {
      id: over.id,
      type: over.data.current?.type,
      data:
        over.data.current?.type === Draggable.STATUS
          ? over.data.current?.status
          : over.data.current?.task,
    } as DragItem;

    setDragOverItem(dragOverItem);
  };

  useEffect(() => {
    if (!activeItem || !dragOverItem || activeItem.type !== Draggable.TASK) {
      return;
    }

    let dragOverStatusId: string;

    if (dragOverItem.type === Draggable.STATUS) {
      dragOverStatusId = dragOverItem.id;
    } else {
      dragOverStatusId = dragOverItem.data.status_id;
    }

    const task = activeItem.data as TaskEntity;

    setKanban((prev) => {
      if (!prev) {
        return prev;
      }

      return {
        ...prev,
        tasks: prev.tasks.map((t) =>
          t.id === task.id ? { ...t, status_id: dragOverStatusId } : t
        ),
      };
    });
  }, [activeItem, dragOverItem]);

  return (
    <div className={styles.container}>
      <span className={styles.header}>Kanban Board</span>
      <div className={styles.dragWrapper}>
        <DndContext
          sensors={sensors}
          collisionDetection={rectIntersection}
          modifiers={
            activeItem?.type === Draggable.STATUS
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
            </div>
          </SortableContext>
          <DragOverlay>
            {activeItem?.type === Draggable.STATUS && (
              <Status status={activeItem.data} />
            )}
            {activeItem?.type === Draggable.TASK && (
              <Task task={activeItem.data} />
            )}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  );
};

export default ActiveBoard;
