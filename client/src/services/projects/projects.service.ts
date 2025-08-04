import { BASE_URL } from "./constants";
import {
  type ProjectEntity,
  type CreateProjectPayload,
  type CreateProjectResponse,
} from "./types";
import axios from "axios";

export const getProjects = async (userId: string) => {
  const response = await axios.get<ProjectEntity[]>(BASE_URL, {
    params: { user_id: userId },
  });
  return response.data;
};

export const createProject = async (
  createProjectPayload: CreateProjectPayload
) => {
  const response = await axios.post<CreateProjectResponse>(
    `${BASE_URL}/create`,
    createProjectPayload
  );
  return response.data;
};
