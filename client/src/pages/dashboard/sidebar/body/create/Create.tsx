import { useEffect, useRef, useState } from "react";
import Form from "./form/Form";
import styles from "./Create.module.scss";

const Create = ({ closeModal }: { closeModal: () => void }) => {
  const [height, setHeight] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      const currentHeight = ref.current.offsetHeight;
      if (!height || height < currentHeight) {
        setHeight(currentHeight);
      }
    }
  }, []);

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
