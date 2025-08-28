export const callWithCustomError = async <T>(
  promise: Promise<T>,
  errorMessage: string
) => {
  try {
    return await promise;
  } catch {
    throw new Error(errorMessage);
  }
};
