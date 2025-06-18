import { useState } from "react";
import { type ProjectEntity } from "../../../../services/projects/types";
import AddProject from "./add-project/AddProject";
import Modal from "../../../../components/modal/Modal";
import Project from "./project/Project";
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
        <Modal setOpen={setOpenAddProject}>
          <AddProject projects={projects} setProjects={setProjects} />
        </Modal>
      )}
      {projects.map((p) => (
        <div key={p.id} className={styles.project}>
          <Project
            text={p.name}
            expanded={expanded}
            project={p}
            selected={p.id === project?.id}
            onClick={() => setProject(p)}
          />
        </div>
      ))}
      <div className={styles.project}>
        <Project
          text={"Add Project"}
          expanded={expanded}
          project={{ id: -1, owner_id: "", name: "+" } as ProjectEntity}
          selected={false}
          onClick={() => setOpenAddProject(true)}
        />
      </div>
    </div>
  );
};

export default Body;
