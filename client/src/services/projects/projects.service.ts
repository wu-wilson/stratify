import { BASE_URL } from "./constants";
import { type CreateProjectPayload, type Project } from "./types";
import axios from "axios";

export const getProjects = async (ownerId: string): Promise<Project[]> => {
  const response = await axios.get<Project[]>(BASE_URL, {
    params: { owner_id: ownerId },
  });
  return response.data;
};

export const createProject = async (
  projectPayload: CreateProjectPayload
): Promise<Project> => {
  const response = await axios.post<Project>(
    `${BASE_URL}/create`,
    projectPayload
  );
  return response.data;
};
