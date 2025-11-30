import { type MemberEntity } from "../../../../../../services/members/types";
import { type StatusEntity } from "../../../../../../services/statuses/types";
import { type TagEntity } from "../../../../../../services/tags/types";
import { type TaskEntity } from "../../../../../../services/tasks/types";

export const validateTaskTitle = (
  title: string,
  tasks: TaskEntity[]
): { valid: boolean; msg: string | null } => {
  const cleanedTitle = title.toLowerCase().trim();

  if (cleanedTitle.length === 0) {
    return { valid: false, msg: "Field cannot be empty" };
  }

  for (const t of tasks) {
    if (cleanedTitle === t.title.toLowerCase().trim()) {
      return { valid: false, msg: "Task title is already in use" };
    }
  }

  return { valid: true, msg: null };
};

export const getStatusLabel = (statuses: StatusEntity[], statusId: string) => {
  const label = statuses.find((s) => s.id === statusId)?.name;
  if (!label) {
    throw new Error(`Label not found for the given status id (${statusId})`);
  }
  return label;
};

export const getAssigneeLabel = (
  members: MemberEntity[],
  memberId: string | null
) => {
  if (memberId === null) {
    return "Unassigned";
  }
  const label = members.find((m) => m.id === memberId)?.name;
  if (!label) {
    throw new Error(`Label not found for the given member id (${memberId})`);
  }
  return label;
};

export const getTagLabel = (tag: TagEntity) => {
  return tag.name;
};
