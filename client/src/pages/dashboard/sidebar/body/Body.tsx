import { useState } from "react";
import { type ProjectEntity } from "../../../../services/projects/types";
import Modal from "../../../../components/modal/Modal";
import Project from "./Project/Project";
import styles from "./Body.module.scss";

const Body = ({
  expanded,
  projects,
  setProjects,
  project,
  setProject,
}: {
  expanded: boolean;
  projects: ProjectEntity[];
  setProjects: (projects: ProjectEntity[]) => void;
  project: ProjectEntity | null;
  setProject: (project: ProjectEntity | null) => void;
}) => {
  const [openAddProject, setOpenAddProject] = useState<boolean>(false);

  return (
    <div className={styles.container}>
      {openAddProject && (
        <Modal setOpen={setOpenAddProject}>Add Project Modal</Modal>
      )}
      {projects.map((p) => (
        <div
          key={p.id}
          className={styles.project}
          onClick={() => setProject(p)}
        >
          <Project
            text={p.name}
            expanded={expanded}
            project={p}
            selected={p.id === project?.id}
            maxTextLength={25}
          />
        </div>
      ))}
      <div className={styles.project} onClick={() => setOpenAddProject(true)}>
        <Project
          text={"Add Project"}
          expanded={expanded}
          project={{ id: -1, owner_id: "", name: "+" } as ProjectEntity}
          selected={false}
        />
      </div>
    </div>
  );
};

export default Body;
