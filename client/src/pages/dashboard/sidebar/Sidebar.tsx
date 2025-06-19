import { useState } from "react";
import Body from "./body/Body";
import Footer from "./footer/Footer";
import Header from "./header/Header";
import styles from "./Sidebar.module.scss";

const Sidebar = () => {
  const [expanded, setExpanded] = useState<boolean>(false);

  return (
    <div
      className={`${styles.container} ${expanded ? null : styles.collapsed}`}
    >
      <Header expanded={expanded} setExpanded={setExpanded} />
      <Body expanded={expanded} />
      <Footer expanded={expanded} />
    </div>
  );
};

export default Sidebar;
