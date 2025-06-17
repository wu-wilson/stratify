import { BASE_URL } from "./constants";
import { type CreateProjectPayload, type ProjectEntity } from "./types";
import axios from "axios";

export const getProjects = async (
  ownerId: string
): Promise<ProjectEntity[]> => {
  const response = await axios.get<ProjectEntity[]>(BASE_URL, {
    params: { owner_id: ownerId },
  });
  return response.data;
};

export const createProject = async (
  projectPayload: CreateProjectPayload
): Promise<ProjectEntity> => {
  const response = await axios.post<ProjectEntity>(
    `${BASE_URL}/create`,
    projectPayload
  );
  return response.data;
};
