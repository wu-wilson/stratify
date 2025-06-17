import { type ProjectEntity } from "../../../../../services/projects/types";
import Tooltip from "../../../../../components/tooltip/Tooltip";
import styles from "./Project.module.scss";
import { getTruncatedText } from "../../../../../util";

const Project = ({
  project,
  selected = false,
  expanded = false,
  maxTextLength = null,
}: {
  project: ProjectEntity;
  selected?: boolean;
  expanded?: boolean;
  maxTextLength?: number | null;
}) => {
  const truncatedName = getTruncatedText(
    project.name,
    maxTextLength ?? project.name.length
  );

  return (
    <Tooltip content={project.name}>
      <div className={styles.container}>
        <div
          className={`${styles.profile} ${selected ? styles.selected : null}`}
        >
          {project.name[0]}
        </div>
        {expanded && <span className={styles.name}>{truncatedName}</span>}
      </div>
    </Tooltip>
  );
};

export default Project;
