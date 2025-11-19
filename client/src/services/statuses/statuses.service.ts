import { BASE_URL } from "./constants";
import {
  type StatusEntity,
  type CreateStatusPayload,
  type CreateStatusResponse,
  type DeleteStatusParams,
  type DeleteStatusResponse,
  type ReorderStatusPayload,
  type ReorderStatusResponse,
} from "./types";
import axios from "axios";

export const getStatuses = async (projectId: string) => {
  const response = await axios.get<StatusEntity[]>(BASE_URL, {
    params: { project_id: projectId },
  });
  return response.data;
};

export const createStatus = async (payload: CreateStatusPayload) => {
  const response = await axios.post<CreateStatusResponse>(
    `${BASE_URL}/create`,
    payload
  );
  return response.data;
};

export const deleteStatus = async (params: DeleteStatusParams) => {
  const { project_id, status_id, index } = params;

  const response = await axios.delete<DeleteStatusResponse>(
    `${BASE_URL}/delete/${status_id}`,
    { params: { project_id, index } }
  );

  return response.data;
};

export const reorderStatus = async (payload: ReorderStatusPayload) => {
  const response = await axios.patch<ReorderStatusResponse>(
    `${BASE_URL}/reorder`,
    payload
  );
  return response.data;
};
