import { useState } from "react";
import { useQueryParams } from "../../../../../../hooks/query-params/useQueryParams";
import { useKanban } from "../../../../../../hooks/useKanban";
import { useAuth } from "../../../../../../hooks/useAuth";
import { deleteTag } from "../../../../../../services/tags/tags.service";
import { CONFIRM_STRING, SUBTITLE } from "./constants";
import { type TagEntity } from "../../../../../../services/tags/types";
import { type TaggingEntity } from "../../../../../../services/taggings/types";
import { type RequestTemplate } from "../../../../../../components/modal/modal-template/modal-request-template/types";
import ModalRequestTemplate from "../../../../../../components/modal/modal-template/modal-request-template/ModalRequestTemplate";

const DeleteTag = ({
  tag,
  closeModal,
}: {
  tag: TagEntity;
  closeModal: () => void;
}) => {
  const { setKanban } = useKanban();
  const { getParam } = useQueryParams();
  const { user } = useAuth();

  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const removeTag = async () => {
    try {
      const project = getParam("project")!;
      const token = await user!.getIdToken();

      await deleteTag(tag.id, project, token);

      setKanban((prev) => ({
        ...prev!,
        tags: prev!.tags.filter((t: TagEntity) => t.id !== tag.id),
        taggings: prev!.taggings.filter(
          (t: TaggingEntity) => t.tag_id !== tag.id
        ),
      }));

      closeModal();
    } catch (err) {
      setError("deleteTag endpoint failed");
    } finally {
      setLoading(false);
    }
  };

  const template: RequestTemplate[] = [
    { type: "title", value: "Delete Tag" },
    { type: "subtitle", value: SUBTITLE },
    { type: "highlight", value: tag.name },
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
      loadingMsg={"Updating role..."}
      error={error}
      request={removeTag}
      button={{ label: "Delete", disabled: input !== CONFIRM_STRING }}
    />
  );
};

export default DeleteTag;
