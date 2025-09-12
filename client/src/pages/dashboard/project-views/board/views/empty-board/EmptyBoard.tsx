import { useState } from "react";
import { BUTTON_LABEL, SUBTEXT, TITLE } from "./constants";
import Modal from "../../../../../../components/modal/Modal";
import CreateStatus from "../../create-status/CreateStatus";
import NotFound from "../../../../../../components/not-found/NotFound";
import styles from "./EmptyBoard.module.scss";

const EmptyBoard = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  return (
    <div className={styles.container}>
      {openModal && (
        <Modal close={() => setOpenModal(false)}>
          <CreateStatus closeModal={() => setOpenModal(false)} />
        </Modal>
      )}
      <NotFound
        title={TITLE}
        subtext={SUBTEXT}
        button={{ label: BUTTON_LABEL, onClick: () => setOpenModal(true) }}
      />
    </div>
  );
};

export default EmptyBoard;
