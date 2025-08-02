import { useElementHeight } from "../../../../../hooks/useElementHeight";
import Form from "./form/Form";
import styles from "./Create.module.scss";

const Create = ({ closeModal }: { closeModal: () => void }) => {
  const { ref, height } = useElementHeight<HTMLDivElement>();

  return (
    <div
      className={styles.container}
      ref={ref}
      style={{ height: height ? `${height}px` : undefined }}
    >
      <Form closeModal={closeModal} />
    </div>
  );
};

export default Create;
