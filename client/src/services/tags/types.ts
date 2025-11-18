export type TagEntity = {
  id: string;
  name: string;
  color: string;
  created_on: string;
};

export type CreateTagPayload = {
  project_id: string;
  name: string;
  color: string;
};

export type CreateTagResponse = {
  message: string;
  tag: TagEntity;
};
