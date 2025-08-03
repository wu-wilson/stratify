import { INT_MAX } from "./constants";

export const validateMaxUses = (
  maxUses: string
): { valid: boolean; msg: string | null } => {
  const parsed = parseInt(maxUses, 10);
  if (maxUses.trim() === "") {
    return { valid: false, msg: "Field cannot be empty" };
  } else if (parsed === 0) {
    return { valid: false, msg: "Must be greater than 0" };
  } else if (parsed > INT_MAX) {
    return { valid: false, msg: `Must be less than ${INT_MAX}` };
  }
  return { valid: true, msg: null };
};
