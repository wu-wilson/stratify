export type TagEntity = {
  id: string;
  name: string;
  color: string;
  created_on: string;
  created_by: string;
};

export type CreateTagPayload = {
  project_id: string;
  name: string;
  color: string;
  created_by: string;
};

export type CreateTagResponse = {
  message: string;
  tag: TagEntity;
};

export type DeleteTagResponse = {
  message: string;
  deleted: TagEntity;
};

export type UpdateTagPayload = {
  id: string;
  name: string;
  color: string;
  project_id: string;
};

export type UpdateTagResponse = {
  message: string;
  updated: TagEntity;
};
