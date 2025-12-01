import { useModal } from "../Tags";
import Modal from "../../../../../components/modal/Modal";
import CreateTag from "./create-tag/CreateTag";
import DeleteTag from "./delete-tag/DeleteTag";
import EditTag from "./edit-tag/EditTag";

export const Modals = () => {
  const { modal, closeModal } = useModal();

  return (
    modal && (
      <Modal close={closeModal}>
        {modal.type === "createTag" && <CreateTag closeModal={closeModal} />}
        {modal.type === "deleteTag" && (
          <DeleteTag closeModal={closeModal} tag={modal.tag} />
        )}
        {modal.type === "editTag" && (
          <EditTag closeModal={closeModal} tag={modal.tag} />
        )}
      </Modal>
    )
  );
};

export default Modals;
