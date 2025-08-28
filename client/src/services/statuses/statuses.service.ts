import { BASE_URL } from "./constants";
import { type StatusEntity } from "./types";
import axios from "axios";

export const getStatuses = async (projectId: string) => {
  const response = await axios.get<StatusEntity[]>(BASE_URL, {
    params: { project_id: projectId },
  });
  return response.data;
};
