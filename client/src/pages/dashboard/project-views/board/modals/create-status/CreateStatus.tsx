import { useEffect, useState } from "react";
import { PLACEHOLDER, SUBTITLE } from "./constants";
import { useKanban } from "../../../../../../hooks/useKanban";
import { useQueryParams } from "../../../../../../hooks/query-params/useQueryParams";
import { useElementHeight } from "../../../../../../hooks/useElementHeight";
import { validateStatusName } from "./util";
import { createStatus } from "../../../../../../services/statuses/statuses.service";
import { type CreateStatusPayload } from "../../../../../../services/statuses/types";
import Spinner from "../../../../../../components/spinner/Spinner";
import Error from "../../../../../../components/error/Error";
import styles from "./CreateStatus.module.scss";

const CreateStatus = ({ closeModal }: { closeModal: () => void }) => {
  const { kanban, setKanban } = useKanban();
  const { getParam } = useQueryParams();
  const { ref, height } = useElementHeight<HTMLDivElement>();

  const [input, setInput] = useState<string>("");
  const [requestError, setRequestError] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const addStatus = async () => {
    try {
      const project = getParam("project")!;

      const payload: CreateStatusPayload = {
        project_id: project,
        name: input.trim(),
        position: kanban!.statuses.length,
      };

      const { status: createdStatus } = await createStatus(payload);
      setKanban((prev) => ({
        ...prev!,
        statuses: [...prev!.statuses, createdStatus],
      }));

      closeModal();
    } catch (err) {
      setRequestError("createStatus endpoint failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loading) {
      addStatus();
    }
  }, [loading]);

  useEffect(() => {
    const { valid, msg } = validateStatusName(input, kanban!.statuses);
    if (valid) {
      setValidationError(null);
    } else {
      setValidationError(msg);
    }
  }, [input]);

  if (loading) {
    return (
      <div
        className={styles.container}
        style={{ height: height ? `${height}px` : undefined }}
      >
        <Spinner size={50} text="Creating status..." />
      </div>
    );
  }

  if (requestError) {
    return (
      <div
        className={styles.container}
        style={{ height: height ? `${height}px` : undefined }}
      >
        <Error errorMsg={requestError} />
      </div>
    );
  }

  return (
    <div className={styles.container} ref={ref}>
      <span className={styles.title}>New Status</span>
      <span className={styles.subtitle}>{SUBTITLE}</span>
      <span className={styles.label}>Status Name</span>
      <input
        className={styles.input}
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
        placeholder={PLACEHOLDER}
        autoFocus
      />
      <div className={styles.inputError}>{validationError}</div>
      <div className={styles.create}>
        <button onClick={() => setLoading(true)} disabled={!!validationError}>
          Create
        </button>
      </div>
    </div>
  );
};

export default CreateStatus;
