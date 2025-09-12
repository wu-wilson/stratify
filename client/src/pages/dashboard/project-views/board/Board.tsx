import { useKanban } from "../../../../hooks/useKanban";
import Spinner from "../../../../components/spinner/Spinner";
import Error from "../../../../components/error/Error";
import EmptyBoard from "./views/empty-board/EmptyBoard";
import styles from "./Board.module.scss";

const Board = () => {
  const { loading, error, kanban } = useKanban();

  if (loading) {
    return (
      <div className={styles.container}>
        <Spinner size={50} text={"Fetching board..."} />
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <Error errorMsg={error} />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {kanban.statuses.length > 0 ? "Board" : <EmptyBoard />}
    </div>
  );
};

export default Board;
