import { useEffect, useMemo, useState } from "react";
import { useKanban } from "../../../../../../hooks/useKanban";
import { useMembers } from "../../../../../../hooks/useMembers";
import { useQueryParams } from "../../../../../../hooks/query-params/useQueryParams";
import { useAuth } from "../../../../../../hooks/useAuth";
import { createTask } from "../../../../../../services/tasks/tasks.service";
import {
  getAssigneeLabel,
  getStatusLabel,
  getTagLabel,
  validateTaskTitle,
} from "./util";
import {
  DESCRIPTION_PLACEHOLDER,
  SUBTITLE,
  TITLE_PLACEHOLDER,
} from "./constants";
import { type CreateTaskPayload } from "../../../../../../services/tasks/types";
import { type TagEntity } from "../../../../../../services/tags/types";
import { type RequestTemplate } from "../../../../../../components/modal/modal-template/modal-request-template/types";
import ModalRequestTemplate from "../../../../../../components/modal/modal-template/modal-request-template/ModalRequestTemplate";
import Tag from "../../../../../../components/tag/Tag";

const CreateTask = ({
  closeModal,
  statusId,
}: {
  closeModal: () => void;
  statusId: string;
}) => {
  const { kanban, setKanban } = useKanban();
  const { getParam } = useQueryParams();
  const { user } = useAuth();
  const { members } = useMembers();

  const [status, setStatus] = useState<string | null>(statusId);
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
        status_id: status!,
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
    const { valid, msg } = validateTaskTitle(title, kanban!.tasks);
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
    { type: "title", value: "New Task" },
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
      render: kanban!.tags.length > 0,
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
      loadingMsg={"Creating task..."}
      error={requestError}
      request={addTask}
      button={{ label: "Create", disabled: !!validationError }}
    />
  );
};

export default CreateTask;
