import { BASE_JOIN_URL } from "./constants";
import { useEffect, useMemo, useState } from "react";
import { useQueryParams } from "../../../../../../../hooks/query-params/useQueryParams";
import { useHistory } from "../../../../../../../hooks/useHistory";
import { updateInviteStatus } from "../../../../../../../services/invites/invites.service";
import { useAuth } from "../../../../../../../hooks/useAuth";
import { useTimeFormat } from "../../../../../../../hooks/useTimeFormat";
import {
  type InviteEntity,
  type UpdateInviteStatusPayload,
} from "../../../../../../../services/invites/types";
import Modal from "../../../../../../../components/modal/Modal";
import GenerateInvite from "../../generate-invite/GenerateInvite";
import Copy from "../../../../../../../components/copy/Copy";
import Toggle from "../../../../../../../components/toggle/Toggle";
import Spinner from "../../../../../../../components/spinner/Spinner";
import Error from "../../../../../../../components/error/Error";
import moment from "moment-timezone";
import styles from "./ActiveInvite.module.scss";

const ActiveInvite = ({
  invite,
  setInvite,
}: {
  invite: InviteEntity;
  setInvite: (invite: InviteEntity | null) => void;
}) => {
  const { pushToHistory } = useHistory();
  const { getParam } = useQueryParams();
  const { user, displayName } = useAuth();
  const { formatString } = useTimeFormat();
  const createdOn = useMemo(
    () => moment(invite.created_on).format(formatString),
    [invite.created_on, formatString]
  );
  const [joinsEnabled, setJoinsEnabled] = useState<boolean>(!invite.paused);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (joinsEnabled !== !invite.paused) {
      setLoading(true);
    }
  }, [joinsEnabled, invite.paused]);

  const syncInviteStatus = async () => {
    try {
      const project = getParam("project")!;

      const updateInviteStatusPayload: UpdateInviteStatusPayload = {
        project_id: project,
        paused: !joinsEnabled,
        updated_by: user!.uid,
      };

      const { updated, updated_on } = await updateInviteStatus(
        updateInviteStatusPayload
      );
      setInvite(updated);
      pushToHistory({
        performed_by: displayName ?? user!.uid,
        action_type: updateInviteStatusPayload.paused
          ? "paused_invite"
          : "unpaused_invite",
        performed_on: null,
        occurred_at: updated_on,
      });
    } catch (err) {
      setError("updateInviteStatus endpoint failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loading) {
      syncInviteStatus();
    }
  }, [loading]);

  const [openModal, setOpenModal] = useState<boolean>(false);

  if (loading) {
    return (
      <div className={styles.container}>
        <Spinner
          size={50}
          text={joinsEnabled ? "Enabling joins" : "Disabling joins..."}
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <Error errorMsg={error} />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {openModal && (
        <Modal close={() => setOpenModal(false)}>
          <GenerateInvite
            invite={invite}
            setInvite={setInvite}
            closeModal={() => setOpenModal(false)}
          />
        </Modal>
      )}
      <div className={styles.header}>Invite People to the Team</div>
      <div className={styles.section}>
        <div className={styles.row}>
          Invite Link
          <Copy text={`${BASE_JOIN_URL}/${invite.token}`} />
        </div>
        <div className={styles.row}>
          Joins Enabled
          <Toggle
            id={"joins-enabled-toggle"}
            checked={joinsEnabled}
            setChecked={setJoinsEnabled}
          />
        </div>
      </div>
      <div className={styles.section}>
        <div className={styles.row}>
          Max # of Uses
          <span>{invite.max_uses}</span>
        </div>
        <div className={styles.row}>
          Current # of Uses
          <span>{invite.uses}</span>
        </div>
        <div className={styles.row}>
          Created On
          <span>{createdOn}</span>
        </div>
      </div>
      <div className={styles.generateInvite}>
        <button onClick={() => setOpenModal(true)}>
          Generate New Invite Link
        </button>
      </div>
    </div>
  );
};

export default ActiveInvite;
