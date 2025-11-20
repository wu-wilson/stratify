import { useEffect, useState } from "react";
import { FaPeopleRoof } from "react-icons/fa6";
import { acceptInvite } from "../../../../services/invites/invites.service";
import { useAuth } from "../../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import {
  type AcceptInvitePayload,
  type GetInviteMetadataResponse,
} from "../../../../services/invites/types";
import Spinner from "../../../../components/spinner/Spinner";
import Error from "../../../../components/error/Error";
import styles from "./ValidInvite.module.scss";

const ValidInvite = ({
  inviteMetadata,
  inviteToken,
}: {
  inviteMetadata: GetInviteMetadataResponse;
  inviteToken: string;
}) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const joinProject = async () => {
    try {
      const token = await user!.getIdToken();

      const payload: AcceptInvitePayload = {
        member_id: user!.uid,
        project_id: inviteMetadata.project.id,
        token: inviteToken,
      };

      await acceptInvite(payload, token);
      navigate(`/dashboard?project=${inviteMetadata.project.id}`);
    } catch (error) {
      setError("acceptInvite endpoint failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loading) {
      joinProject();
    }
  }, [loading]);

  if (loading) {
    return (
      <div className={styles.container}>
        <Spinner size={50} text="Joining project..." />
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
      <span className={styles.title}>
        Join Team
        <FaPeopleRoof className={styles.icon} />
      </span>
      <span className={styles.subtext}>
        You have been invited to join the team for a new project!
      </span>
      <span className={styles.projectName}>{inviteMetadata.project.name}</span>
      <button className={styles.join} onClick={() => setLoading(true)}>
        Join Team
      </button>
    </div>
  );
};

export default ValidInvite;
