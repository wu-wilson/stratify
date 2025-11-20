export type TaskEntity = {
  id: string;
  status_id: string;
  created_by: string | null;
  assigned_to: string | null;
  title: string;
  description: string | null;
  position: number;
  created_on: string;
};

export type CreateTaskPayload = {
  project_id: string;
  status_id: string;
  created_by: string;
  assigned_to: string | null;
  title: string;
  description: string | null;
  position: number;
};

export type CreateTaskResponse = {
  message: string;
  task: TaskEntity;
};

export type DeleteTaskParams = {
  task_id: string;
  status_id: string;
  index: number;
  project_id: string;
};

export type DeleteTaskResponse = {
  message: string;
  deleted: TaskEntity;
};

export type ReorderTaskPayload = {
  old_index: number;
  new_index: number;
  old_status_id: string;
  new_status_id: string;
  task_id: string;
  project_id: string;
};

export type ReorderTaskResponse = {
  message: string;
  updated: TaskEntity;
};
