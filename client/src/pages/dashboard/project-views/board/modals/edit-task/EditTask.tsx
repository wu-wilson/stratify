import { useEffect, useMemo, useState } from "react";
import { useQueryParams } from "../../../../../../hooks/query-params/useQueryParams";
import { useAuth } from "../../../../../../hooks/useAuth";
import { useElementHeight } from "../../../../../../hooks/useElementHeight";
import { useKanban } from "../../../../../../hooks/useKanban";
import { useMembers } from "../../../../../../hooks/useMembers";
import { editTask } from "../../../../../../services/tasks/tasks.service";
import {
  DESCRIPTION_PLACEHOLDER,
  SUBTITLE,
  TITLE_PLACEHOLDER,
} from "../create-task/constants";
import {
  getAssigneeLabel,
  getStatusLabel,
  getTagLabel,
  validateTaskTitle,
} from "../create-task/util";
import { type TagEntity } from "../../../../../../services/tags/types";
import {
  type EditTaskPayload,
  type TaskEntity,
} from "../../../../../../services/tasks/types";
import Dropdown from "../../../../../../components/dropdown/Dropdown";
import Autofill from "../../../../../../components/autofill/Autofill";
import Tag from "../../../../../../components/tag/Tag";
import Spinner from "../../../../../../components/spinner/Spinner";
import Error from "../../../../../../components/error/Error";
import styles from "../create-task/CreateTask.module.scss";

const EditTask = ({
  closeModal,
  task,
}: {
  closeModal: () => void;
  task: TaskEntity;
}) => {
  const { kanban, setKanban } = useKanban();
  const { getParam } = useQueryParams();
  const { ref, height } = useElementHeight<HTMLDivElement>();
  const { user } = useAuth();
  const { members } = useMembers();

  const initialTags = useMemo(() => {
    const taggings = kanban!.taggings.filter((t) => t.task_id === task.id);
    const tags: TagEntity[] = [];
    taggings.forEach((tagging) => {
      const tag = kanban!.tags.find((tag) => tag.id === tagging.tag_id)!;
      tags.push(tag);
    });
    return tags;
  }, [task, kanban!.taggings, kanban!.tags]);

  const [status, setStatus] = useState<string>(task.status_id);
  const [assignee, setAssignee] = useState<string | null>(
    members!.find((m) => m.id === task.assigned_to)?.id || null
  );
  const [title, setTitle] = useState<string>(task.title);
  const [description, setDescription] = useState<string>(
    task.description ?? ""
  );
  const [tags, setTags] = useState<TagEntity[]>(initialTags);
  const [requestError, setRequestError] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const statusOptions = useMemo(
    () => kanban!.statuses.map((s) => s.id),
    [kanban?.statuses]
  );

  const assigneeOptions = useMemo(() => members!.map((m) => m.id), [members]);

  const updateTask = async () => {
    try {
      const project = getParam("project")!;
      const token = await user!.getIdToken();

      const payload: EditTaskPayload = {
        old_index: task.position,
        old_status_id: task.status_id,
        new_status_id: status,
        title: title,
        tags: tags,
        description: description,
        assigned_to: assignee,
        task_id: task.id,
        project_id: project,
      };

      const { updated } = await editTask(payload, token);
      setKanban((prev) => ({
        ...prev!,
        tasks: [...prev!.tasks.filter((t) => t.id !== task.id), updated],
        taggings: [
          ...prev!.taggings.filter((t) => t.task_id !== task.id),
          ...tags.map((tag) => ({ tag_id: tag.id, task_id: updated.id })),
        ],
      }));

      closeModal();
    } catch (err) {
      setRequestError("editTask endpoint failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loading) {
      updateTask();
    }
  }, [loading]);

  useEffect(() => {
    const { valid, msg } = validateTaskTitle(
      title,
      kanban!.tasks.filter((t) => t.id !== task.id)
    );
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
        <Spinner size={50} text="Updating task..." />
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
      <span className={styles.title}>Edit Task</span>
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
      />
      {validationError && (
        <div className={styles.criticalInputMsg}>{validationError}</div>
      )}
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
      <span className={styles.label}>Task Description</span>
      <textarea
        className={styles.textarea}
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
        placeholder={DESCRIPTION_PLACEHOLDER}
      />
      <div className={styles.button}>
        <button onClick={() => setLoading(true)} disabled={!!validationError}>
          Save
        </button>
      </div>
    </div>
  );
};

export default EditTask;
