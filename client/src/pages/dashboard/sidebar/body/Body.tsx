import { type ProjectEntity } from "../../../../services/projects/types";
import Project from "./Project/Project";
import styles from "./Body.module.scss";

const Body = ({
  expanded,
  projects,
  project,
  setProject,
}: {
  expanded: boolean;
  projects: ProjectEntity[];
  project: ProjectEntity | null;
  setProject: (project: ProjectEntity | null) => void;
}) => {
  return (
    <div className={styles.container}>
      {projects.map((p) => (
        <div
          key={p.id}
          className={styles.project}
          onClick={() => setProject(p)}
        >
          <Project
            expanded={expanded}
            project={p}
            selected={p.id === project?.id}
            maxTextLength={25}
          />
        </div>
      ))}
    </div>
  );
};

export default Body;
