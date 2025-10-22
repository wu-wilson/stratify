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
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";
import {
  restrictToFirstScrollableAncestor,
  restrictToHorizontalAxis,
  restrictToParentElement,
} from "@dnd-kit/modifiers";
import { useKanban } from "../../../../../../hooks/useKanban";
import { useMemo, useState } from "react";
import { isStatusEntity, isTaskEntity } from "./types";
import { type TaskEntity } from "../../../../../../services/tasks/types";
import { type StatusEntity } from "../../../../../../services/statuses/types";
import Status from "./status/Status";
import Task from "./status/task/Task";
import styles from "./ActiveBoard.module.scss";

const ActiveBoard = () => {
  const { kanban, setKanban } = useKanban();

  const sensors = useSensors(useSensor(PointerSensor));

  const sortedStatuses = useMemo(() => {
    return kanban!.statuses.sort((a, b) => a.position - b.position);
  }, [kanban!.statuses]);

  const [activeItem, setActiveItem] = useState<
    StatusEntity | TaskEntity | null
  >(null);

  const onDragStart = (event: DragStartEvent) => {
    const { active } = event;

    if (
      isStatusEntity(active.data.current?.metadata) ||
      isTaskEntity(active.data.current?.metadata)
    ) {
      setActiveItem(active.data.current.metadata);
    }
  };

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (isStatusEntity(active.data.current?.metadata)) {
      const oldIndex = active.data.current.metadata.position;
      const newIndex = over!.data.current!.sortable.index;

      setKanban((prev) => {
        const moved = arrayMove(sortedStatuses, oldIndex, newIndex);
        const updated = moved.map((s, idx) => ({ ...s, position: idx }));

        return {
          ...prev!,
          statuses: updated,
        };
      });
    } else if (isTaskEntity(active.data.current?.metadata)) {
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

      setKanban((prev) => {
        const tasks = prev!.tasks
          .filter((t) => t.status_id === status_id && t.id !== active.id)
          .sort((a, b) => a.position - b.position);

        const reordered = [
          ...tasks.slice(0, position),
          { ...active.data.current!.metadata, status_id, position },
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
  };

  const onDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over || !isTaskEntity(active.data.current?.metadata)) {
      return;
    }

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
          ...active.data.current!.metadata,
          status_id: isStatusEntity(over.data.current?.metadata)
            ? over.id
            : over.data.current!.metadata.status_id,
        },
      ];

      return {
        ...prev!,
        tasks: updated,
      };
    });
  };

  return (
    <div className={styles.container}>
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
