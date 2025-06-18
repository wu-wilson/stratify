import { useEffect, useRef, useState } from "react";
import { type ProjectEntity } from "../../../../../services/projects/types";
import Form from "./form/Form";
import styles from "./Create.module.scss";

const Create = ({
  projects,
  setProjects,
  setProject,
  closeModal,
}: {
  projects: ProjectEntity[];
  setProjects: (projects: ProjectEntity[]) => void;
  setProject: (project: ProjectEntity) => void;
  closeModal: () => void;
}) => {
  const [height, setHeight] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      const currentHeight = ref.current.offsetHeight;
      if (!height || height < currentHeight) {
        setHeight(currentHeight);
      }
    }
  }, []);

  return (
    <div
      className={styles.container}
      ref={ref}
      style={{ height: height ? `${height}px` : undefined }}
    >
      <Form
        projects={projects}
        setProjects={setProjects}
        setProject={setProject}
        closeModal={closeModal}
      />
    </div>
  );
};

export default Create;
