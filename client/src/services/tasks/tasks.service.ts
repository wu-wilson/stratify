import { BASE_URL } from "./constants";
import {
  type CreateTaskPayload,
  type CreateTaskResponse,
  type DeleteTaskParams,
  type DeleteTaskResponse,
  type EditTaskPayload,
  type EditTaskResponse,
  type ReorderTaskPayload,
  type ReorderTaskResponse,
  type TaskEntity,
} from "./types";
import axios from "axios";

export const getTasks = async (projectId: string, token: string) => {
  const response = await axios.get<TaskEntity[]>(BASE_URL, {
    params: { project_id: projectId },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const createTask = async (payload: CreateTaskPayload, token: string) => {
  const response = await axios.post<CreateTaskResponse>(
    `${BASE_URL}/create`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const deleteTask = async (params: DeleteTaskParams, token: string) => {
  const { task_id, status_id, index, project_id } = params;

  const response = await axios.delete<DeleteTaskResponse>(
    `${BASE_URL}/delete/${task_id}`,
    {
      params: { index, status_id, project_id },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const reorderTask = async (
  payload: ReorderTaskPayload,
  token: string
) => {
  const response = await axios.patch<ReorderTaskResponse>(
    `${BASE_URL}/reorder`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const editTask = async (payload: EditTaskPayload, token: string) => {
  const response = await axios.patch<EditTaskResponse>(
    `${BASE_URL}/edit`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
