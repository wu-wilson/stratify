import { useEffect, useState } from "react";
import { useHistory } from "../../../../../hooks/useHistory";
import { getInvite } from "../../../../../services/invites/invites.service";
import { useAuth } from "../../../../../hooks/useAuth";
import { useQueryParams } from "../../../../../hooks/query-params/useQueryParams";
import { type InviteEntity } from "../../../../../services/invites/types";
import Spinner from "../../../../../components/spinner/Spinner";
import Error from "../../../../../components/error/Error";
import ActiveInvite from "./views/active-invite/ActiveInvite";
import NoActiveInvite from "./views/no-active-invite/NoActiveInvite";
import styles from "./Invite.module.scss";

const Invite = () => {
  const { loading: historyLoading, error: historyError } = useHistory();
  const [invite, setInvite] = useState<InviteEntity | null>(null);
  const [inviteLoading, setInviteLoading] = useState<boolean>(true);
  const [inviteError, setInviteError] = useState<string | null>(null);

  const { user } = useAuth();
  const { getParam } = useQueryParams();
  const project = getParam("project")!;

  useEffect(() => {
    setInviteLoading(true);
  }, [project]);

  const fetchInvite = async () => {
    try {
      const token = await user!.getIdToken();
      const invite = await getInvite(project, token);
      setInviteError(null);
      setInvite(invite);
    } catch (error) {
      setInviteError("getInvite endpoint failed");
      setInvite(null);
    } finally {
      setInviteLoading(false);
    }
  };

  useEffect(() => {
    if (inviteLoading) {
      fetchInvite();
    }
  }, [inviteLoading]);

  if (inviteLoading || historyLoading) {
    return (
      <div className={styles.container}>
        <Spinner size={50} text="Fetching invite..." />
      </div>
    );
  }

  const errorMsg = historyError || inviteError;
  if (errorMsg) {
    return (
      <div className={styles.container}>
        <Error errorMsg={errorMsg} />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {invite ? (
        <ActiveInvite invite={invite} setInvite={setInvite} />
      ) : (
        <NoActiveInvite setInvite={setInvite} />
      )}
    </div>
  );
};

export default Invite;
