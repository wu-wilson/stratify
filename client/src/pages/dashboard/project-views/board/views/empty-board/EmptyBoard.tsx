import { SUBTEXT, TITLE } from "./constants";
import NotFound from "../../../../../../components/not-found/NotFound";
import styles from "./EmptyBoard.module.scss";

const EmptyBoard = () => {
  return (
    <div className={styles.container}>
      <NotFound title={TITLE} subtext={SUBTEXT} />
    </div>
  );
};

export default EmptyBoard;
