import { useState } from "react";
import { useHistory } from "../../../../../../hooks/useHistory";
import { updateRole } from "../../../../../../services/members/members.service";
import { CONFIRM_STRING, SUBTITLE } from "./constants";
import { useMembers } from "../../../../../../hooks/useMembers";
import { useQueryParams } from "../../../../../../hooks/query-params/useQueryParams";
import { useAuth } from "../../../../../../hooks/useAuth";
import {
  type MemberEntity,
  type UpdateRolePayload,
} from "../../../../../../services/members/types";
import { type RequestTemplate } from "../../../../../../components/modal/modal-template/modal-request-template/types";
import ModalRequestTemplate from "../../../../../../components/modal/modal-template/modal-request-template/ModalRequestTemplate";

const MakeOwner = ({
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

  const makeOwner = async () => {
    try {
      const project = getParam("project")!;
      const token = await user!.getIdToken();

      const payload: UpdateRolePayload = {
        member_id: member.id,
        project_id: project,
        role: "owner",
        updated_by: user!.uid,
      };

      const updated = await updateRole(payload, token);
      setMembers(
        members!.map((m) => (m.id === member.id ? { ...m, role: "owner" } : m))
      );

      pushToHistory({
        performed_by: displayName ?? user!.uid,
        action_type: "promoted_to_owner",
        performed_on: member.name,
        occurred_at: updated.updated_on,
      });

      closeModal();
    } catch (err) {
      setError("updateRole endpoint failed");
    } finally {
      setLoading(false);
    }
  };

  const template: RequestTemplate[] = [
    { type: "title", value: "Make Owner" },
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
      request={makeOwner}
      button={{ label: "Save", disabled: input !== CONFIRM_STRING }}
    />
  );
};

export default MakeOwner;
