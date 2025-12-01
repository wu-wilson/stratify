import { useEffect, type Dispatch, type SetStateAction } from "react";
import { useElementHeight } from "../../../../hooks/useElementHeight";
import { type Template } from "../types";
import { type Button } from "./types";
import ModalTemplate from "../ModalTemplate";
import Spinner from "../../../spinner/Spinner";
import Error from "../../../error/Error";
import styles from "../ModalTemplate.module.scss";

const ModalRequestTemplate = <D, A extends { id: string }>({
  template,
  request,
  loading,
  setLoading,
  loadingMsg = "Loading...",
  error,
  button,
}: {
  template: Template<D, A>[];
  request: () => Promise<void>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  loadingMsg?: string;
  error: string | null;
  button: Button;
}) => {
  const { ref, height } = useElementHeight<HTMLDivElement>();

  useEffect(() => {
    if (loading) {
      request();
    }
  }, [loading]);

  if (loading) {
    return (
      <div
        className={`${styles.container} ${styles.center}`}
        style={{ height: height ? `${height}px` : undefined }}
      >
        <Spinner size={50} text={loadingMsg} />
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={`${styles.container} ${styles.center}`}
        style={{ height: height ? `${height}px` : undefined }}
      >
        <Error errorMsg={error} />
      </div>
    );
  }

  return (
    <div className={styles.container} ref={ref}>
      <ModalTemplate template={template} />
      <div className={styles.buttons}>
        <button onClick={() => setLoading(true)} disabled={button.disabled}>
          {button.label}
        </button>
      </div>
    </div>
  );
};

export default ModalRequestTemplate;
