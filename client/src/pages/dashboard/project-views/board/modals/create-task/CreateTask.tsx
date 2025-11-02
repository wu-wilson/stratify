import { useEffect, useState } from "react";
import { useKanban } from "../../../../../../hooks/useKanban";
import { useQueryParams } from "../../../../../../hooks/query-params/useQueryParams";
import { useElementHeight } from "../../../../../../hooks/useElementHeight";
import { useAuth } from "../../../../../../hooks/useAuth";
import { validateTaskTitle } from "./util";
import {
  DESCRIPTION_PLACEHOLDER,
  TITLE_PLACEHOLDER,
  SUBTITLE,
} from "./constants";
import { createTask } from "../../../../../../services/tasks/tasks.service";
import { type CreateTaskPayload } from "../../../../../../services/tasks/types";
import Spinner from "../../../../../../components/spinner/Spinner";
import Error from "../../../../../../components/error/Error";
import styles from "./CreateTask.module.scss";

const CreateTask = ({
  closeModal,
  statusId,
}: {
  closeModal: () => void;
  statusId: string;
}) => {
  const { kanban, setKanban } = useKanban();
  const { getParam } = useQueryParams();
  const { ref, height } = useElementHeight<HTMLDivElement>();
  const { user } = useAuth();

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [requestError, setRequestError] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const addTask = async () => {
    try {
      const project = getParam("project")!;

      const createTaskPayload: CreateTaskPayload = {
        project_id: project,
        status_id: statusId,
        created_by: user!.uid,
        assigned_to: null,
        title: title.trim(),
        description: description.trim() || null,
        position: kanban!.tasks.filter((t) => t.status_id === statusId).length,
      };

      const { task: createdTask } = await createTask(createTaskPayload);
      setKanban((prev) => ({
        ...prev!,
        tasks: [...prev!.tasks, createdTask],
      }));

      closeModal();
    } catch (err) {
      setRequestError("createTask endpoint failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loading) {
      addTask();
    }
  }, [loading]);

  useEffect(() => {
    const { valid, msg } = validateTaskTitle(title, kanban!.tasks);
    if (valid) {
      setValidationError(null);
    } else {
      setValidationError(msg);
    }
  }, [title]);

  if (loading) {
    return (
      <div
        className={styles.container}
        style={{ height: height ? `${height}px` : undefined }}
      >
        <Spinner size={50} text="Creating task..." />
      </div>
    );
  }

  if (requestError) {
    return (
      <div
        className={styles.container}
        style={{ height: height ? `${height}px` : undefined }}
      >
        <Error errorMsg={requestError} />
      </div>
    );
  }

  return (
    <div className={styles.container} ref={ref}>
      <span className={styles.title}>New Task</span>
      <span className={styles.subtitle}>{SUBTITLE}</span>
      <input
        className={styles.input}
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        placeholder={TITLE_PLACEHOLDER}
      />
      <div className={styles.inputError}>{validationError}</div>
      <textarea
        className={styles.textarea}
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
        placeholder={DESCRIPTION_PLACEHOLDER}
      />
      <div className={styles.create}>
        <button onClick={() => setLoading(true)} disabled={!!validationError}>
          Create
        </button>
      </div>
    </div>
  );
};

export default CreateTask;
