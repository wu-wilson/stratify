export type ProjectEntity = {
  id: number;
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
