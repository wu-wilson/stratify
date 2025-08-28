import { BASE_URL } from "./constants";
import { type TaskEntity } from "./types";
import axios from "axios";

export const getTasks = async (projectId: string) => {
  const response = await axios.get<TaskEntity[]>(BASE_URL, {
    params: { project_id: projectId },
  });
  return response.data;
};
