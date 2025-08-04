import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useParams } from "react-router-dom";
import { getProjectMetadata } from "../../services/projects/projects.service";
import { type GetProjectMetadataResponse } from "../../services/projects/types";
import Spinner from "../../components/spinner/Spinner";
import Error from "../../components/error/Error";
import AlreadyJoined from "./views/already-joined/AlreadyJoined";
import JoinProject from "./views/join-project/JoinProject";
import styles from "./Join.module.scss";

const Join = () => {
  const { user } = useAuth();
  const { token } = useParams();
  const [project, setProject] = useState<GetProjectMetadataResponse | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProject = async () => {
    try {
      const project = await getProjectMetadata(token!);
      setError(null);
      setProject(project);
    } catch (err) {
      setError("getProjectMetadata endpoint failed");
      setProject(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loading) {
      fetchProject();
    }
  }, [loading]);

  if (loading) {
    return (
      <div className={styles.container}>
        <Spinner size={50} text="Fetching project..." />
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
      {project!.members.includes(user!.uid) ? (
        <AlreadyJoined project={project!} />
      ) : (
        <JoinProject project={project!} token={token!} />
      )}
    </div>
  );
};

export default Join;
