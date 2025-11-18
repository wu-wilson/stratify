import { useEffect, useState } from "react";
import { useElementHeight } from "../../../../../../hooks/useElementHeight";
import { PLACEHOLDER, SUBTITLE } from "./constants";
import { useKanban } from "../../../../../../hooks/useKanban";
import { useQueryParams } from "../../../../../../hooks/query-params/useQueryParams";
import { validateTagName } from "./util";
import { createTag } from "../../../../../../services/tags/tags.service";
import { getCSSVar } from "../../../../../../styles/util";
import { HexColorPicker } from "react-colorful";
import { type CreateTagPayload } from "../../../../../../services/tags/types";
import Spinner from "../../../../../../components/spinner/Spinner";
import Error from "../../../../../../components/error/Error";
import styles from "./CreateTag.module.scss";

const CreateTag = ({ closeModal }: { closeModal: () => void }) => {
  const { kanban, setKanban } = useKanban();
  const { getParam } = useQueryParams();
  const { ref, height } = useElementHeight<HTMLDivElement>();

  const [name, setName] = useState<string>("");
  const [color, setColor] = useState<string>(getCSSVar("--primary-color"));
  const [requestError, setRequestError] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const addTag = async () => {
    try {
      const project = getParam("project")!;

      const createTagPayload: CreateTagPayload = {
        project_id: project,
        name: name,
        color: color,
      };

      const { tag: createdTag } = await createTag(createTagPayload);
      setKanban((prev) => ({
        ...prev!,
        tags: [...prev!.tags, createdTag],
      }));

      closeModal();
    } catch (err) {
      setRequestError("createTag endpoint failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loading) {
      addTag();
    }
  }, [loading]);

  useEffect(() => {
    const { valid, msg } = validateTagName(name, kanban!.tags);
    if (valid) {
      setValidationError(null);
    } else {
      setValidationError(msg);
    }
  }, [name]);

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
      <span className={styles.title}>New Tag</span>
      <span className={styles.subtitle}>{SUBTITLE}</span>
      <input
        className={styles.input}
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
        placeholder={PLACEHOLDER}
        autoFocus
      />
      <div className={styles.inputError}>{validationError}</div>
      <div className={styles.colorPicker}>
        <HexColorPicker color={color} onChange={setColor} />
      </div>
      <div className={styles.create}>
        <button onClick={() => setLoading(true)} disabled={!!validationError}>
          Create
        </button>
      </div>
    </div>
  );
};

export default CreateTag;
