import { useModal } from "../People";
import Modal from "../../../../../components/modal/Modal";
import GenerateInvite from "./generate-invite/GenerateInvite";
import MakeOwner from "./make-owner/MakeOwner";
import RemoveMember from "./remove-member/RemoveMember";

export const Modals = () => {
  const { modal, closeModal } = useModal();

  return (
    modal && (
      <Modal close={closeModal}>
        {modal.type === "createInvite" && (
          <GenerateInvite
            invite={modal.invite}
            setInvite={modal.setInvite}
            closeModal={closeModal}
          />
        )}
        {modal.type === "makeOwner" && (
          <MakeOwner closeModal={closeModal} member={modal.member} />
        )}
        {modal.type === "removeMember" && (
          <RemoveMember closeModal={closeModal} member={modal.member} />
        )}
      </Modal>
    )
  );
};

export default Modals;
