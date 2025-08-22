import {
  useEffect,
  useState,
  type ChangeEvent,
  type Dispatch,
  type SetStateAction,
} from "react";
import { useHistory } from "../../../../../../hooks/useHistory";
import { useQueryParams } from "../../../../../../hooks/query-params/useQueryParams";
import { useAuth } from "../../../../../../hooks/useAuth";
import { useElementHeight } from "../../../../../../hooks/useElementHeight";
import { createInvite } from "../../../../../../services/invites/invites.service";
import { validateMaxUses } from "./util";
import {
  type CreateInvitePayload,
  type InviteEntity,
} from "../../../../../../services/invites/types";
import Spinner from "../../../../../../components/spinner/Spinner";
import Error from "../../../../../../components/error/Error";
import styles from "./GenerateInvite.module.scss";

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
  const { ref, height } = useElementHeight<HTMLDivElement>();

  const [maxUses, setMaxUses] = useState<string>("20");
  const [validationError, setValidationError] = useState<string | null>(null);
  const onMaxUsesChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
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

      const createInvitePayload: CreateInvitePayload = {
        project_id: project,
        max_uses: parseInt(maxUses, 10),
        created_by: user!.uid,
        paused: invite ? invite.paused : false,
      };

      const { invite: createdInvite } = await createInvite(createInvitePayload);
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

  useEffect(() => {
    if (loading) {
      generateInvite();
    }
  }, [loading]);

  if (loading) {
    return (
      <div
        className={styles.container}
        style={{ height: height ? `${height}px` : undefined }}
      >
        <Spinner size={50} text="Generating link..." />
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
      <span className={styles.title}>Generate Invite</span>
      <label className={styles.label}>Max # of Uses</label>
      <input
        className={styles.input}
        value={maxUses}
        onChange={onMaxUsesChange}
        autoFocus
      />
      <div className={styles.inputError}>{validationError}</div>
      <div className={styles.generate}>
        <button onClick={() => setLoading(true)} disabled={!!validationError}>
          Generate
        </button>
      </div>
    </div>
  );
};

export default GenerateInvite;
