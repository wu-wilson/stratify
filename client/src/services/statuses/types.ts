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

export type UpdateStatusIndexPayload = {
  old_index: number;
  new_index: number;
  project_id: string;
  status_id: string;
};

export type UpdateStatusIndexResponse = {
  message: string;
  updated: StatusEntity;
};
