import { useEffect, useMemo, useState } from "react";
import { useKanban } from "../../../../../../hooks/useKanban";
import { useMembers } from "../../../../../../hooks/useMembers";
import { useQueryParams } from "../../../../../../hooks/query-params/useQueryParams";
import { useElementHeight } from "../../../../../../hooks/useElementHeight";
import { useAuth } from "../../../../../../hooks/useAuth";
import {
  getAssigneeLabel,
  getStatusLabel,
  getTagLabel,
  validateTaskTitle,
} from "./util";
import {
  DESCRIPTION_PLACEHOLDER,
  TITLE_PLACEHOLDER,
  SUBTITLE,
} from "./constants";
import { createTask } from "../../../../../../services/tasks/tasks.service";
import { type CreateTaskPayload } from "../../../../../../services/tasks/types";
import { type TagEntity } from "../../../../../../services/tags/types";
import Dropdown from "../../../../../../components/dropdown/Dropdown";
import Autofill from "../../../../../../components/autofill/Autofill";
import Tag from "../../../../../../components/tag/Tag";
import Spinner from "../../../../../../components/spinner/Spinner";
import Error from "../../../../../../components/error/Error";
import styles from "./CreateTask.module.scss";

const CreateTask = ({
  closeModal,
  statusId,
}: {
  closeModal: () => void;
  statusId: string;
}) => {
  const { kanban, setKanban } = useKanban();
  const { getParam } = useQueryParams();
  const { ref, height } = useElementHeight<HTMLDivElement>();
  const { user } = useAuth();
  const { members } = useMembers();

  const [status, setStatus] = useState<string>(statusId);
  const [assignee, setAssignee] = useState<string | null>(null);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [tags, setTags] = useState<TagEntity[]>([]);
  const [requestError, setRequestError] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const statusOptions = useMemo(
    () => kanban!.statuses.map((s) => s.id),
    [kanban?.statuses]
  );

  const assigneeOptions = useMemo(() => members!.map((m) => m.id), [members]);

  const addTask = async () => {
    try {
      const project = getParam("project")!;
      const token = await user!.getIdToken();

      const payload: CreateTaskPayload = {
        project_id: project,
        status_id: status,
        created_by: user!.uid,
        assigned_to: assignee,
        title: title.trim(),
        description: description.trim() || null,
        position: kanban!.tasks.filter((t) => t.status_id === status).length,
        tags: tags,
      };

      const { task: createdTask } = await createTask(payload, token);
      setKanban((prev) => ({
        ...prev!,
        tasks: [...prev!.tasks, createdTask],
        taggings: [
          ...prev!.taggings,
          ...tags.map((tag) => ({ tag_id: tag.id, task_id: createdTask.id })),
        ],
      }));

      closeModal();
    } catch (err) {
      setRequestError("createTask endpoint failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loading) {
      addTask();
    }
  }, [loading]);

  useEffect(() => {
    const { valid, msg } = validateTaskTitle(title, kanban!.tasks);
    if (valid) {
      setValidationError(null);
    } else {
      setValidationError(msg);
    }
  }, [title]);

  const onSelectTag = (tag: TagEntity) => {
    if (!tags.find((t) => t.id === tag.id)) {
      setTags((prev) => [...prev, tag]);
    }
  };

  const onDeleteTag = (tag: TagEntity) => {
    setTags((prev) => prev.filter((t) => t.id !== tag.id));
  };

  if (loading) {
    return (
      <div
        className={styles.container}
        style={{ height: height ? `${height}px` : undefined }}
      >
        <Spinner size={50} text="Creating task..." />
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
      <span className={styles.title}>New Task</span>
      <span className={styles.subtitle}>{SUBTITLE}</span>
      <span className={styles.label}>Status</span>
      <Dropdown
        options={statusOptions}
        selected={status}
        setSelected={setStatus}
        getLabel={(o) => getStatusLabel(kanban!.statuses, o)}
        maxTextLength={48}
      />
      <span className={styles.label}>Assignee</span>
      <Dropdown
        options={assigneeOptions}
        selected={assignee}
        setSelected={setAssignee}
        getLabel={(o) => getAssigneeLabel(members!, o)}
        placeholder="Select assignee"
        maxTextLength={48}
      />
      <span className={styles.label}>Task Title</span>
      <input
        className={styles.input}
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        placeholder={TITLE_PLACEHOLDER}
        autoFocus
      />
      {validationError && (
        <div className={styles.criticalInputMsg}>{validationError}</div>
      )}
      <span className={styles.label}>Task Description</span>
      <textarea
        className={styles.textarea}
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
        placeholder={DESCRIPTION_PLACEHOLDER}
      />
      {kanban!.tags.length > 0 && (
        <>
          <span className={styles.label}>Tags</span>
          <Autofill
            options={kanban!.tags}
            getLabel={getTagLabel}
            onSelectOption={onSelectTag}
            placeholder="Search tags..."
          />
          {tags.length > 0 && (
            <div className={styles.tags}>
              {tags.map((tag) => (
                <Tag
                  tag={tag}
                  key={tag.id}
                  deletable={true}
                  onDelete={onDeleteTag}
                />
              ))}
            </div>
          )}
        </>
      )}
      <div className={styles.button}>
        <button onClick={() => setLoading(true)} disabled={!!validationError}>
          Create
        </button>
      </div>
    </div>
  );
};

export default CreateTask;
