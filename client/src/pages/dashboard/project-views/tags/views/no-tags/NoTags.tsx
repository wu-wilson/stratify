import { useModal } from "../../Tags";
import { BUTTON_LABEL, SUBTEXT, TITLE } from "./constants";
import NotFound from "../../../../../../components/not-found/NotFound";
import styles from "./NoTags.module.scss";

const NoTags = () => {
  const { setModal } = useModal();

  return (
    <div className={styles.container}>
      <NotFound
        title={TITLE}
        subtext={SUBTEXT}
        button={{
          label: BUTTON_LABEL,
          onClick: () => setModal({ type: "createTag" }),
        }}
      />
    </div>
  );
};

export default NoTags;
