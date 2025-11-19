import { useEffect, useState } from "react";
import { useKanban } from "../../../../../../hooks/useKanban";
import { CONFIRM_STRING, SUBTITLE } from "./constants";
import { useElementHeight } from "../../../../../../hooks/useElementHeight";
import { deleteTask } from "../../../../../../services/tasks/tasks.service";
import {
  type DeleteTaskParams,
  type TaskEntity,
} from "../../../../../../services/tasks/types";
import Spinner from "../../../../../../components/spinner/Spinner";
import Error from "../../../../../../components/error/Error";
import styles from "../../../../../../components/modal/BaseModalContent.module.scss";

const DeleteTask = ({
  task,
  closeModal,
}: {
  task: TaskEntity;
  closeModal: () => void;
}) => {
  const { kanban, setKanban } = useKanban();
  const { ref, height } = useElementHeight<HTMLDivElement>();

  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const removeTask = async () => {
    try {
      const params: DeleteTaskParams = {
        task_id: task.id,
        status_id: task.status_id,
        index: task.position,
      };

      await deleteTask(params);

      const updatedTasks = kanban!.tasks
        .filter((t) => t.id !== task.id && t.status_id === task.status_id)
        .sort((a, b) => a.position - b.position)
        .map((s, idx) => ({
          ...s,
          position: idx,
        }));
      const untouched = kanban!.tasks.filter(
        (t) => t.status_id !== task.status_id
      );

      setKanban((prev) => ({
        ...prev!,
        tasks: [...untouched, ...updatedTasks],
      }));

      closeModal();
    } catch (err) {
      setError("deleteTask endpoint failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loading) {
      removeTask();
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
      <span className={styles.title}>Delete Task</span>
      <span className={styles.subtitle}>{SUBTITLE}</span>
      <span className={styles.highlightedMsg}>{task.title}</span>
      <input
        className={styles.input}
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
        placeholder={CONFIRM_STRING}
        autoFocus
      />
      <div className={styles.criticalInputMsg}>
        Type {CONFIRM_STRING} to confirm
      </div>
      <div className={styles.button}>
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

export default DeleteTask;
