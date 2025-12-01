import { useEffect, useState } from "react";
import { PLACEHOLDER, SUBTITLE } from "./constants";
import { useKanban } from "../../../../../../hooks/useKanban";
import { useAuth } from "../../../../../../hooks/useAuth";
import { useQueryParams } from "../../../../../../hooks/query-params/useQueryParams";
import { validateTagName } from "./util";
import { createTag } from "../../../../../../services/tags/tags.service";
import { getCSSVar } from "../../../../../../styles/util";
import { type CreateTagPayload } from "../../../../../../services/tags/types";
import { type RequestTemplate } from "../../../../../../components/modal/modal-template/modal-request-template/types";
import ModalRequestTemplate from "../../../../../../components/modal/modal-template/modal-request-template/ModalRequestTemplate";

const CreateTag = ({ closeModal }: { closeModal: () => void }) => {
  const { kanban, setKanban } = useKanban();
  const { getParam } = useQueryParams();
  const { user } = useAuth();

  const [name, setName] = useState<string>("");
  const [color, setColor] = useState<string>(getCSSVar("--primary-color"));
  const [requestError, setRequestError] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const addTag = async () => {
    try {
      const project = getParam("project")!;
      const token = await user!.getIdToken();

      const payload: CreateTagPayload = {
        project_id: project,
        name: name,
        color: color,
        created_by: user!.uid,
      };

      const { tag: createdTag } = await createTag(payload, token);

      setKanban((prev) => ({
        ...prev!,
        tags: [...prev!.tags, createdTag],
      }));

      closeModal();
    } catch (err) {
      setRequestError("createTag endpoint failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const { valid, msg } = validateTagName(name, kanban!.tags);
    if (valid) {
      setValidationError(null);
    } else {
      setValidationError(msg);
    }
  }, [name]);

  const template: RequestTemplate[] = [
    { type: "title", value: "New Tag" },
    { type: "subtitle", value: SUBTITLE },
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
      loadingMsg={"Creating tag..."}
      error={requestError}
      request={addTag}
      button={{ label: "Create", disabled: !!validationError }}
    />
  );
};

export default CreateTag;
