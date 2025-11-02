const STATUS_ID_PREFIX = "status-";

export const serializeStatusId = (statusId: string): string => {
  return `${STATUS_ID_PREFIX}${statusId}`;
};

export const deserializeStatusId = (serializedId: string): string => {
  return serializedId.split(STATUS_ID_PREFIX)[1];
};
