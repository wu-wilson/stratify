import { useState } from "react";
import { createModalContext } from "../../../contexts/modal/useModal";
import { type ModalOptions } from "./types";
import Modals from "./modals/Modals";
import Body from "./body/Body";
import Footer from "./footer/Footer";
import Header from "./header/Header";
import styles from "./Sidebar.module.scss";

export const { ModalProvider, useModal } = createModalContext<ModalOptions>();

const Sidebar = () => {
  const [expanded, setExpanded] = useState<boolean>(false);

  return (
    <div
      className={`${styles.container} ${expanded ? null : styles.collapsed}`}
    >
      <ModalProvider>
        <Modals />
        <Header expanded={expanded} setExpanded={setExpanded} />
        <Body expanded={expanded} />
        <Footer expanded={expanded} />
      </ModalProvider>
    </div>
  );
};

export default Sidebar;
