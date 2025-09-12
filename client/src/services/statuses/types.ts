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
