import { type TagEntity } from "../../../../../../services/tags/types";

export const validateTagName = (
  name: string,
  tags: TagEntity[]
): { valid: boolean; msg: string | null } => {
  const cleanedName = name.toLowerCase().trim();

  if (cleanedName.length === 0) {
    return { valid: false, msg: "Field cannot be empty" };
  }

  for (const t of tags) {
    if (cleanedName === t.name.toLowerCase().trim()) {
      return { valid: false, msg: "Status name is already in use" };
    }
  }

  return { valid: true, msg: null };
};
