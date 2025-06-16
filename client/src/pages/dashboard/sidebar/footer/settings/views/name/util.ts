export const validateDisplayName = (
  newName: string,
  currName: string
): { valid: boolean; msg: string | null } => {
  const trimmedName = newName.trim();
  if (trimmedName === "") {
    return { valid: false, msg: "Field cannot be empty" };
  }
  if (trimmedName === currName) {
    return {
      valid: false,
      msg: "New name must be different",
    };
  }
  return { valid: true, msg: null };
};
