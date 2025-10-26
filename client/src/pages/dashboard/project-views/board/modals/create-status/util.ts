import { type StatusEntity } from "../../../../../../services/statuses/types";

export const validateStatusName = (
  name: string,
  statuses: StatusEntity[]
): { valid: boolean; msg: string | null } => {
  const cleanedName = name.toLowerCase().trim();

  for (const s of statuses) {
    if (cleanedName === s.name.toLowerCase().trim()) {
      return { valid: false, msg: "Status name is already in use" };
    }
  }

  return { valid: true, msg: null };
};
