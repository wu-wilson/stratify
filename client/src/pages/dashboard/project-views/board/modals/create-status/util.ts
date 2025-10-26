import { type StatusEntity } from "../../../../../../services/statuses/types";

export const validateStatusName = (
  name: string,
  statuses: StatusEntity[]
): { valid: boolean; msg: string | null } => {
  const trimmedName = name.trim();

  statuses.forEach((s) => {
    if (trimmedName === s.name.trim()) {
      return { valid: false, msg: "Status name is already in use" };
    }
  });

  return { valid: true, msg: null };
};
