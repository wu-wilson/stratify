import { BUTTON_LABEL, SUBTEXT, TITLE } from "./constants";
import { useModal } from "../../Board";
import NotFound from "../../../../../../components/not-found/NotFound";
import styles from "./EmptyBoard.module.scss";

const EmptyBoard = () => {
  const { setModal } = useModal();

  return (
    <div className={styles.container}>
      <NotFound
        title={TITLE}
        subtext={SUBTEXT}
        button={{
          label: BUTTON_LABEL,
          onClick: () => setModal({ type: "createStatus" }),
        }}
      />
    </div>
  );
};

export default EmptyBoard;
