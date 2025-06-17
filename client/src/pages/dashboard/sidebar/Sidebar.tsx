import { useState } from "react";
import { type ProjectEntity } from "../../../services/projects/types";
import Body from "./body/Body";
import Footer from "./footer/Footer";
import Header from "./header/Header";
import styles from "./Sidebar.module.scss";

const Sidebar = ({
  projects,
  project,
  setProject,
}: {
  projects: ProjectEntity[];
  project: ProjectEntity | null;
  setProject: (project: ProjectEntity | null) => void;
}) => {
  const [expanded, setExpanded] = useState<boolean>(true);

  return (
    <div
      className={`${styles.container} ${expanded ? null : styles.collapsed}`}
    >
      <Header expanded={expanded} setExpanded={setExpanded} />
      <Body
        expanded={expanded}
        projects={projects}
        project={project}
        setProject={setProject}
      />
      <Footer expanded={expanded} />
    </div>
  );
};

export default Sidebar;
