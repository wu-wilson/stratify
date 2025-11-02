import { BASE_URL } from "./constants";
import {
  type CreateTaskPayload,
  type CreateTaskResponse,
  type DeleteTaskPayload,
  type DeleteTaskResponse,
  type ReorderTaskPayload,
  type ReorderTaskResponse,
  type TaskEntity,
} from "./types";
import axios from "axios";

export const getTasks = async (projectId: string) => {
  const response = await axios.get<TaskEntity[]>(BASE_URL, {
    params: { project_id: projectId },
  });
  return response.data;
};

export const createTask = async (createTaskPayload: CreateTaskPayload) => {
  const response = await axios.post<CreateTaskResponse>(
    `${BASE_URL}/create`,
    createTaskPayload
  );
  return response.data;
};

export const deleteTask = async (deleteTaskPayload: DeleteTaskPayload) => {
  const response = await axios.delete<DeleteTaskResponse>(
    `${BASE_URL}/delete`,
    { data: deleteTaskPayload }
  );
  return response.data;
};

export const reorderTask = async (reorderTaskPayload: ReorderTaskPayload) => {
  const response = await axios.patch<ReorderTaskResponse>(
    `${BASE_URL}/reorder`,
    reorderTaskPayload
  );
  return response.data;
};
