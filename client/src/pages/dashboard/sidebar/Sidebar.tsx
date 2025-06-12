import { useState } from "react";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import styles from "./Sidebar.module.scss";

const Sidebar = ({
  project,
  setProject,
}: {
  project: number | null;
  setProject: (id: number | null) => void;
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [expanded, setExpanded] = useState<boolean>(true);

  return (
    <div
      className={`${styles.container} ${expanded ? null : styles.collapsed}`}
    >
      <Header expanded={expanded} setExpanded={setExpanded} />
      {project}
      <Footer expanded={expanded} />
    </div>
  );
};

export default Sidebar;
