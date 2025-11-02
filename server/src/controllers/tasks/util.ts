const TASK_ID_PREFIX = "task-";

export const serializeTaskId = (taskId: string): string => {
  return `${TASK_ID_PREFIX}${taskId}`;
};

export const deserializeTaskId = (serializedId: string): string => {
  return serializedId.split(TASK_ID_PREFIX)[1];
};
