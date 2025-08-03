import { BIGINT_MAX } from "./constants";

export const validateMaxUses = (
  maxUses: string
): { valid: boolean; msg: string | null } => {
  const parsed = parseInt(maxUses, 10);
  if (maxUses.trim() === "") {
    return { valid: false, msg: "Field cannot be empty" };
  } else if (parsed === 0) {
    return { valid: false, msg: "Must be greater than 0" };
  } else if (BigInt(parsed) > BIGINT_MAX) {
    return { valid: false, msg: `Must be less than ${BIGINT_MAX}` };
  }
  return { valid: true, msg: null };
};
