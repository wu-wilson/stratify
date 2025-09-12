import { useState, type Dispatch, type SetStateAction } from "react";
import { BUTTON_LABEL, SUBTEXT, TITLE } from "./constants";
import { type InviteEntity } from "../../../../../../../services/invites/types";
import Modal from "../../../../../../../components/modal/Modal";
import NotFound from "../../../../../../../components/not-found/NotFound";
import GenerateInvite from "../../generate-invite/GenerateInvite";
import styles from "./NoActiveInvite.module.scss";

const NoActiveInvite = ({
  setInvite,
}: {
  setInvite: Dispatch<SetStateAction<InviteEntity | null>>;
}) => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  return (
    <div className={styles.container}>
      <div className={styles.header}>Invite People to the Team</div>
      {openModal && (
        <Modal close={() => setOpenModal(false)}>
          <GenerateInvite
            invite={null}
            setInvite={setInvite}
            closeModal={() => setOpenModal(false)}
          />
        </Modal>
      )}
      <div className={styles.content}>
        <NotFound
          title={TITLE}
          subtext={SUBTEXT}
          button={{ label: BUTTON_LABEL, onClick: () => setOpenModal(true) }}
        />
      </div>
    </div>
  );
};

export default NoActiveInvite;
