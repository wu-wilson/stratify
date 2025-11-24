import { useKanban } from "../../../../hooks/useKanban";
import { useMembers } from "../../../../hooks/useMembers";
import { createModalContext } from "../../../../contexts/modal/useModal";
import { type ModalOptions } from "./types";
import Spinner from "../../../../components/spinner/Spinner";
import Error from "../../../../components/error/Error";
import EmptyBoard from "./views/empty-board/EmptyBoard";
import ActiveBoard from "./views/active-board/ActiveBoard";
import Modals from "./modals/Modals";
import styles from "./Board.module.scss";

export const { ModalProvider, useModal } = createModalContext<ModalOptions>();

const Board = () => {
  const { loading: kanbanLoading, error: kanbanError, kanban } = useKanban();
  const { loading: membersLoading, error: membersError } = useMembers();

  if (kanbanLoading || membersLoading) {
    return (
      <div className={styles.container}>
        <Spinner size={50} text={"Fetching board..."} />
      </div>
    );
  }

  const errorMsg = kanbanError || membersError;
  if (errorMsg) {
    return (
      <div className={styles.container}>
        <Error errorMsg={errorMsg} />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <ModalProvider>
        <Modals />
        {kanban.statuses.length > 0 ? <ActiveBoard /> : <EmptyBoard />}
      </ModalProvider>
    </div>
  );
};

export default Board;
