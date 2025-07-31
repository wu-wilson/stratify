import { BASE_URL } from "./constants";
import { type CreateProjectPayload, type ProjectEntity } from "./types";
import axios from "axios";

export const getProjects = async (userId: string): Promise<ProjectEntity[]> => {
  const response = await axios.get<ProjectEntity[]>(BASE_URL, {
    params: { user_id: userId },
  });
  return response.data;
};

export const createProject = async (
  createProjectPayload: CreateProjectPayload
): Promise<ProjectEntity> => {
  const response = await axios.post<ProjectEntity>(
    `${BASE_URL}/create`,
    createProjectPayload
  );
  return response.data;
};
