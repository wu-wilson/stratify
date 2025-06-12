import { useState } from "react";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import styles from "./Sidebar.module.scss";
import Tooltip from "../../../components/tooltip/Tooltip";

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
      <div style={{ height: "100%", overflow: "scroll" }}>
        {Array.from({ length: 100 }).map((_n, i) => (
          <Tooltip content={`test ${i}`}>test {i}</Tooltip>
        ))}
      </div>
      <Footer expanded={expanded} />
    </div>
  );
};

export default Sidebar;
