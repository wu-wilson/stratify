import { BASE_URL } from "./constants";
import {
  type CreateTaskPayload,
  type CreateTaskResponse,
  type DeleteTaskParams,
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

export const createTask = async (payload: CreateTaskPayload) => {
  const response = await axios.post<CreateTaskResponse>(
    `${BASE_URL}/create`,
    payload
  );
  return response.data;
};

export const deleteTask = async (params: DeleteTaskParams) => {
  const { task_id, status_id, index } = params;

  const response = await axios.delete<DeleteTaskResponse>(
    `${BASE_URL}/delete/${task_id}`,
    {
      params: { index, status_id },
    }
  );

  return response.data;
};

export const reorderTask = async (payload: ReorderTaskPayload) => {
  const response = await axios.patch<ReorderTaskResponse>(
    `${BASE_URL}/reorder`,
    payload
  );
  return response.data;
};
