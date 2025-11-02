import { useKanban } from "../../../../hooks/useKanban";
import { useMembers } from "../../../../hooks/useMembers";
import Spinner from "../../../../components/spinner/Spinner";
import Error from "../../../../components/error/Error";
import EmptyBoard from "./views/empty-board/EmptyBoard";
import ActiveBoard from "./views/active-board/ActiveBoard";
import styles from "./Board.module.scss";

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
      {kanban.statuses.length > 0 ? <ActiveBoard /> : <EmptyBoard />}
    </div>
  );
};

export default Board;
