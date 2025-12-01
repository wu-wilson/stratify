import { useState } from "react";
import { useKanban } from "../../../../../../hooks/useKanban";
import { useQueryParams } from "../../../../../../hooks/query-params/useQueryParams";
import { useAuth } from "../../../../../../hooks/useAuth";
import { CONFIRM_STRING, SUBTITLE } from "./constants";
import { deleteStatus } from "../../../../../../services/statuses/statuses.service";
import {
  type DeleteStatusParams,
  type StatusEntity,
} from "../../../../../../services/statuses/types";
import { type RequestTemplate } from "../../../../../../components/modal/modal-template/modal-request-template/types";
import ModalRequestTemplate from "../../../../../../components/modal/modal-template/modal-request-template/ModalRequestTemplate";

const DeleteStatus = ({
  status,
  closeModal,
}: {
  status: StatusEntity;
  closeModal: () => void;
}) => {
  const { kanban, setKanban } = useKanban();
  const { getParam } = useQueryParams();
  const { user } = useAuth();

  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const removeStatus = async () => {
    try {
      const project = getParam("project")!;
      const token = await user!.getIdToken();

      const params: DeleteStatusParams = {
        project_id: project,
        status_id: status.id,
        index: status.position,
      };

      await deleteStatus(params, token);

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

  const template: RequestTemplate[] = [
    { type: "title", value: "Delete Status" },
    { type: "subtitle", value: SUBTITLE },
    { type: "highlight", value: status.name },
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
      loadingMsg={"Deleting status..."}
      error={error}
      request={removeStatus}
      button={{ label: "Delete", disabled: input !== CONFIRM_STRING }}
    />
  );
};

export default DeleteStatus;
