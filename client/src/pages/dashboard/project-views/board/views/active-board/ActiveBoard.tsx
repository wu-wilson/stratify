import { useMemo } from "react";
import { useKanban } from "../../../../../../hooks/useKanban";
import { useQueryParams } from "../../../../../../hooks/query-params/useQueryParams";
import { useSnackbar } from "../../../../../../hooks/useSnackbar";
import { updateStatusIndex } from "../../../../../../services/statuses/statuses.service";
import {
  restrictToHorizontalAxis,
  restrictToParentElement,
} from "@dnd-kit/modifiers";
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";
import {
  closestCenter,
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  type StatusEntity,
  type UpdateStatusIndexPayload,
} from "../../../../../../services/statuses/types";
import { type SnackbarMessage } from "../../../../../../contexts/snackbar/types";
import Status from "./status/Status";
import styles from "./ActiveBoard.module.scss";

const ActiveBoard = () => {
  const { kanban, setKanban } = useKanban()!;
  const { getParam } = useQueryParams();
  const { pushMessage } = useSnackbar();

  const sortedStatuses = useMemo(
    () => kanban!.statuses.slice().sort((a, b) => a.position - b.position),
    [kanban!.statuses]
  );

  const sensors = useSensors(useSensor(PointerSensor));

  const updateStatusPosition = async (
    status: StatusEntity,
    newIndex: number
  ) => {
    try {
      const project = getParam("project")!;

      const updateStatusIndexPayload: UpdateStatusIndexPayload = {
        project_id: project,
        status_id: status.id,
        old_index: status.position,
        new_index: newIndex,
      };

      await updateStatusIndex(updateStatusIndexPayload);

      const snackbarSuccessMessage = {
        type: "info",
        message: "Successfully reordered status.",
      } as Omit<SnackbarMessage, "id">;
      pushMessage(snackbarSuccessMessage);
    } catch (err) {
      const snackbarFailureMessage = {
        type: "error",
        message: "Failed to reorder status. Please try again.",
      } as Omit<SnackbarMessage, "id">;
      pushMessage(snackbarFailureMessage);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) {
      return;
    }

    const status = sortedStatuses.find((s) => s.id === active.id)!;
    const newIndex = sortedStatuses.findIndex((s) => s.id === over.id);

    setKanban((prevKanban) => {
      const moved = arrayMove(sortedStatuses, status.position, newIndex);
      const updated = moved.map((s, idx) => ({ ...s, position: idx }));

      return {
        ...prevKanban!,
        statuses: updated,
      };
    });

    updateStatusPosition(status, newIndex);
  };

  return (
    <div className={styles.container}>
      <span className={styles.header}>Kanban Board</span>
      <div className={styles.dragWrapper}>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          modifiers={[restrictToHorizontalAxis, restrictToParentElement]}
          onDragEnd={handleDragEnd}
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
        </DndContext>
      </div>
    </div>
  );
};

export default ActiveBoard;
