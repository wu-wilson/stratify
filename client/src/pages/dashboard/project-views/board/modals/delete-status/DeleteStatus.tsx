import { useEffect, useState } from "react";
import { useKanban } from "../../../../../../hooks/useKanban";
import { useQueryParams } from "../../../../../../hooks/query-params/useQueryParams";
import { CONFIRM_STRING, SUBTITLE } from "./constants";
import { useElementHeight } from "../../../../../../hooks/useElementHeight";
import { deleteStatus } from "../../../../../../services/statuses/statuses.service";
import {
  type DeleteStatusParams,
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
  const { getParam } = useQueryParams();
  const { ref, height } = useElementHeight<HTMLDivElement>();

  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const removeStatus = async () => {
    try {
      const project = getParam("project")!;

      const params: DeleteStatusParams = {
        project_id: project,
        status_id: status.id,
        index: status.position,
      };

      await deleteStatus(params);

      const updatedStatuses = kanban!.statuses
        .filter((s) => s.id !== status.id)
        .sort((a, b) => a.position - b.position)
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
      <span className={styles.subtitle}>{SUBTITLE}</span>
      <span className={styles.warning}>{status.name}</span>
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
