import { getTruncatedText } from "../../../../../util";
import { useQueryParams } from "../../../../../hooks/query-params/useQueryParams";
import { type ProjectEntity } from "../../../../../services/projects/types";
import Tooltip from "../../../../../components/tooltip/Tooltip";
import styles from "./Project.module.scss";

const Project = ({
  project,
  text = project.name,
  expanded = true,
  onClick = () => {},
}: {
  project: ProjectEntity;
  text: string;
  expanded?: boolean;
  onClick?: () => void;
}) => {
  const { getParam } = useQueryParams();
  const selectedProjectId = getParam("project");
  const truncatedText = getTruncatedText(text, 20);

  return (
    <div className={styles.container}>
      <Tooltip
        content={text}
        condition={!expanded || truncatedText !== text}
        offset={expanded ? 140 : 10}
      >
        <div
          className={`${styles.profile} ${
            selectedProjectId === project.id ? styles.selected : null
          }`}
          onClick={onClick}
        >
          {project.name[0]}
        </div>
      </Tooltip>
      {expanded && <span className={styles.text}>{truncatedText}</span>}
    </div>
  );
};

export default Project;
