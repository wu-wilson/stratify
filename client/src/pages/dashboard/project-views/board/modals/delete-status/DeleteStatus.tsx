import { useEffect, useMemo, useState } from "react";
import { useKanban } from "../../../../../../hooks/useKanban";
import { CONFIRM_STRING } from "./constants";
import { useElementHeight } from "../../../../../../hooks/useElementHeight";
import { deleteStatus } from "../../../../../../services/statuses/statuses.service";
import {
  type DeleteStatusPayload,
  type StatusEntity,
} from "../../../../../../services/statuses/types";
import Spinner from "../../../../../../components/spinner/Spinner";
import Error from "../../../../../../components/error/Error";
import styles from "./DeleteStatus.module.scss";

const DeleteStatus = ({
  status,
  closeModal,
}: {
  status: StatusEntity;
  closeModal: () => void;
}) => {
  const { kanban, setKanban } = useKanban();
  const { ref, height } = useElementHeight<HTMLDivElement>();

  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const taskCount = useMemo(() => {
    return kanban!.tasks.filter((t) => t.status_id === status.id).length;
  }, [kanban!.tasks, status.id]);

  const removeStatus = async () => {
    try {
      const deleteStatusPayload: DeleteStatusPayload = {
        status_id: status.id,
        index: status.position,
      };

      await deleteStatus(deleteStatusPayload);

      const updatedStatuses = kanban!.statuses
        .filter((s) => s.id !== status.id)
        .map((s, idx) => ({
          ...s,
          position: idx,
        }));
      const updatedTasks = kanban!.tasks.filter(
        (t) => t.status_id !== status.id
      );

      setKanban((prev) => ({
        ...prev!,
        statuses: updatedStatuses,
        tasks: updatedTasks,
      }));

      closeModal();
    } catch (err) {
      setError("deleteStatus endpoint failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loading) {
      removeStatus();
    }
  }, [loading]);

  if (loading) {
    return (
      <div
        className={styles.container}
        style={{ height: height ? `${height}px` : undefined }}
      >
        <Spinner size={50} text="Removing status..." />
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={styles.container}
        style={{ height: height ? `${height}px` : undefined }}
      >
        <Error errorMsg={error} />
      </div>
    );
  }

  return (
    <div className={styles.container} ref={ref}>
      <span className={styles.title}>Delete Status</span>
      <span className={styles.subtitle}>
        Are you sure you want to delete {status.name}?
      </span>
      <span className={styles.warning}>
        Its tasks will also be deleted ({taskCount}).
      </span>
      <input
        className={styles.input}
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
        placeholder={CONFIRM_STRING}
        autoFocus
      />
      <div className={styles.inputMsg}>Type {CONFIRM_STRING} to confirm</div>
      <div className={styles.delete}>
        <button
          onClick={() => setLoading(true)}
          disabled={input !== CONFIRM_STRING}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteStatus;
