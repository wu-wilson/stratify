import { useState } from "react";
import { TbFolderOpen } from "react-icons/tb";
import { SUBTEXT } from "./constants";
import { type InviteEntity } from "../../../../../../../services/invites/types";
import Modal from "../../../../../../../components/modal/Modal";
import GenerateInvite from "../../generate-invite/GenerateInvite";
import styles from "./NoActiveInvite.module.scss";

const NoActiveInvite = ({
  setInvite,
}: {
  setInvite: (invite: InviteEntity | null) => void;
}) => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  return (
    <div className={styles.container}>
      <div className={styles.header}>Invite People to the Team</div>
      {openModal && (
        <Modal close={() => setOpenModal(false)}>
          <GenerateInvite
            setInvite={setInvite}
            closeModal={() => setOpenModal(false)}
          />
        </Modal>
      )}
      <div className={styles.content}>
        <span className={styles.title}>
          <TbFolderOpen className={styles.icon} />
          No Invite Link Found
        </span>
        <span className={styles.subtext}>{SUBTEXT}</span>
        <button
          className={styles.generateInvite}
          onClick={() => setOpenModal(true)}
        >
          Generate Invite Link
        </button>
      </div>
    </div>
  );
};

export default NoActiveInvite;
