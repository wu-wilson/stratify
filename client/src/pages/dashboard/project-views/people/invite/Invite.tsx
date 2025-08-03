import { useEffect, useState } from "react";
import { getInvite } from "../../../../../services/invites/invites.service";
import { useQueryParams } from "../../../../../hooks/query-params/useQueryParams";
import { type InviteEntity } from "../../../../../services/invites/types";
import Spinner from "../../../../../components/spinner/Spinner";
import Error from "../../../../../components/error/Error";
import ActiveInvite from "./views/active-invite/ActiveInvite";
import NoActiveInvite from "./views/no-active-invite/NoActiveInvite";
import styles from "./Invite.module.scss";

const Invite = () => {
  const [invite, setInvite] = useState<InviteEntity | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { getParam } = useQueryParams();
  const project = getParam("project")!;

  useEffect(() => {
    setLoading(true);
  }, [project]);

  const fetchInvite = async () => {
    try {
      const invite = await getInvite(project);
      setError(null);
      setInvite(invite);
    } catch (error) {
      setError("getInvite endpoint failed");
      setInvite(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loading) {
      fetchInvite();
    }
  }, [loading]);

  if (loading) {
    return (
      <div className={styles.container}>
        <Spinner size={50} text={"Fetching invite..."} />
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
      <div className={styles.header}>Invite People to the Team</div>
      {invite ? <ActiveInvite invite={invite} /> : <NoActiveInvite />}
    </div>
  );
};

export default Invite;
