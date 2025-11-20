import { BASE_URL } from "./constants";
import {
  type ProjectEntity,
  type CreateProjectPayload,
  type CreateProjectResponse,
} from "./types";
import axios from "axios";

export const getProjects = async (token: string) => {
  const response = await axios.get<ProjectEntity[]>(BASE_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const createProject = async (
  payload: CreateProjectPayload,
  token: string
) => {
  const response = await axios.post<CreateProjectResponse>(
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
