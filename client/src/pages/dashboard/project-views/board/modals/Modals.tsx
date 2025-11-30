import { useModal } from "../Board";
import Modal from "../../../../../components/modal/Modal";
import CreateStatus from "./create-status/CreateStatus";
import CreateTask from "./create-task/CreateTask";
import DeleteStatus from "./delete-status/DeleteStatus";
import DeleteTask from "./delete-task/DeleteTask";
import EditTask from "./edit-task/EditTask";

export const Modals = () => {
  const { modal, closeModal } = useModal();

  return (
    modal && (
      <Modal close={closeModal}>
        {modal.type === "createStatus" && (
          <CreateStatus closeModal={closeModal} />
        )}
        {modal.type === "createTask" && (
          <CreateTask closeModal={closeModal} statusId={modal.entity.id} />
        )}
        {modal.type === "deleteStatus" && (
          <DeleteStatus closeModal={closeModal} status={modal.entity} />
        )}
        {modal.type === "deleteTask" && (
          <DeleteTask closeModal={closeModal} task={modal.entity} />
        )}
        {modal.type === "editTask" && (
          <EditTask closeModal={closeModal} task={modal.entity} />
        )}
      </Modal>
    )
  );
};

export default Modals;
