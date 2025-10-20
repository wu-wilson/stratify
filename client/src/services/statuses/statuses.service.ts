import { BASE_URL } from "./constants";
import {
  type CreateStatusPayload,
  type CreateStatusResponse,
  type StatusEntity,
  type UpdateStatusIndexPayload,
  type UpdateStatusIndexResponse,
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

export const updateStatusIndex = async (
  updateStatusIndexPayload: UpdateStatusIndexPayload
) => {
  const response = await axios.patch<UpdateStatusIndexResponse>(
    `${BASE_URL}/update/index`,
    updateStatusIndexPayload
  );
  return response.data;
};
