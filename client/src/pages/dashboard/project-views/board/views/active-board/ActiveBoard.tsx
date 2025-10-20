import { type KanbanState } from "../../../../../../contexts/kanban/types";
import styles from "./ActiveBoard.module.scss";

const ActiveBoard = ({ kanban }: { kanban: KanbanState }) => {
  return (
    <div className={styles.container}>
      <span className={styles.header}>Kanban Board</span>
    </div>
  );
};

export default ActiveBoard;
