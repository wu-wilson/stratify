import { BiError } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { type GetProjectMetadataResponse } from "../../../../services/projects/types";
import styles from "./AlreadyJoined.module.scss";

const AlreadyJoined = ({
  project,
}: {
  project: GetProjectMetadataResponse;
}) => {
  const navigate = useNavigate();
  const redirect = () => {
    navigate(`/dashboard?project=${project.id}`);
  };

  return (
    <div className={styles.container}>
      <span className={styles.title}>
        <BiError className={styles.icon} />
        Already Joined
      </span>
      <span className={styles.subtext}>
        You've already joined this project. If you are trying to join again,
        there's no need—you're all set.
      </span>
      <span className={styles.projectName}>{project.name}</span>
      <button className={styles.redirect} onClick={redirect}>
        Go To Project
      </button>
    </div>
  );
};

export default AlreadyJoined;
