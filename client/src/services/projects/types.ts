export type ProjectEntity = {
  id: string;
  owner_id: string;
  name: string;
  description?: string;
  created_on: string;
};

export type CreateProjectPayload = {
  owner_id: string;
  name: string;
  description?: string;
};

export type CreateProjectResponse = {
  message: string;
  project: ProjectEntity;
};
