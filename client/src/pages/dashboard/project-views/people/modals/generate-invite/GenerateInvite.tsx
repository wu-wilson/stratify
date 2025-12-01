import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { useHistory } from "../../../../../../hooks/useHistory";
import { useQueryParams } from "../../../../../../hooks/query-params/useQueryParams";
import { useAuth } from "../../../../../../hooks/useAuth";
import { createInvite } from "../../../../../../services/invites/invites.service";
import { validateMaxUses } from "./util";
import { SUBTITLE } from "./constants";
import {
  type CreateInvitePayload,
  type InviteEntity,
} from "../../../../../../services/invites/types";
import { type RequestTemplate } from "../../../../../../components/modal/modal-template/modal-request-template/types";
import ModalRequestTemplate from "../../../../../../components/modal/modal-template/modal-request-template/ModalRequestTemplate";

const GenerateInvite = ({
  invite,
  setInvite,
  closeModal,
}: {
  invite: InviteEntity | null;
  setInvite: Dispatch<SetStateAction<InviteEntity | null>>;
  closeModal: () => void;
}) => {
  const { pushToHistory } = useHistory();
  const { getParam } = useQueryParams();
  const { user, displayName } = useAuth();

  const [maxUses, setMaxUses] = useState<string>("20");
  const [validationError, setValidationError] = useState<string | null>(null);
  const onMaxUsesChange = (val: string) => {
    if (/^\d*$/.test(val)) {
      setMaxUses(val);
    }
  };

  useEffect(() => {
    const { valid, msg } = validateMaxUses(maxUses);
    if (valid) {
      setValidationError(null);
    } else {
      setValidationError(msg);
    }
  }, [maxUses]);

  const [loading, setLoading] = useState<boolean>(false);
  const [requestError, setRequestError] = useState<string | null>(null);

  const generateInvite = async () => {
    try {
      const project = getParam("project")!;
      const token = await user!.getIdToken();

      const payload: CreateInvitePayload = {
        project_id: project,
        max_uses: parseInt(maxUses, 10),
        created_by: user!.uid,
        paused: invite ? invite.paused : false,
      };

      const { invite: createdInvite } = await createInvite(payload, token);
      setInvite(createdInvite);
      pushToHistory({
        performed_by: displayName ?? user!.uid,
        action_type: "created_invite",
        performed_on: null,
        occurred_at: createdInvite.created_on,
      });

      closeModal();
    } catch (err) {
      setRequestError("createInvite endpoint failed");
    } finally {
      setLoading(false);
    }
  };

  const template: RequestTemplate[] = [
    { type: "title", value: "Generate Invite" },
    { type: "subtitle", value: SUBTITLE },
    {
      type: "input",
      label: "Max # uses",
      value: maxUses,
      setValue: onMaxUsesChange,
      criticalMsg: validationError,
      autoFocus: true,
    },
  ];

  return (
    <ModalRequestTemplate
      template={template}
      loading={loading}
      setLoading={setLoading}
      loadingMsg={"Generating invite..."}
      error={requestError}
      request={generateInvite}
      button={{ label: "Generate", disabled: !!validationError }}
    />
  );
};

export default GenerateInvite;
