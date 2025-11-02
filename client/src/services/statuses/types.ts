export type StatusEntity = {
  id: string;
  name: string;
  position: number;
  created_on: string;
};

export type CreateStatusPayload = {
  project_id: string;
  name: string;
  position: number;
};

export type CreateStatusResponse = {
  message: string;
  status: StatusEntity;
};

export type DeleteStatusPayload = {
  project_id: string;
  status_id: string;
  index: number;
};

export type DeleteStatusResponse = {
  message: string;
  deleted: StatusEntity;
};

export type ReorderStatusPayload = {
  old_index: number;
  new_index: number;
  project_id: string;
  status_id: string;
};

export type ReorderStatusResponse = {
  message: string;
  updated: StatusEntity;
};
