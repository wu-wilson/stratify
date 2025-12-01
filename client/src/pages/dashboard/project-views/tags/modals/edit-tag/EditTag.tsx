import { useEffect, useState } from "react";
import { useKanban } from "../../../../../../hooks/useKanban";
import { useQueryParams } from "../../../../../../hooks/query-params/useQueryParams";
import { useAuth } from "../../../../../../hooks/useAuth";
import { validateTagName } from "../create-tag/util";
import { updateTag } from "../../../../../../services/tags/tags.service";
import { PLACEHOLDER } from "../create-tag/constants";
import {
  type TagEntity,
  type UpdateTagPayload,
} from "../../../../../../services/tags/types";
import { type RequestTemplate } from "../../../../../../components/modal/modal-template/modal-request-template/types";
import ModalRequestTemplate from "../../../../../../components/modal/modal-template/modal-request-template/ModalRequestTemplate";

const EditTag = ({
  tag,
  closeModal,
}: {
  tag: TagEntity;
  closeModal: () => void;
}) => {
  const { kanban, setKanban } = useKanban();
  const { user } = useAuth();
  const { getParam } = useQueryParams();

  const [name, setName] = useState<string>(tag.name);
  const [color, setColor] = useState<string>(tag.color);
  const [requestError, setRequestError] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const editTag = async () => {
    try {
      const project = getParam("project")!;
      const token = await user!.getIdToken();

      const payload: UpdateTagPayload = {
        id: tag.id,
        name: name,
        color: color,
        project_id: project,
      };

      const { updated: updatedTag } = await updateTag(payload, token);

      setKanban((prev) => ({
        ...prev!,
        tags: prev!.tags.map((tag) =>
          tag.id === updatedTag.id ? updatedTag : tag
        ),
      }));

      closeModal();
    } catch (err) {
      setRequestError("updateTag endpoint failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const { valid, msg } = validateTagName(
      name,
      kanban!.tags.filter((t) => t.id !== tag.id)
    );
    if (valid) {
      setValidationError(null);
    } else {
      setValidationError(msg);
    }
  }, [name]);

  const template: RequestTemplate[] = [
    { type: "title", value: "Edit Tag" },
    {
      type: "input",
      label: "Name",
      value: name,
      setValue: setName,
      placeholder: PLACEHOLDER,
      criticalMsg: validationError,
      autoFocus: true,
    },
    { type: "color-picker", color, setColor },
  ];

  return (
    <ModalRequestTemplate
      template={template}
      loading={loading}
      setLoading={setLoading}
      loadingMsg={"Generating invite..."}
      error={requestError}
      request={editTag}
      button={{ label: "Save", disabled: !!validationError }}
    />
  );
};

export default EditTag;
