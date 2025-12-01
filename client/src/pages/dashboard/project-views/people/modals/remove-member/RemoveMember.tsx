import { useState } from "react";
import { deleteMember } from "../../../../../../services/members/members.service";
import { useAuth } from "../../../../../../hooks/useAuth";
import { useHistory } from "../../../../../../hooks/useHistory";
import { useQueryParams } from "../../../../../../hooks/query-params/useQueryParams";
import { CONFIRM_STRING, SUBTITLE } from "./constants";
import { useMembers } from "../../../../../../hooks/useMembers";
import {
  type DeleteMemberParams,
  type MemberEntity,
} from "../../../../../../services/members/types";
import { type RequestTemplate } from "../../../../../../components/modal/modal-template/modal-request-template/types";
import ModalRequestTemplate from "../../../../../../components/modal/modal-template/modal-request-template/ModalRequestTemplate";

const RemoveMember = ({
  member,
  closeModal,
}: {
  member: MemberEntity;
  closeModal: () => void;
}) => {
  const { pushToHistory } = useHistory();
  const { getParam } = useQueryParams();
  const { user, displayName } = useAuth();
  const { members, setMembers } = useMembers();

  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const removeMember = async () => {
    try {
      const project = getParam("project")!;
      const token = await user!.getIdToken();

      const params: DeleteMemberParams = {
        member_id: member.id,
        project_id: project,
        deleted_by: user!.uid,
      };

      const removedMember = await deleteMember(params, token);
      setMembers(members!.filter((m) => m.id !== member.id));

      pushToHistory({
        performed_by: displayName ?? user!.uid,
        action_type: "removed_from_project",
        performed_on: member.name,
        occurred_at: removedMember.deleted_on,
      });

      closeModal();
    } catch (err) {
      setError("deleteMember endpoint failed");
    } finally {
      setLoading(false);
    }
  };

  const template: RequestTemplate[] = [
    { type: "title", value: "Remove Member" },
    { type: "subtitle", value: SUBTITLE },
    { type: "highlight", value: member.name },
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
      request={removeMember}
      button={{ label: "Delete", disabled: input !== CONFIRM_STRING }}
    />
  );
};

export default RemoveMember;
