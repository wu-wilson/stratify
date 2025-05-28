export const getCSSVar = (name: string) => {
  const value = getComputedStyle(document.documentElement).getPropertyValue(
    name
  );
  if (!value) {
    throw new Error(`CSS variable "${name}" is not defined or has no value.`);
  }
  return value.trim();
};
