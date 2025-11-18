import { useState } from "react";
import { BUTTON_LABEL, SUBTEXT, TITLE } from "./constants";
import Modal from "../../../../../../components/modal/Modal";
import NotFound from "../../../../../../components/not-found/NotFound";
import CreateTag from "../../modals/create-tag/CreateTag";
import styles from "./NoTags.module.scss";

const NoTags = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  return (
    <div className={styles.container}>
      {openModal && (
        <Modal close={() => setOpenModal(false)}>
          <CreateTag closeModal={() => setOpenModal(false)} />
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

export default NoTags;
