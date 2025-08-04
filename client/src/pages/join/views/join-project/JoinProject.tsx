import { useEffect, useState } from "react";
import { FaPeopleRoof } from "react-icons/fa6";
import { acceptInvite } from "../../../../services/invites/invites.service";
import { useAuth } from "../../../../hooks/useAuth";
import { type AcceptInvitePayload } from "../../../../services/invites/types";
import { type GetProjectMetadataResponse } from "../../../../services/projects/types";
import Spinner from "../../../../components/spinner/Spinner";
import Error from "../../../../components/error/Error";
import styles from "./JoinProject.module.scss";
import { useNavigate } from "react-router-dom";

const JoinProject = ({
  project,
  token,
}: {
  project: GetProjectMetadataResponse;
  token: string;
}) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const joinProject = async () => {
    try {
      const acceptInvitePayload: AcceptInvitePayload = {
        member_id: user!.uid,
        project_id: project.id,
        token: token,
      };

      await acceptInvite(acceptInvitePayload);
      navigate(`/dashboard?project=${project.id}`);
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
      <span className={styles.projectName}>{project.name}</span>
      <button className={styles.join} onClick={() => setLoading(true)}>
        Join Team
      </button>
    </div>
  );
};

export default JoinProject;
