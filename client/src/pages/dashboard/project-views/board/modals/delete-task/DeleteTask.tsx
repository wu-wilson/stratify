import { useState } from "react";
import { useKanban } from "../../../../../../hooks/useKanban";
import { CONFIRM_STRING, SUBTITLE } from "./constants";
import { deleteTask } from "../../../../../../services/tasks/tasks.service";
import { useQueryParams } from "../../../../../../hooks/query-params/useQueryParams";
import { useAuth } from "../../../../../../hooks/useAuth";
import {
  type DeleteTaskParams,
  type TaskEntity,
} from "../../../../../../services/tasks/types";
import { type RequestTemplate } from "../../../../../../components/modal/modal-template/modal-request-template/types";
import ModalRequestTemplate from "../../../../../../components/modal/modal-template/modal-request-template/ModalRequestTemplate";

const DeleteTask = ({
  task,
  closeModal,
}: {
  task: TaskEntity;
  closeModal: () => void;
}) => {
  const { kanban, setKanban } = useKanban();
  const { getParam } = useQueryParams();
  const { user } = useAuth();

  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const removeTask = async () => {
    try {
      const project = getParam("project")!;
      const token = await user!.getIdToken();

      const params: DeleteTaskParams = {
        task_id: task.id,
        status_id: task.status_id,
        index: task.position,
        project_id: project,
      };

      await deleteTask(params, token);

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

  const template: RequestTemplate[] = [
    { type: "title", value: "Delete Task" },
    { type: "subtitle", value: SUBTITLE },
    { type: "highlight", value: task.title },
    {
      type: "input",
      value: input,
      setValue: setInput,
      placeholder: CONFIRM_STRING,
      criticalMsg: `Type ${CONFIRM_STRING} to confirm`,
      autoFocus: true,
    },
  ];

  return (
    <ModalRequestTemplate
      template={template}
      loading={loading}
      setLoading={setLoading}
      loadingMsg={"Deleting task..."}
      error={error}
      request={removeTask}
      button={{ label: "Delete", disabled: input !== CONFIRM_STRING }}
    />
  );
};

export default DeleteTask;
