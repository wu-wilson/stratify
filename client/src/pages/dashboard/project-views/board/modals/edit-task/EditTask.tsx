import { useEffect, useMemo, useState } from "react";
import { useQueryParams } from "../../../../../../hooks/query-params/useQueryParams";
import { useAuth } from "../../../../../../hooks/useAuth";
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
import { type RequestTemplate } from "../../../../../../components/modal/modal-template/modal-request-template/types";
import {
  type EditTaskPayload,
  type TaskEntity,
} from "../../../../../../services/tasks/types";
import Tag from "../../../../../../components/tag/Tag";
import ModalRequestTemplate from "../../../../../../components/modal/modal-template/modal-request-template/ModalRequestTemplate";

const EditTask = ({
  closeModal,
  task,
}: {
  closeModal: () => void;
  task: TaskEntity;
}) => {
  const { kanban, setKanban } = useKanban();
  const { getParam } = useQueryParams();
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

  const [status, setStatus] = useState<string | null>(task.status_id);
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
        new_status_id: status!,
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

  const onDeleteTag = (tag: TagEntity) => {
    setTags((prev) => prev.filter((t) => t.id !== tag.id));
  };

  const template: RequestTemplate<string, TagEntity>[] = [
    { type: "title", value: "Edit Task" },
    { type: "subtitle", value: SUBTITLE },
    {
      type: "dropdown",
      label: "Status",
      getLabel: (o) => getStatusLabel(kanban!.statuses, o!),
      options: statusOptions,
      selected: status,
      setSelected: setStatus,
    },
    {
      type: "dropdown",
      label: "Assignee",
      getLabel: (o) => getAssigneeLabel(members!, o),
      options: assigneeOptions,
      selected: assignee,
      setSelected: setAssignee,
    },
    {
      type: "input",
      label: "Title",
      value: title,
      setValue: setTitle,
      placeholder: TITLE_PLACEHOLDER,
      criticalMsg: validationError,
      autoFocus: true,
    },
    {
      type: "autofill",
      label: "Tags",
      options: kanban!.tags,
      selected: tags,
      setSelected: setTags,
      renderSelected: (t: TagEntity) => (
        <Tag tag={t} key={t.id} deletable={true} onDelete={onDeleteTag} />
      ),
      getLabel: getTagLabel,
      placeholder: "Search tags...",
    },
    {
      type: "textarea",
      label: "Description",
      value: description,
      setValue: setDescription,
      placeholder: DESCRIPTION_PLACEHOLDER,
      criticalMsg: null,
    },
  ];

  return (
    <ModalRequestTemplate
      template={template}
      loading={loading}
      setLoading={setLoading}
      loadingMsg={"Updating task..."}
      error={requestError}
      request={updateTask}
      button={{ label: "Save", disabled: !!validationError }}
    />
  );
};

export default EditTask;
