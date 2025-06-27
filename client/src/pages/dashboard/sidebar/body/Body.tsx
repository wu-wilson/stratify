import { useState } from "react";
import { useProjects } from "../../../../hooks/useProjects";
import { useQueryParams } from "../../../../hooks/query-params/useQueryParams";
import { type ProjectEntity } from "../../../../services/projects/types";
import Create from "./create/Create";
import Modal from "../../../../components/modal/Modal";
import Project from "./project/Project";
import styles from "./Body.module.scss";

const Body = ({ expanded }: { expanded: boolean }) => {
  const { setParam } = useQueryParams();
  const { projects } = useProjects();
  const [openCreate, setOpenCreate] = useState<boolean>(false);

  const selectProject = (project: ProjectEntity) => {
    setParam({ project: project.id });
  };

  return (
    <div className={styles.container}>
      {openCreate && (
        <Modal setOpen={setOpenCreate}>
          <Create
            closeModal={() => {
              setOpenCreate(false);
            }}
          />
        </Modal>
      )}
      {projects?.map((p) => (
        <div key={p.id} className={styles.project}>
          <Project
            text={p.name}
            expanded={expanded}
            project={p}
            onClick={() => selectProject(p)}
          />
        </div>
      ))}
      <div className={styles.project}>
        <Project
          text="Add Project"
          expanded={expanded}
          project={{ id: "-1", owner_id: "", name: "+" } as ProjectEntity}
          onClick={() => setOpenCreate(true)}
        />
      </div>
    </div>
  );
};

export default Body;
