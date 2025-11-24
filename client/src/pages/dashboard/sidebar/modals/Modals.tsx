import { useModal } from "../Sidebar";
import Modal from "../../../../components/modal/Modal";
import CreateProject from "./create-project/CreateProject";
import Settings from "./settings/Settings";

export const Modals = () => {
  const { modal, closeModal } = useModal();

  return (
    modal && (
      <Modal close={closeModal}>
        {modal === "createProject" && <CreateProject closeModal={closeModal} />}
        {modal === "settings" && <Settings />}
      </Modal>
    )
  );
};

export default Modals;
