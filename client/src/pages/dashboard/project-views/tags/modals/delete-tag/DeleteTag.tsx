import { useEffect, useState } from "react";
import { useElementHeight } from "../../../../../../hooks/useElementHeight";
import { useQueryParams } from "../../../../../../hooks/query-params/useQueryParams";
import { useKanban } from "../../../../../../hooks/useKanban";
import { useAuth } from "../../../../../../hooks/useAuth";
import { deleteTag } from "../../../../../../services/tags/tags.service";
import { CONFIRM_STRING, SUBTITLE } from "./constants";
import { type TagEntity } from "../../../../../../services/tags/types";
import { type TaggingEntity } from "../../../../../../services/taggings/types";
import Spinner from "../../../../../../components/spinner/Spinner";
import Error from "../../../../../../components/error/Error";
import styles from "../../../../../../components/modal/BaseModalContent.module.scss";

const DeleteTag = ({
  tag,
  closeModal,
}: {
  tag: TagEntity;
  closeModal: () => void;
}) => {
  const { setKanban } = useKanban();
  const { ref, height } = useElementHeight<HTMLDivElement>();
  const { getParam } = useQueryParams();
  const { user } = useAuth();

  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const removeTag = async () => {
    try {
      const project = getParam("project")!;
      const token = await user!.getIdToken();

      await deleteTag(tag.id, project, token);

      setKanban((prev) => ({
        ...prev!,
        tags: prev!.tags.filter((t: TagEntity) => t.id !== tag.id),
        taggings: prev!.taggings.filter(
          (t: TaggingEntity) => t.tag_id !== tag.id
        ),
      }));

      closeModal();
    } catch (err) {
      setError("deleteTag endpoint failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loading) {
      removeTag();
    }
  }, [loading]);

  if (loading) {
    return (
      <div
        className={styles.container}
        style={{ height: height ? `${height}px` : undefined }}
      >
        <Spinner size={50} text="Removing tag..." />
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={styles.container}
        style={{ height: height ? `${height}px` : undefined }}
      >
        <Error errorMsg={error} />
      </div>
    );
  }

  return (
    <div className={styles.container} ref={ref}>
      <span className={styles.title}>Delete Tag</span>
      <span className={styles.subtitle}>{SUBTITLE}</span>
      <span className={styles.highlightedMsg}>{tag.name}</span>
      <input
        className={styles.input}
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
        placeholder={CONFIRM_STRING}
        autoFocus
      />
      <div className={styles.criticalInputMsg}>
        Type {CONFIRM_STRING} to confirm
      </div>
      <div className={styles.button}>
        <button
          onClick={() => setLoading(true)}
          disabled={input !== CONFIRM_STRING}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteTag;
