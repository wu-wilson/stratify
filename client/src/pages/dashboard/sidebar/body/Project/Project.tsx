import { type ProjectEntity } from "../../../../../services/projects/types";
import Tooltip from "../../../../../components/tooltip/Tooltip";
import styles from "./Project.module.scss";
import { getTruncatedText } from "../../../../../util";

const Project = ({
  project,
  text = project.name,
  selected = false,
  expanded = true,
  maxTextLength = null,
  onClick = () => {},
}: {
  project: ProjectEntity;
  text: string;
  selected?: boolean;
  expanded?: boolean;
  maxTextLength?: number | null;
  onClick?: () => void;
}) => {
  const truncatedText = getTruncatedText(text, maxTextLength ?? text.length);

  return (
    <div className={styles.container}>
      <Tooltip
        content={text}
        condition={!expanded || truncatedText !== text}
        offset={expanded ? 0 : 10}
      >
        <div className={styles.content}>
          <div
            className={`${styles.profile} ${selected ? styles.selected : null}`}
            onClick={onClick}
          >
            {project.name[0]}
          </div>
          {expanded && <span className={styles.text}>{truncatedText}</span>}
        </div>
      </Tooltip>
    </div>
  );
};

export default Project;
