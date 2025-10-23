import { BASE_URL } from "./constants";
import {
  type CreateStatusPayload,
  type CreateStatusResponse,
  type StatusEntity,
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

export const createStatus = async (
  createStatusPayload: CreateStatusPayload
) => {
  const response = await axios.post<CreateStatusResponse>(
    `${BASE_URL}/create`,
    createStatusPayload
  );
  return response.data;
};

export const reorderStatus = async (
  reorderStatusPayload: ReorderStatusPayload
) => {
  const response = await axios.patch<ReorderStatusResponse>(
    `${BASE_URL}/reorder`,
    reorderStatusPayload
  );
  return response.data;
};
