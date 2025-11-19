import { useEffect, useState } from "react";
import { useElementHeight } from "../../../../../../hooks/useElementHeight";
import { useKanban } from "../../../../../../hooks/useKanban";
import { validateTagName } from "../create-tag/util";
import { updateTag } from "../../../../../../services/tags/tags.service";
import { PLACEHOLDER } from "../create-tag/constants";
import { HexColorPicker } from "react-colorful";
import {
  type TagEntity,
  type UpdateTagPayload,
} from "../../../../../../services/tags/types";
import Spinner from "../../../../../../components/spinner/Spinner";
import Error from "../../../../../../components/error/Error";
import styles from "../create-tag/CreateTag.module.scss";

const EditTag = ({
  tag,
  closeModal,
}: {
  tag: TagEntity;
  closeModal: () => void;
}) => {
  const { kanban, setKanban } = useKanban();
  const { ref, height } = useElementHeight<HTMLDivElement>();

  const [name, setName] = useState<string>(tag.name);
  const [color, setColor] = useState<string>(tag.color);
  const [requestError, setRequestError] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const editTag = async () => {
    try {
      const payload: UpdateTagPayload = {
        id: tag.id,
        name: name,
        color: color,
      };

      const { updated: updatedTag } = await updateTag(payload);

      setKanban((prev) => ({
        ...prev!,
        tags: prev!.tags.map((tag) =>
          tag.id === updatedTag.id ? updatedTag : tag
        ),
      }));

      closeModal();
    } catch (err) {
      setRequestError("updateTag endpoint failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loading) {
      editTag();
    }
  }, [loading]);

  useEffect(() => {
    const { valid, msg } = validateTagName(
      name,
      kanban!.tags.filter((t) => t.id !== tag.id)
    );
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
        <Spinner size={50} text="Updating tag..." />
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
      <span className={styles.title}>Edit Tag</span>
      <span className={styles.label}>Name</span>
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
      <span className={styles.label}>Color</span>
      <div className={styles.colorPicker}>
        <HexColorPicker color={color} onChange={setColor} />
      </div>
      <div className={styles.button}>
        <button onClick={() => setLoading(true)} disabled={!!validationError}>
          Save
        </button>
      </div>
    </div>
  );
};

export default EditTag;
